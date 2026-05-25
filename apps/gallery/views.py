from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)
from apps.gallery.models import Gallery, Album
from apps.gallery.serializers import GallerySerializer, AlbumSerializer


class AlbumViewSet(viewsets.ModelViewSet):

    queryset = Album.objects.all().order_by("-id")
    serializer_class = AlbumSerializer

    parser_classes = (MultiPartParser, FormParser)


class GalleryViewSetMultiple(viewsets.ModelViewSet):

    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):

        album_id = request.data.get("album")

        images = request.FILES.getlist("images")

        if not images:
            return Response(
                {"error": "No images uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_items = []

        for img in images:
            obj = Gallery.objects.create(
                album_id=album_id,
                image=img,
                title=request.data.get("title", "")
            )
            created_items.append(obj)

        serializer = self.get_serializer(created_items, many=True)

        return Response(serializer.data, status=201)


class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def get_queryset(self):

        queryset = Gallery.objects.all()

        album = self.request.query_params.get("album")

        if album:
            queryset = queryset.filter(album__id=album)

        return queryset

    def create(self, request, *args, **kwargs):
        print("DATA:", request.data)
        print("FILES:", request.FILES)

        image = request.FILES.get("image")

        print("IMAGE:", image)

        if not image:
            return Response(
                {"error": "No image received"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)
