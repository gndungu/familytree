from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    FamilyTreeViewSet,
    FamilyMemberViewSet,
    FamilyTreeGraphView,
    FamilyTreeAPIView,
    FamilyStatsAPIView
)

router = DefaultRouter()

router.register(
    'trees',
    FamilyTreeViewSet,
    basename='family-trees'
)

router.register(
    'members',
    FamilyMemberViewSet,
    basename='family-members'
)


urlpatterns = [

    path('tree-graph/', FamilyTreeGraphView.as_view() ),
    path('tree/<int:pk>/', FamilyTreeAPIView.as_view() ),
    path('stats/', FamilyStatsAPIView.as_view(), name="family-stats"),
]

urlpatterns += router.urls