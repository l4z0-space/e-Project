from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from accounts.api.serializers import RegistrationSerializer, \
AccountPropertiesSerializer, ChangePasswordSerializer

# Register endpoint: <domain>/api/account/register
@api_view(['POST'])
@permission_classes([])
def registration_view(request):


    data = {}

    # Retrive email and check whether it exists
    email = request.data.get('email', '0').lower()
    if not is_email_valid(email):
       data['error_message'] = 'That email is already in use.'
       data['response'] = 'Error'
       return Response(data)

    # Retrieve username and check whether it exists
    username = request.data.get('username', '0')
    if not is_username_valid(username):
        data['error_message'] = 'That username is already in use.'
        data['response'] = 'Error'
        return Response(data)

    serializer = RegistrationSerialzer(data=request.data)

    if serializer.is_valid():
        account = serializer.save()
        data['response'] = 'Registration successful.'
        data['email'] = account.email
        data['username'] = account.username
        data['pk'] = account.pk
        token = Token.objects.get(user=account).key
        data['token'] = token
    else:
        data = serializer.errors

    return Response(data)

def is_email_valid(email):
    account = None
    try:
        account = Account.objects.get(email=email)
    except account.DoesNotExist:
        return True

    # If account exists then email is not valid
    if account != None:
        return False


def is_username_valid(username):
    account = None
    try:
        account = Account.objects.get(username=username)
    except account.DoesNotExist:
        return True

    # If account exists, then username is not valid
    if account != None:
        return False


# Account Properties
@api_view(['GET'])
@permission_classes(('IsAuthenticated'))
def account_properties_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AccountPropertiesSerializer(account)
    return Response(serializer.data)

# Login View
# Endpoint: <domain>/api/account/login
class ObtainAuthTokenView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        data = {}

        email = request.POST.get('username')
        password = request.POST.get('password')
        account = authenticate(email=email, password=password)

        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            data['response'] = "Authentication Successful"
            data['pk'] = account.pk
            data['email'] = email.lower()
            data['token'] = token.key
        else:
            data['response'] = 'Error'
            data['error_message'] = 'Invalid credentials'

        return Response(data)
