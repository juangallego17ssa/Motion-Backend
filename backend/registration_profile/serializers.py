from rest_framework import serializers
from .models import RegistrationProfile


class RegProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationProfile
        fields = "__all__"
        read_only_fields = ['user']