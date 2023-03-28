from django.urls import path

from registration_profile.views import CreateRegProfileView, CreateUserView

from backend.registration_profile.views import UpdateRegProfileCodeView

urlpatterns = [
    path('', CreateRegProfileView.as_view()),
    path('validation/', CreateUserView.as_view()),

]
