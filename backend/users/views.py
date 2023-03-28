from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from users.models import User
from users.permissions import IsOwner
from users.serializers import UserAdminSerializer, UserDefaultSerializer


# Create your views here.
class ListCreateUserView(ListCreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]





class RetrieveUpdateDeleteUserView(RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    # serializer_class = UserAdminSerializer
    lookup_field = 'username'
    permission_classes = [IsAuthenticated, IsAdminUser | IsOwner]

    def get_serializer(self, *args, **kwargs):

        serializer_class = UserAdminSerializer
        if self.request.user == self.get_object():
            if not self.request.user.is_staff:
                serializer_class = UserDefaultSerializer
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)