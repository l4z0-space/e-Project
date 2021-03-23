from django.urls import path, include

from .views import (create_project_view, 
                    list_projects_view, 
                    delete_project_view,
                    get_recent_projects_view,
                    edit_project_view,
                    get_project_view,
                    )

app_name='projects'

urlpatterns = [
    path('create/', create_project_view, name='create-project'),
    path('list/', list_projects_view, name='list-projects'),
    path('delete/<int:pk>', delete_project_view, name='delete-project'),
    path('recentProjects/', get_recent_projects_view, name='recent-projects'),
    path('update/<int:pk>', edit_project_view, name='edit-project'),
    path('getProject/<int:pk>', get_project_view, name='get-project')
]