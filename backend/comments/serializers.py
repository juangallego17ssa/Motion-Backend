from rest_framework import serializers
from .models import Comment
from django.contrib.auth import get_user_model
from posts.serializers import PostSerializer

User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    posts = PostSerializer(many=True)

    class Meta:
        model = Comment
        fields = '__all__'
