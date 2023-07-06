from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Vaga, User, Candidato, Empresa

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = ["nome", "faixa_salarial", "requisitos", "escolaridade_minima", "timestamp", "updated", "candidatos", "empresa"]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_empresa'] = user.is_empresa
        token['is_candidato'] = user.is_candidato
        # ...
        return token


class EmpresaSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', "is_empresa", 'is_candidato', "first_name")

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_empresa=validated_data['is_empresa'],
            is_candidato= validated_data['is_candidato'],
            first_name=validated_data['first_name']
        )

        user.set_password(validated_data['password'])
        user.save()
        if user.is_empresa:
            Empresa.objects.create(user=user)
        return user

class CandidatoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Candidato
        fields = ('user', 'pretensao_salarial', 'escolaridade', 'experiencia')
        depth = 1
