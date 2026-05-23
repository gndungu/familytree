from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

from apps.common.models import TimeStampMixin


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(
            email,
            password,
            **extra_fields
        )


class CustomUser(
    AbstractBaseUser,
    PermissionsMixin
):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('family_manager', 'Family Manager'),
        ('member', 'Member'),
    )

    first_name = models.CharField(max_length=255)

    last_name = models.CharField(max_length=255)

    email = models.EmailField(
        unique=True
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    gender = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    profile_photo = models.ImageField(
        upload_to='users/',
        blank=True,
        null=True
    )

    bio = models.TextField(
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES,
        default='member'
    )

    is_staff = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email