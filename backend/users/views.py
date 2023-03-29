from django.db.models import Q
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework import serializers, filters

from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView, ListAPIView

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from users.models import User
from users.permissions import IsOwner
from users.serializers import UserAdminSerializer, UserDefaultSerializer, UserSimpleSerializer
from django.shortcuts import get_object_or_404


# Create your views here.
class ListCreateUserView(ListCreateAPIView):
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


class ToggleFollowView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, user_id):
        user_to_follow = get_object_or_404(User, id=user_id)
        if request.user in user_to_follow.followers.all():
            user_to_follow.followers.remove(request.user)
            return Response({'detail': 'User unfollowed successfully.'})
        else:
            user_to_follow.followers.add(request.user)
            return Response({'detail': 'User followed successfully.'})


class FollowersView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        followers = request.user.followers.all()
        serializer = UserSimpleSerializer(followers, many=True)
        return Response(serializer.data)


class FollowingView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        following = request.user.follower.all()
        serializer = UserSimpleSerializer(following, many=True)
        return Response(serializer.data)


class FriendRequestView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, user_id):
        friend = get_object_or_404(User, id=user_id)
        sender = request.user
        if sender == friend:
            return Response(
                {"detail": "You cannot send friend request to yourself."},
            )
        if friend in sender.sent_friend_requests.all():
            return Response(
                {"detail": "You have already sent a friend request to this user."},
            )
            if friend in sender.friend.all():
                return Response(
                    {"detail": "You are already friends with this user."},
                )
            sender.sent_friend_requests.add(friend)
            friend.receive_friend_requests.add(sender)
            return Response(
                {"detail": "Friend request sent successfully."},
            )

    class FriendRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
        permission_classes = (IsAuthenticated,)

        def get(self, request, friend_request_id):
            friend_request = get_object_or_404(
                request.user.receive_friend_requests, id=friend_request_id
            )
            serializer = UserSimpleSerializer(friend_request.sender)
            return Response(serializer.data)

        def patch(self, request, friend_request_id):
            friend_request = get_object_or_404(
                request.user.receive_friend_requests, id=friend_request_id
            )
            accepted = request.data.get("accepted")
            if accepted is None:
                return Response(
                    {"accepted": ["This field is required."]},
                )
            if accepted:
                friend_request.sender.friend.add(request.user)
                request.user.friend.add(friend_request.sender)
                friend_request.delete()
                return Response(
                    {"detail": "Friend request accepted."},
                )
            friend_request.delete()
            return Response(
                {"detail": "Friend request rejected."},
            )

        def delete(self, request, friend_request_id):
            friend_request = get_object_or_404(
                request.user.receive_friend_requests, id=friend_request_id
            )
            friend_request.delete()
            return Response(
                {"detail": "Friend request deleted."},
            )

    class FriendsView(generics.ListAPIView):
        permission_classes = (IsAuthenticated,)

        def get(self, request):
            friends = request.user.friend.all()
            serializer = UserSimpleSerializer(friends, many=True)
            return Response(serializer.data)

    class SearchUsersView(generics.ListAPIView):
        serializer_class = UserSimpleSerializer
        permission_classes = (IsAuthenticated,)

        def get_queryset(self):
            queryset = User.objects.all()
            search_string = self.request.query_params.get('search', None)
            if search_string:
                queryset = queryset.filter(
                    Q(username__icontains=search_string) |
                    Q(first_name__icontains=search_string) |
                    Q(last_name__icontains=search_string) |
                    Q(email__icontains=search_string)
                )
            return queryset

    class UserDetailView(generics.RetrieveAPIView):
        serializer_class = UserAdminSerializer
        permission_classes = (IsAuthenticated,)

        def get_object(self):
            return get_object_or_404(User, id=self.kwargs['user_id'])

