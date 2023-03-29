from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    location = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    about_me = models.CharField(max_length=250, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    friend = models.ManyToManyField(to="self", blank=True, related_name="friends", symmetrical=True)
    sent_friend_request = models.ManyToManyField(to="self", blank=True, related_name="sent_friend_requests",
                                                 symmetrical=False)
    receive_friend_request = models.ManyToManyField(to="self", blank=True, related_name="receive_friend_requests",
                                                    symmetrical=False)
    follower = models.ManyToManyField(to="self", related_name="followers", symmetrical=False)

    def __str__(self):
        return self.username
