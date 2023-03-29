from rest_framework import serializers, filters
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, RetrieveUpdateAPIView, \
    GenericAPIView, ListAPIView

from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny, DjangoModelPermissions
from rest_framework.response import Response

from users.models import User
from users.permissions import IsOwner
from users.serializers import UserAdminSerializer, UserDefaultSerializer


# Create your views here.
class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["id", "password", "groups", "user_permissions", "is_superuser", "is_staff", "is_active"]
        read_only_fields = ['email']


class DjangoFilterBackend:
    pass


class ListCreateUserView(ListAPIView):

    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']

    # def get_queryset(self):
    #     query = self.request.GET.get('search', '')  # search is the params and '' the default value
    #     queryset = User.objects.filter(username__contains=query).order_by('-created')
    #     return queryset



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


class GetUpdateOwnUserView(RetrieveUpdateAPIView):
    serializer_class = UserMeSerializer

    def get_object(self):

        return self.request.user




