from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.relationships.models import Relationship
from apps.relationships.serializers import RelationshipSerializer


class RelationshipViewSet(viewsets.ModelViewSet):

    queryset = Relationship.objects.all()

    serializer_class = RelationshipSerializer

    permission_classes = [IsAuthenticated]