from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class FriendRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_friend_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_friend_requests')
    status = models.CharField(choices=(('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')),
                              default='pending', max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['sender', 'receiver'], name='unique_friend_request'),
        ]

    def __str__(self):
        return f"Friend request from {self.sender} to {self.receiver}"
