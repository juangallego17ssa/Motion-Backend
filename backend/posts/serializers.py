from rest_framework import serializers

from .models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    # created_by = UserSerializer()

    class Meta:
        model = Post
        # fields = ['id', 'title', 'description', 'difficulty', 'created', 'updated']
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'read_only': True},
        }
        # depth = 1

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_by'] = UserSerializer(instance.created_by).data
        representation['liked_by'] = UserSerializer(instance.liked_by, many=True).data
        return representation
