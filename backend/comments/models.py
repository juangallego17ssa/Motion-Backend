from django.contrib.auth import get_user_model
from django.db import models
from posts.models import Post

User = get_user_model()


class Comment(models.Model):
    content = models.TextField(null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="created_comments")
    posts = models.ManyToManyField(to=Post, related_name="comments")

    def __str__(self):
        return f'Comment {self.id} - {self.created_by}'
