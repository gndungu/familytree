from django.contrib import admin

from apps.family.models import (
    FamilyTree,
    FamilyMember
)


@admin.register(FamilyTree)
class FamilyTreeAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'name',
        'created_by',
        'is_public',
        'created_at',
    )

    search_fields = (
        'name',
    )


@admin.register(FamilyMember)
class FamilyMemberAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'first_name',
        'last_name',
        'gender',
        'tree',
        'father',
        'mother',
        'spouse',
    )

    search_fields = (
        'first_name',
        'last_name',
    )

    list_filter = (
        'gender',
        'tree',
    )