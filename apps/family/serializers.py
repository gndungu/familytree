from django.db.models import Q
from django.db import transaction
from rest_framework import serializers
from apps.family.models import (
    FamilyTree,
    FamilyMember
)
from apps.relationships.models import Relationship, RelationshipType


class FamilyTreeSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamilyTree
        fields = "__all__"


class RelationMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMember
        fields = [
            "id",
            "first_name",
            "middle_name",
            "last_name",
            "profile_photo",
        ]


class FamilyMemberSerializerDEPRECATED(serializers.ModelSerializer):

    father = RelationMemberSerializer(read_only=True)
    mother = RelationMemberSerializer(read_only=True)
    spouse = RelationMemberSerializer(read_only=True)

    siblings = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = "__all__"

    # ---------------------------
    # SIBLINGS
    # ---------------------------
    def get_siblings(self, obj):
        if not obj.father and not obj.mother:
            return []

        siblings = FamilyMember.objects.filter(
            father=obj.father,
            mother=obj.mother
        ).exclude(id=obj.id)

        return RelationMemberSerializer(siblings, many=True).data

    # ---------------------------
    # CHILDREN
    # ---------------------------
    def get_children(self, obj):
        children = FamilyMember.objects.filter(
            Q(father=obj) | Q(mother=obj)
        )

        return RelationMemberSerializer(children, many=True).data
    

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = "__all__"


class RelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMember
        fields = ["id", "first_name", "last_name", "profile_photo"]


class FamilyMemberCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamilyMember
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):

        father = validated_data.pop("father", None)
        mother = validated_data.pop("mother", None)
        spouse = validated_data.pop("spouse", None)

        member = FamilyMember.objects.create(**validated_data)
        tree = member.tree

        # ---------------- PARENTS ----------------
        if father:
            Relationship.objects.create(
                tree=tree,
                from_member=father,
                to_member=member,
                relationship_type=RelationshipType.PARENT
            )

        if mother:
            Relationship.objects.create(
                tree=tree,
                from_member=mother,
                to_member=member,
                relationship_type=RelationshipType.PARENT
            )

        # ---------------- SPOUSE (BIDIRECTIONAL) ----------------
        if spouse:
            Relationship.objects.create(
                tree=tree,
                from_member=member,
                to_member=spouse,
                relationship_type=RelationshipType.SPOUSE
            )

            Relationship.objects.create(
                tree=tree,
                from_member=spouse,
                to_member=member,
                relationship_type=RelationshipType.SPOUSE
            )

        return member


class FamilyMemberUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamilyMember
        fields = "__all__"

    @transaction.atomic
    def update(self, instance, validated_data):

        father = validated_data.pop("father", None)
        mother = validated_data.pop("mother", None)
        spouse = validated_data.pop("spouse", None)

        # ---------------- UPDATE BASIC FIELDS ----------------
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        tree = instance.tree

        # =====================================================
        # CLEAN OLD RELATIONSHIPS (IMPORTANT)
        # =====================================================

        Relationship.objects.filter(
            to_member=instance,
            relationship_type=RelationshipType.PARENT
        ).delete()

        Relationship.objects.filter(
            from_member=instance,
            relationship_type=RelationshipType.SPOUSE
        ).delete()

        Relationship.objects.filter(
            to_member=instance,
            relationship_type=RelationshipType.SPOUSE
        ).delete()

        # ---------------- REBUILD PARENTS ----------------
        if father:
            Relationship.objects.create(
                tree=tree,
                from_member=father,
                to_member=instance,
                relationship_type=RelationshipType.PARENT
            )

        if mother:
            Relationship.objects.create(
                tree=tree,
                from_member=mother,
                to_member=instance,
                relationship_type=RelationshipType.PARENT
            )

        # ---------------- REBUILD SPOUSE (BIDIRECTIONAL) ----------------
        if spouse:
            Relationship.objects.create(
                tree=tree,
                from_member=instance,
                to_member=spouse,
                relationship_type=RelationshipType.SPOUSE
            )

            Relationship.objects.create(
                tree=tree,
                from_member=spouse,
                to_member=instance,
                relationship_type=RelationshipType.SPOUSE
            )

        return instance
    

