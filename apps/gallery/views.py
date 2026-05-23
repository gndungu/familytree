from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)
from apps.gallery.models import Gallery
from apps.gallery.serializers import GallerySerializer


class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (
        MultiPartParser,
        FormParser,
    )
