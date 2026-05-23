from django.db.models import Q

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from apps.family.models import (
    FamilyTree,
    FamilyMember
)

from apps.family.serializers import (
    FamilyTreeSerializer,
    FamilyMemberSerializer,
    FamilyMemberCreateSerializer,
    FamilyMemberUpdateSerializer,
    RelationshipSerializer,
    TreeMemberSerializer
)

from apps.relationships.models import Relationship


class FamilyTreeViewSet(viewsets.ModelViewSet):

    queryset = FamilyTree.objects.all()

    serializer_class = FamilyTreeSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(
            created_by=self.request.user
        )



class FamilyMemberViewSet(viewsets.ModelViewSet):

    queryset = FamilyMember.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "create":
            return FamilyMemberCreateSerializer
        if self.action in ["update", "partial_update"]:
            return FamilyMemberUpdateSerializer
        return FamilyMemberSerializer

    def get_queryset(self):
        qs = FamilyMember.objects.all()

        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(phone_number__icontains=search) |
                Q(occupation__icontains=search)
            )

        return qs



class FamilyMemberViewSetDEPRECATE(viewsets.ModelViewSet):
    serializer_class = FamilyMemberSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = FamilyMember.objects.all()
        search = self.request.query_params.get("search")

        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(middle_name__icontains=search) |
                Q(phone_number__icontains=search) |
                Q(occupation__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        print("USER:", self.request.user)
        serializer.save(created_by=self.request.user)



class FamilyTreeGraphView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        members = FamilyMember.objects.all()

        relationships = Relationship.objects.filter(is_active=True)

        return Response({
            "members": FamilyMemberSerializer(members, many=True).data,
            "relationships": RelationshipSerializer(relationships, many=True).data
        })
    

class FamilyTreeAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        root = FamilyMember.objects.get(pk=pk)

        serializer = TreeMemberSerializer(root)

        return Response(serializer.data)
    


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import FamilyMember


class FamilyStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_generation_depth(self, member):
        """
        Recursively calculate generation depth
        based on parents.
        """

        if not member:
            return 0

        father_depth = self.get_generation_depth(member.father)
        mother_depth = self.get_generation_depth(member.mother)

        return 1 + max(father_depth, mother_depth)

    def get(self, request):

        queryset = FamilyMember.objects.all()

        total_members = queryset.count()

        living_members = queryset.filter(
            is_alive=True
        ).count()

        deceased_members = queryset.filter(
            is_alive=False
        ).count()

        # calculate generations
        max_generation = 0

        for member in queryset:
            depth = self.get_generation_depth(member)

            if depth > max_generation:
                max_generation = depth

        data = {
            "total_members": total_members,
            "total_generations": max_generation,
            "living_members": living_members,
            "deceased_members": deceased_members,
        }

        return Response(data)