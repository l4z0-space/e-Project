from django.urls import path, include

from .views import create_project_view, list_projects_view, delete_project_view

app_name='projects'

urlpatterns = [
    path('create/', create_project_view, name='create-project'),
    path('list/', list_projects_view, name='list-projects'),
    path('delete/<int:pk>', delete_project_view, name='delete-project'),
]