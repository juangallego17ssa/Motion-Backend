from django.urls import path
from users.views import ListCreateUserView, RetrieveUpdateDeleteUserView, GetUpdateOwnUserView

urlpatterns = [


    path('', ListCreateUserView.as_view()),
    path('me/', GetUpdateOwnUserView.as_view()),

    path('<str:username>/', RetrieveUpdateDeleteUserView.as_view()),

]
