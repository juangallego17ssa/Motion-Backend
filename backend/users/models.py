from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'username'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['email']

    email = models.EmailField(unique=True)
    follower = models.ManyToManyField(to="self", related_name="following", symmetrical=False, blank=True)

    def __str__(self):
        return self.username
