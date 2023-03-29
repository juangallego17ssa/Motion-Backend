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
    ListFollowingView, ListFriendsPostView

urlpatterns = [
    path('posts/', ListCreatePostView.as_view()),
    path("posts/<int:id>/", RetrieveUpdateDeletePostView.as_view()),
    path("posts/<int:id>/toogle_like/", LikePostView.as_view()),
    path("posts/likes/", ListLikesView.as_view()),
    path("posts/following/", ListPostFollowingView.as_view()),
    path("posts/user/<int:user_id>/", ListUserPostsView.as_view()),  # not done
    path("posts/friends/", ListFriendsPostView.as_view()),
    path("followers/toggle-follow/<int:user_id>/", FollowUserView.as_view()),
    path("followers/followers/", ListFollowersView.as_view()),
    path("followers/following/", ListFollowingView.as_view()),
    path('comments/<int:id>/', CommentListCreateView.as_view()),
]
