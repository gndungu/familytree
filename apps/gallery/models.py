from django.db import models
from apps.common.models import TimeStampMixin


class Gallery(TimeStampMixin):

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
