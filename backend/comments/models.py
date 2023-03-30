from django.contrib.auth import get_user_model
from django.db import models
from posts.models import Post

User = get_user_model()


class Comment(models.Model):
    content = models.TextField(null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="created_comments")
    posts = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name="comments", null=True)

    def __str__(self):
        return f'Comment {self.id} - {self.created_by}'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.posts is None:
            self.posts = 2
