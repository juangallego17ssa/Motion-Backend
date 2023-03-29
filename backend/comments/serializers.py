from rest_framework import serializers

from posts.models import Post
from .models import Comment
from django.contrib.auth import get_user_model


User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), default=serializers.CurrentUserDefault())
    class Meta:
        model = Comment
        fields = '__all__'
