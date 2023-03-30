from rest_framework import serializers, filters
# from rest_framework import status

from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView, ListAPIView

from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
# from rest_framework_simplejwt.views import TokenObtainPairView

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

# class GetUserAndTokenView(TokenObtainPairView):
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#
#         try:
#             serializer.is_valid(raise_exception=True)
#         except TokenError as e:
#             raise InvalidToken(e.args[0])
#
#         responseToken = serializer.validated_data
#
#
#         response_data = {
#             'refresh': responseToken['refresh'],
#             'access': responseToken['access'],
#             'user': {
#                 "id":serializer.user.id,
#                 "email":serializer.user.email,
#                 "first_name": serializer.user.first_name,
#                 "last_name": serializer.user.last_name,
#                 "username":serializer.user.username,
#                 # "job": serializer.user.job,
#                 # "avatar": serializer.user.avatar,
#                 # "banner": serializer.user.banner,
#                 "location": serializer.user.location,
#                 "phone": serializer.user.phone,
#                 "about_me": serializer.user.about_me,
#                 "tags": serializer.user.tags,
#                 # "logged_in_user_is_following": serializer.user.logged_in_user_is_following,
#                 # "logged_in_user_is_friends": serializer.user.logged_in_user_is_friends,
#                 # "logged_in_user_is_rejected": serializer.user.logged_in_user_is_rejected,
#                 # "logged_in_user_received_fr": serializer.user.logged_in_user_received_fr,
#                 # "logged_in_user_sent_fr": serializer.user.logged_in_user_sent_fr,
#                 # "amount_of_posts": serializer.user.amount_of_posts,
#                 # "amount_of_likes": serializer.user.amount_of_likes,
#                 # "amount_of_friends": serializer.user.amount_of_friends,
#                 # "amount_of_followers": serializer.user.amount_of_followers,
#                 # "amount_following": serializer.user.amount_following
#             }
#         }
#
#         return Response(response_data, status=status.HTTP_200_OK)
