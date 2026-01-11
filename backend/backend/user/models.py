from django.db import models
from django.contrib.auth.models import User

ROLES = (
    ('admin', 'Admin'),
    ('manager', 'Manager'),
    ('teacher', 'Teacher'),
    ('student', 'Student')
)

# Create your models here.



class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=25, choices=ROLES, default='student')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Person"
        verbose_name_plural = "People"

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'