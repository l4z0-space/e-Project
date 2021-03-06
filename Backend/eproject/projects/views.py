from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.parsers import JSONParser, FileUploadParser

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import parser_classes

from .models import Project
from .serializers import ProjectSerializer,ProjectListSerializer
from api.models import User

from base64 import b64encode
from json import dumps, loads
import base64
import json


@api_view(['GET'])
@permission_classes((AllowAny, ))
def list_projects_view(request):
    projects = Project.objects.all() 
    serializer = ProjectListSerializer(projects, many=True)

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
    recent_projects = Project.objects.exclude(status='in_progress').order_by('-updated_on')[:5]

    serializer = ProjectListSerializer(recent_projects, many=True)
    
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


@api_view(['PUT'])
def edit_project_view(request, pk):

    payload = request.data
    user_id = payload['author'] 
    
    try:
        project_item = Project.objects.filter(author=user_id, id=pk).first()
    except Project.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND, 
                        headers={"Access-Control-Allow-Origin": "*",
                                 "Access-Control-Allow-Headers": "*"})
    
    data = {}

    # Update project
    serializer = ProjectSerializer(project_item, data=payload)
    
    if serializer.is_valid():
        serializer.save()
        data['success'] = 'Update Successful'
        return Response(data=data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_project_view(request, pk):

    try:
        project = Project.objects.get(id=pk)
    except Project.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectSerializer(project)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([JSONParser])
def projects_upload_view(request, format=None):
    
    try:

        file_as_base64 = request.data['file']
        file_as_base64 = file_as_base64[file_as_base64.find(',')+1:]

        url_bytes_b64 = base64.urlsafe_b64decode(file_as_base64)
        file_as_string = str(url_bytes_b64, "utf-8")

        file_as_json = json.loads(file_as_string)

        wrong_formatted = []
        proper_formatted = []

        token = request.headers['Authorization']
        user_id = Token.objects.get(key=token).user_id

        for project_as_json in file_as_json:
            project_as_json['author']=user_id
            new_project = Project()
            serializer = ProjectSerializer(new_project, data=project_as_json)
            if serializer.is_valid():
                serializer.save()
                proper_formatted.append(serializer.data)

            else:
                wrong_formatted.append(project_as_json)

        return Response(
            data={
                "proper_formatted":proper_formatted,
                "wrong_formatted":wrong_formatted
            },
            status=status.HTTP_200_OK)

    except Exception:
        return Response({'error':'File not in proper JSON format.'}, status=status.HTTP_400_BAD_REQUEST)



    # return Response({'received data': request.data})z