class FamilyMemberSerializerDEB(serializers.ModelSerializer):

    father = serializers.SerializerMethodField()
    mother = serializers.SerializerMethodField()
    spouse = serializers.SerializerMethodField()
    siblings = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = "__all__"

    # ---------------- PARENTS ----------------
    def get_parents(self, obj, gender=None):
        qs = Relationship.objects.filter(
            to_member=obj,
            relationship_type=RelationshipType.PARENT
        ).select_related("from_member")

        if gender:
            qs = qs.filter(from_member__gender=gender)

        rel = qs.first()
        return RelationMemberSerializer(rel.from_member).data if rel else None

    def get_father(self, obj):
        return self.get_parents(obj, gender="Male")

    def get_mother(self, obj):
        return self.get_parents(obj, gender="Female")

    # ---------------- SPOUSE ----------------
    def get_spouse(self, obj):
        rel = Relationship.objects.filter(
            from_member=obj,
            relationship_type=RelationshipType.SPOUSE
        ).select_related("to_member").first()

        return RelationMemberSerializer(rel.to_member).data if rel else None

    # ---------------- CHILDREN ----------------
    def get_children(self, obj):
        rels = Relationship.objects.filter(
            from_member=obj,
            relationship_type=RelationshipType.PARENT
        ).select_related("to_member")

        return RelationMemberSerializer(
            [r.to_member for r in rels],
            many=True
        ).data

    # ---------------- SIBLINGS ----------------
    def get_siblings(self, obj):
        parent_rels = Relationship.objects.filter(
            to_member=obj,
            relationship_type=RelationshipType.PARENT
        )

        parents = [r.from_member for r in parent_rels]

        sibling_rels = Relationship.objects.filter(
            from_member__in=parents,
            relationship_type=RelationshipType.PARENT
        ).exclude(to_member=obj)

        siblings = list({r.to_member for r in sibling_rels})

        return RelationMemberSerializer(siblings, many=True).data
    


class FamilyMemberSerializer(serializers.ModelSerializer):

    father = serializers.SerializerMethodField()
    mother = serializers.SerializerMethodField()
    spouse = serializers.SerializerMethodField()
    siblings = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = "__all__"

    # ----------------------
    # PARENTS
    # ----------------------
    def get_father(self, obj):
        rel = Relationship.objects.filter(
            to_member=obj,
            relationship_type=RelationshipType.PARENT,
            from_member__gender="Male"
        ).first()

        return RelationSerializer(rel.from_member).data if rel else None

    def get_mother(self, obj):
        rel = Relationship.objects.filter(
            to_member=obj,
            relationship_type=RelationshipType.PARENT,
            from_member__gender="Female"
        ).first()

        return RelationSerializer(rel.from_member).data if rel else None

    # ----------------------
    # SPOUSE
    # ----------------------
    def get_spouse(self, obj):
        rel = Relationship.objects.filter(
            from_member=obj,
            relationship_type=RelationshipType.SPOUSE
        ).first()

        return RelationSerializer(rel.to_member).data if rel else None

    # ----------------------
    # CHILDREN
    # ----------------------
    def get_children(self, obj):
        rels = Relationship.objects.filter(
            from_member=obj,
            relationship_type=RelationshipType.PARENT
        )

        return RelationSerializer(
            [r.to_member for r in rels],
            many=True
        ).data

    # ----------------------
    # SIBLINGS
    # ----------------------
    def get_siblings(self, obj):
        parent_rels = Relationship.objects.filter(
            to_member=obj,
            relationship_type=RelationshipType.PARENT
        )

        parents = [r.from_member for r in parent_rels]

        siblings = Relationship.objects.filter(
            from_member__in=parents,
            relationship_type=RelationshipType.PARENT
        ).exclude(to_member=obj)

        return RelationSerializer(
            list({r.to_member for r in siblings}),
            many=True
        ).data
    

class TreeMemberSerializer(serializers.ModelSerializer):

    children = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = [
            "id",
            "first_name",
            "last_name",
            "gender",
            "profile_photo",
            "children"
        ]

    def get_children(self, obj):

        relationships = Relationship.objects.filter(
            from_member=obj,
            relationship_type=RelationshipType.PARENT,
            is_active=True
        ).select_related("to_member")

        children = [
            rel.to_member
            for rel in relationships
        ]

        return TreeMemberSerializer(
            children,
            many=True,
            context=self.context
        ).data


class FamilyStatsSerializer(serializers.Serializer):
    total_members = serializers.IntegerField()
    total_generations = serializers.IntegerField()
    living_members = serializers.IntegerField()
    deceased_members = serializers.IntegerField()