from django.urls import path

from accounts.api.views import (
    registration_view, ObtainAuthTokenView,
    account_properties_view
)

from rest_framework.authtoken.views import obtain_auth_token

app_name = 'account'

urlpatterns = [
    path('login', ObtainAuthTokenView.as_view(), name='login'),
    path('properties', account_properties_view, name='properties'),
    path('register', registration_view, name='register')

]
