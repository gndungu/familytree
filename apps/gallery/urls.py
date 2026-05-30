from rest_framework.routers import DefaultRouter
from apps.gallery.views import GalleryViewSet, AlbumViewSet, GalleryViewSetMultiple

router = DefaultRouter()

router.register('gallery', GalleryViewSet, basename="gallery")
router.register('gallerym', GalleryViewSetMultiple, basename="gallery-multiple")
router.register(r"albums", AlbumViewSet, basename="albums")

urlpatterns = router.urls