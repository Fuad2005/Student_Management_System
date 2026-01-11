from django.shortcuts import render
from os import getenv
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from .models import Person, User
from .serializers import RegisterSerializer, PersonSerializer
from rest_framework.response import Response
from rest_framework import status
import jwt, datetime


# Create your views here.
class RegisterAV(RetrieveAPIView, CreateAPIView):
    queryset = Person.objects.all()
    serializer_class = RegisterSerializer


class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {
            'email': user.username,
            'role': user.person.role,
            'id': user.id,
            'exp': datetime.datetime.now() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.now()
        }

        token = jwt.encode(payload, getenv('JWT_SECRET_KEY'), algorithm='HS256')

        response = Response()

        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response
    

class GetUserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            payload = jwt.decode(token, getenv('JWT_SECRET_KEY'), algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            user = User.objects.get(id=payload['id'])
            person = user.person
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        except Person.DoesNotExist:
            return Response({'message': 'Person not found'}, status=404)

        serializer = PersonSerializer(person)

        return Response(serializer.data)