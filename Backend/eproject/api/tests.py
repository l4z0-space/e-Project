from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status
from api.models import User

CREATE_USER_URL = reverse('accounts:create')
TOKEN_URL = reverse('accounts:token')
ME_URL = reverse('accounts:me')


class AuthenticationTests(TestCase):
    """ Test the users API """
    
    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """ Test creating the user with valid payload is successful """
        payload = {
            'email' : 'lazo@test.com',
            'password' : 'test123',
            'name' : 'Test Name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(**res.data)
        # Password shouldn't be in response
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    
    def test_user_can_login_token(self):
        """ Test that a registered user can get the token (login) """
        registerPayload = {
            'email' : 'test@gmail.com',
            'password' : 'test123',
            'name' : 'Test Name'
        }
        registerResponse = self.client.post(CREATE_USER_URL, registerPayload)
        self.assertEqual(registerResponse.status_code, status.HTTP_201_CREATED)

        # To login user just need to request the token at TOKEN_URL

        loginPayload = {
            'email': 'test@gmail.com',
            'password': 'test123'
        }
        # Check if token is in the response
        loginResponse = self.client.post(TOKEN_URL, loginPayload)
        self.assertIn('token', loginResponse.data)


    def test_user_exists(self):
        """ Test that creating an existing user fails """
        payload = {
            'email' : 'test@email.com',
            'password' : 'test123',
            'name' : 'Test Name'
        }
        # Create for 1st time
        res1 = self.client.post(CREATE_USER_URL, payload)
        # Create for 2nd time
        res2 = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res2.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_short(self):
        """ Password more than 5 chars """
        payload = {
            'email' : 'test@email.com',
            'password' : 'four',
            'name' : 'Test Name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = User.objects.filter(email=payload['email']).exists()
        self.assertFalse(user_exists)

  
