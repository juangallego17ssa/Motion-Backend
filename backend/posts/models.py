from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class Post(models.Model):
    content = models.TextField(null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="created_posts")
    liked_by = models.ManyToManyField(to=User, related_name="liked_posts", blank=True)
    like_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'Post {self.id} - {self.created_by}'
