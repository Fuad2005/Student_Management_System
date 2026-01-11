from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterAV.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('get-user/', views.GetUserView.as_view(), name='login'),
]
