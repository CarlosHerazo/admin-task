from django.urls import path
from .views import *
urlpatterns = [
    path('', index ), 
    path('login/', login),
    path('logout/', logout_view, name="logout")
]
