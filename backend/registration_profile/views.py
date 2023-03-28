from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.response import Response

from users.models import User

from registration_profile.models import RegistrationProfile
from registration_profile.serializers import RegProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    registration_profile = RegProfileSerializer(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'registration_profile')
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}


class CreateRegProfileView(CreateAPIView):
    queryset = RegistrationProfile.objects.all()
    serializer_class = RegProfileSerializer


class CreateUserView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        try:
            instance = RegistrationProfile.objects.get(email=request.data['email'])
            if request.data['code'] != instance.code:
                return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)
        except RegistrationProfile.DoesNotExist:
            return Response({'error': 'Registration profile not found'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['password'] = make_password(data['password'])
        serializer = UserSerializer(data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
