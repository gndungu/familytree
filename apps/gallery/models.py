from django.db import models
from apps.common.models import TimeStampMixin


class Album(TimeStampMixin):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover = models.ImageField(upload_to="albums/covers/", blank=True, null=True)

    def __str__(self):
        return self.title
    

class Gallery(TimeStampMixin):

    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name="photos", null=True, blank=True
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True, null=True)

    image = models.ImageField(
        upload_to='gallery/'
    )

    event_date = models.DateField(
        blank=True,
        null=True
    )


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
