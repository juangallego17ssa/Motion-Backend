from rest_framework import serializers
from friend_requests.models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    receiver = serializers.StringRelatedField()

    class Meta:
        model = FriendRequest
        fields = ['id', 'sender', 'receiver', 'status']
        read_only_fields = ['id', 'sender', 'receiver']