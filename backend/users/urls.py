from django.urls import path

from users.views import ListCreateUserView, RetrieveUpdateDeleteUserView

urlpatterns = [
    path('', ListCreateUserView.as_view()),
    path("<str:username>/", RetrieveUpdateDeleteUserView.as_view()),
]
