from rest_framework import filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404, ListAPIView, \
    GenericAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from emails.models import send_new_post_email
from posts.permissions import IsOwner
from posts.models import Post
from posts.serializers import PostSerializer
from django.contrib.auth import get_user_model

from users.serializers import UserAdminSerializer

User = get_user_model()


#########################################################################
#########################################################################
class ListCreatePostView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['content']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        send_new_post_email(self.request.user, serializer.validated_data['post'])


#########################################################################
#########################################################################
class RetrieveUpdateDeletePostView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsOwner]

    def check_permissions(self, request):
        if request.method == "GET":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAuthenticated, IsOwner | IsAdminUser]
        for permission in self.get_permissions():
            if not permission.has_permission(request, self):
                self.permission_denied(
                    request,
                    message=getattr(permission, 'message', None),
                    code=getattr(permission, 'code', None)
                )


#########################################################################
#########################################################################
class LikePostView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def get(self, request, **kwargs):
        obj = self.get_object()
        has_liked = obj.liked_by.all()
        user = request.user
        if user in has_liked:
            obj.liked_by.remove(user)
        else:
            obj.liked_by.add(user)

        obj.like_count = obj.liked_by.count()
        obj.save()

        return self.retrieve(request, **kwargs)


#########################################################################
#########################################################################
class ListLikesView(ListCreateAPIView):

    def post(self, request, *args, **kwargs):
        pass

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        self.queryset = Post.objects.filter(liked_by=request.user)
        return self.list(request, *args, **kwargs)


#########################################################################
#########################################################################
class ListPostFollowingView(ListCreateAPIView):

    def post(self, request, *args, **kwargs):
        pass

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        self.queryset = Post.objects.filter(created_by__in=request.user.follower.all())
        # created_by__user__to_user_id__from_user_id = request.user
        return self.list(request, *args, **kwargs)


#########################################################################
#########################################################################
class ListUserPostsView(ListCreateAPIView):

    def post(self, request, *args, **kwargs):
        pass

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        obj_user = self.get_object(User.objects.all(), "user_id")
        self.queryset = Post.objects.filter(created_by=obj_user)
        # created_by__user__to_user_id__from_user_id = request.user
        return self.list(request, *args, **kwargs)

    def get_object(self, queryset, lookup_url_kwarg):
        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


#########################################################################
#########################################################################

class ToggleFollowView(GenericAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'
    serializer_class = UserAdminSerializer


    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        social = request.user

        if social not in instance.followers.all():
            instance.followers.add(social)

        else:
            instance.followers.remove(social)
        instance.save()


        return Response({
            'message': 'Follow status updated successfully',

        })
class FollowUserView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def get(self, request, **kwargs):

        obj_user = request.user
        followers = obj_user.followers.all()

        self.permission_classes = [IsAuthenticated]
        obj_followers = self.get_object(queryset=User.objects.all(), lookup_url_kwarg="user_id")
        self.permission_classes = [IsAuthenticated | IsAdminUser]

        if obj_followers in followers:
            obj_user.followers.remove(obj_followers)
        else:
            obj_user.followers.add(obj_followers)

        return self.retrieve(request, User.objects.all(), "user_id", **kwargs)

    def get_object(self, queryset, lookup_url_kwarg):

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj

    def retrieve(self, request, queryset, lookup_url_kwarg, **kwargs):
        instance = self.get_object(queryset, lookup_url_kwarg)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


#########################################################################
#########################################################################
class ListFollowersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        self.queryset = User.objects.filter(follower=request.user)
        return self.list(request, *args, **kwargs)


#########################################################################
#########################################################################
class ListFollowingView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        self.queryset = User.objects.filter(followers=request.user)
        return self.list(request, *args, **kwargs)

class ListFriendsPostView(ListAPIView):

    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        friends = user.friend.all()

        return Post.objects.filter(created_by__in=friends)

class ListOwnPostsView(ListAPIView):

    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user


        return Post.objects.filter(created_by=user)




#########################################################################
#########################################################################