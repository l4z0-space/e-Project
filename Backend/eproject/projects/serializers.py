from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Project

class ProjectListSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Project
        fields = '__all__'
    

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'