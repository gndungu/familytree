from rest_framework import serializers
from apps.gallery.models import Gallery, Album


class AlbumSerializer(serializers.ModelSerializer):

    cover_url = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = "__all__"

    def get_cover_url(self, obj):
        request = self.context.get("request")

        if obj.cover and request:
            return request.build_absolute_uri(obj.cover.url)

        return None


class GallerySerializer(serializers.ModelSerializer):

    image = serializers.ImageField(write_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")

        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)

        return None