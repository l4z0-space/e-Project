from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin


class UserManager(BaseUserManager):
    
    def create_user(self, name,email,phone, password=None, **extra_fields):
        """ Creates and saves a new user """
        
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(email=email,name=name, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """ Creates and saves a new superuser """
        user = self.model(email=email)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


  
class User(AbstractBaseUser, PermissionsMixin):
    """ Custom user model that supports email instead of username """
    email = models.EmailField(max_length=255, unique=True,null=False)
    name = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=50,null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'