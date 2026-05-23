from rest_framework.routers import DefaultRouter

from .views import RelationshipViewSet

router = DefaultRouter()

router.register(
    "relationships",
    RelationshipViewSet,
    basename="relationships"
)

urlpatterns = router.urls