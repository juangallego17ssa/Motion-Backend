from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from emails.models import send_new_post_email

# from django.contrib.contenttypes.fields import GenericRelation
# from comments.models import Comment
# Create your models here.
User = get_user_model()



class Post (models.Model):
    # title = models.CharField(max_length=100, default='no_title')
    content = models.TextField(null=False, blank=False)
    # image = models.ImageField(upload_to='post_images', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="created_posts")
    liked_by = models.ManyToManyField(to=User, related_name="liked_posts", blank=True)
    like_count = models.PositiveIntegerField(default=0)

    # comments = models.ManyToManyField(to=Comment, related_name='posts')

    def __str__(self):
        return f'Post {self.id} - {self.created_by}'


@receiver(post_save, sender=Post)
def send_new_post_notification(sender, instance, **kwargs):
    friends = instance.created_by.friend.all()
    for friend in friends:
        send_new_post_email(instance.created_by, instance, friend)
