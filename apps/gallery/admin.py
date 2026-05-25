from django.contrib import admin
from apps.gallery.models import Gallery, Album


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):

    list_display = (
        "title", "description", "cover"
    )


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):

    list_display = (
        "image", "album", "title", "description"
    )
