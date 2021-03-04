from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer
from api.models import User


@api_view(['GET'])
@permission_classes((AllowAny, ))
def list_projects_view(request):
    projects = Project.objects.all() 
    serializer = ProjectSerializer(projects, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def create_project_view(request):

    # Retrieve user id from token
    token = request.headers['Authorization']
    user_id = Token.objects.get(key=token).user_id

    data = request.data
    data['author'] = user_id

    # Create a new project 
    new_project = Project()

    # Serialize with the entered data
    serializer = ProjectSerializer(new_project, data=data)

    # Add Project 
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, 
                        headers={"Access-Control-Allow-Origin": "*",
                                 "Access-Control-Allow-Headers": "*"})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_recent_projects_view(request):

    # Get the last 5 completed projects
    recent_projects = Project.objects.filter(status='complete').order_by('-created_at')[:5]

    serializer = ProjectSerializer(recent_projects, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK) 


@api_view(['DELETE'])
def delete_project_view(request, pk):

    try:
        project_item = Project.objects.get(id=pk) 
    except Project.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND) 

    data = {}

    operation = project_item.delete()

    if operation:
        data['success'] = 'Delete Succesful'
    else:
        data['failure'] = 'Delete Failed'


    return Response(data=data, status=status.HTTP_204_NO_CONTENT)
