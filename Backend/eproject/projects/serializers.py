from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Project
        fields = '__all__'
    

    