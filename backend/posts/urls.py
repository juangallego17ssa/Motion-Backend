from django.urls import path

from comments.views import CommentListCreateView
from posts.views import \
    ListCreatePostView, \
    RetrieveUpdateDeletePostView, \
    LikePostView, \
    ListLikesView, \
    ListPostFollowingView, \
    ListUserPostsView, \
    FollowUserView, \
    ListFollowersView, \
    ListFollowingView, ListFriendsPostView, ToggleFollowView
from users.views import FriendRequestView, FriendRequestDetailView, FriendsView

urlpatterns = [
    path('posts/', ListCreatePostView.as_view()),
    path("posts/<int:id>/", RetrieveUpdateDeletePostView.as_view()),
    path("posts/<int:id>/toogle_like/", LikePostView.as_view()),
    path("posts/likes/", ListLikesView.as_view()),
    path("posts/following/", ListPostFollowingView.as_view()),
    path("posts/user/<int:user_id>/", ListUserPostsView.as_view()),  # not done
    path("posts/friends/", ListFriendsPostView.as_view()),
    path("followers/toggle-follow/<int:id>/", ToggleFollowView.as_view()),
    path("followers/followers/", ListFollowersView.as_view()),
    path("followers/following/", ListFollowingView.as_view()),
    path('comments/<int:id>/', CommentListCreateView.as_view()),
    path('friends/request/<int:user_id>/', FriendRequestView.as_view()),
    path('friends/requests/<int:friend_request_id>/', FriendRequestDetailView.as_view()),
    path('friends/', FriendsView.as_view()),
]
