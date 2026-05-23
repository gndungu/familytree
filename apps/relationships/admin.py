from django.contrib import admin

from apps.relationships.models import (
    Relationship
)


@admin.register(Relationship)
class RelationshipAdmin(admin.ModelAdmin):

    list_display = (
        "from_member", "to_member", "relationship_type"
    )

