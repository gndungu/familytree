from rest_framework import serializers
from apps.relationships.models import Relationship


class RelationshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Relationship
        fields = "__all__"