from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'username'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['email']

    email = models.EmailField(unique=True)
    location = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    about_me = models.CharField(max_length=250, blank=True)
    tags = models.CharField(max_length=100, blank=True)
  #  friend_request = models.ManyToManyField(to="self", related_name="friend_requested_by", symmetrical=False, blank=True)
  #  friend = models.ManyToManyField(to="self", related_name="friend")
    follower = models.ManyToManyField(to="self", related_name="following", symmetrical=False, blank=True)

    def __str__(self):
        return self.username
