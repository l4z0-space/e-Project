from django.db import models
from django.conf import settings


class Project(models.Model):
    """ Project Model: title, description, author, programming language, status """

    PROJECT_STATUSES = [
        ('pending', ('Pending')),
        ('in_progress', ('In Progress')),
        ('complete', ('Complete'))
    ]

    title = models.TextField(max_length=60)
    description = models.CharField(max_length=400)
    programming_language = models.TextField(max_length=150)
    status = models.CharField(max_length=100, choices=PROJECT_STATUSES, default='pending')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at'] 

    def __str__(self):
        return self.title 