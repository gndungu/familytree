from rest_framework.routers import DefaultRouter
from apps.gallery.views import GalleryViewSet

router = DefaultRouter()

router.register('gallery', GalleryViewSet)

urlpatterns = router.urls