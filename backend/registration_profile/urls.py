from django.urls import path

from registration_profile.views import CreateRegProfileView, CreateUserView

urlpatterns = [
    path('', CreateRegProfileView.as_view()),
    path('validation/', CreateUserView.as_view())
]
