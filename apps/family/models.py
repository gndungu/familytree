from django.db import models

from apps.common.models import TimeStampMixin


class FamilyTree(TimeStampMixin):

    name = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    owner = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.CASCADE,
        related_name='owned_trees'
    )

    cover_photo = models.ImageField(
        upload_to='family/covers/',
        blank=True,
        null=True
    )

    is_public = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.name


class FamilyMember(TimeStampMixin):

    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )

    tree = models.ForeignKey(
        FamilyTree,
        on_delete=models.CASCADE,
        related_name='members', null=True, blank=True
    )

    user = models.OneToOneField(
        'accounts.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='family_member'
    )

    first_name = models.CharField(
        max_length=255
    )

    middle_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    last_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    nick_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    gender = models.CharField(
        max_length=20,
        choices=GENDER_CHOICES
    )

    birth_date = models.DateField(
        blank=True,
        null=True
    )

    birth_order = models.PositiveIntegerField(
        null=True, blank=True
    )

    death_date = models.DateField(
        blank=True,
        null=True
    )

    place_of_birth = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    occupation = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    biography = models.TextField(
        blank=True,
        null=True
    )

    phone_number = models.CharField(
        max_length=30,
        blank=True,
        null=True
    )

    email = models.EmailField(
        blank=True,
        null=True
    )

    address = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    profile_photo = models.ImageField(
        upload_to='family/members/',
        blank=True,
        null=True
    )

    father = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='father_children'
    )

    mother = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='mother_children'
    )

    spouse = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='spouses'
    )

    is_alive = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name or ''}"