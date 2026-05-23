from django.db import models

from apps.common.models import TimeStampMixin


class RelationshipType(models.TextChoices):

    PARENT = "PARENT", "Parent"
    CHILD = "CHILD", "Child"
    SPOUSE = "SPOUSE", "Spouse"
    SIBLING = "SIBLING", "Sibling"
    ADOPTED_PARENT = "ADOPTED_PARENT", "Adopted Parent"
    ADOPTED_CHILD = "ADOPTED_CHILD", "Adopted Child"



class Relationship(TimeStampMixin):

    tree = models.ForeignKey(
        "family.FamilyTree",
        on_delete=models.CASCADE,
        related_name="relationships",
        null=True, blank=True
    )

    from_member = models.ForeignKey(
        "family.FamilyMember",
        on_delete=models.CASCADE,
        related_name="relationships_from"
    )

    to_member = models.ForeignKey(
        "family.FamilyMember",
        on_delete=models.CASCADE,
        related_name="relationships_to"
    )

    relationship_type = models.CharField(
        max_length=30,
        choices=RelationshipType.choices
    )

    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("from_member", "to_member", "relationship_type")

    def __str__(self):
        return f"{self.from_member} → {self.relationship_type} → {self.to_member}"