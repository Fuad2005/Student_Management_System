from rest_framework import serializers
from .models import Person, User



class RegisterSerializer(serializers.ModelSerializer):

    role = serializers.ChoiceField(
        choices=[('admin', 'Admin'), ('manager', 'Manager'), ('teacher', 'Teacher'), ('student', 'Student')],
        write_only=True,
        default='student'
    )


    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'role']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        role = validated_data.pop('role', None)
        user_instance = User.objects.create_user(**validated_data)
        
        Person.objects.create(user=user_instance, role=role)
        return user_instance

    

class PersonSerializer(serializers.ModelSerializer):
    user = RegisterSerializer()
    class Meta:
        model = Person
        fields = ('id', 'user', 'role', 'created_at', 'updated_at')
        read_only_fields = ['id', 'created_at', 'updated_at']






# def create(self, validated_data):
#     role = validated_data.pop('role', 'student')
#     password = validated_data.pop('password', None)
#     user_instance = User.objects.create_user(**validated_data)
#     if password is not None:
#         user_instance.set_password(password)
#     user_instance.save()
    
#     person_instance = Person.objects.create(user=user_instance, role=role)
#     person_instance.save()
#     return user_instance