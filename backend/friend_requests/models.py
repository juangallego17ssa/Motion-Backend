from django.db import models
from django.contrib.auth import get_user_model

from emails.models import send_friend_request_email, send_friend_accept_email

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

    def save(self, *args, **kwargs):
        # Send email notification on new friend request
        if self.pk is None:
            send_friend_request_email(sender=self.sender, recipient=self.receiver)
        # Send email notification on accepted friend request
        elif self.pk is not None and self.status == 'accepted':
            send_friend_accept_email(sender=self.sender, recipient=self.receiver)
        super().save(*args, **kwargs)
