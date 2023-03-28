from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import serializers, status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.response import Response

from users.models import User

from registration_profile.models import RegistrationProfile
from registration_profile.serializers import RegProfileSerializer

from registration_profile.models import code_generator


class UserSerializer(serializers.ModelSerializer):
    registration_profile = RegProfileSerializer(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'registration_profile', 'username')
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}


class CreateRegProfileView(CreateAPIView):
    queryset = RegistrationProfile.objects.all()
    serializer_class = RegProfileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create a new instance of RegistrationProfile
        instance = serializer.save()

        # Access the attribute you want to send in the email
        key = instance.code

        send_mail(
            'Registration key',
            f'Your registration key is {key}.',
            'from@example.com',
            [request.data['email']],
            fail_silently=False,
        )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UpdateRegProfileCodeView(GenericAPIView):
    queryset = RegistrationProfile.objects.all()
    serializer_class = RegProfileSerializer

    def post(self, request, *args, **kwargs):
        try:
            instance = RegistrationProfile.objects.get(email=request.data['email'])
            instance.password_reset = code_generator()
            instance.save()
            send_mail(
                'Registration key',
                f'With this key u can reset ur password {instance.password_reset}.',
                'from@example.com',
                [request.data['email']],
                fail_silently=False,
            )

            return Response({'If we find your E-Mail in our database, an email with a password reset key will be send'},
                            status=status.HTTP_200_OK)

        except RegistrationProfile.DoesNotExist:
            return Response({'If we find your E-Mail in our database, an email with a password reset key will be send'},
                            status=status.HTTP_200_OK)


class UpdatePasswordView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        try:
            instance = RegistrationProfile.objects.get(email=request.data['email'])
            if request.data['password_reset'] != instance.password_reset:
                return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)
        except RegistrationProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        user = instance.user

        user.set_password(data['password'])

        return Response({'Password Changed'}, status=status.HTTP_200_OK)


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
