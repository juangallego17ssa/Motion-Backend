# Generated by Django 4.1.7 on 2023-03-19 15:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="follower",
            field=models.ManyToManyField(
                related_name="followee", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
