from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer

@api_view(['GET'])
@permission_classes((AllowAny, ))
def list_projects_view(request):
    projects = Project.objects.all() 
    serializer = ProjectSerializer(projects, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def create_project_view(request):

    # Retrieve the authenticated user
    user = resuest.user

    # Create a new project linked with the user
    new_project = Project(author=user)

    # Serialize with the entered data
    serializer = ProjectSerializer(new_project, data=request.data)

    # Add Post 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
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
