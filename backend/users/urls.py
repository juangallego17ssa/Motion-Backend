from django.urls import path

from users.views import ListCreateUserView, RetrieveUpdateDeleteUserView, GetUpdateOwnUserView, \
    FriendRequestView, FriendRequestDetailView, FriendsView

urlpatterns = [
    path('', ListCreateUserView.as_view()),
    path('me/', GetUpdateOwnUserView.as_view()),
    path('<str:username>/', RetrieveUpdateDeleteUserView.as_view()),

    path('social/followers/toggle-follow/<int:user_id>/', ToggleFollowView.as_view()),
    path('social/followers/followers/', FollowersView.as_view()),
    path('social/followers/following/', FollowingView.as_view()),
    path('social/friends/request/<int:user_id>/', FriendRequestView.as_view()),
    path('social/friends/requests/<int:friend_request_id>/', FriendRequestDetailView.as_view()),
    path('social/friends/', FriendsView.as_view()),
    path('users/', SearchUsersView.as_view()),
    path('users/<int:user_id>/', UserDetailView.as_view()),
]
