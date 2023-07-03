from django.shortcuts import redirect, render
from django.http import request
from django.views.generic import CreateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, generics,permissions
from .models import Vaga
from .serializers import VagaSerializer, UserSerializer, CandidatoSignupSerializer, EmpresaSignupSerializer
from .permissions import IsCandidatoUser, IsEmpresaUser




class VagaListApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the Vaga items for given requested user
        '''
        Vagas = Vaga.objects
        serializer = VagaSerializer(Vagas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Vaga with given Vaga data
        '''
        data = {
            
            'nome': request.data.get('nome'), 
            'faixa_salarial': request.data.get('faixa_salarial'), 
            'requisitos': request.data.get('requisitos'), 
            'escolaridade_minima': request.data.get('escolaridade_minima')
        }

        serializer = VagaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CandidatoSignupView(generics.GenericAPIView):
    serializer_class=CandidatoSignupSerializer
    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response({
            "user":UserSerializer(user, context=self.get_serializer_context()).data,
            "message":"account created successfully"
        })


class EmpresaSignupView(generics.GenericAPIView):
    serializer_class=EmpresaSignupSerializer
    def post(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response({
            "user":UserSerializer(user, context=self.get_serializer_context()).data,
            "message":"account created successfully"
        })




class LogoutView(APIView):
    def post(self, request, format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)


class CandidatoOnlyView(generics.RetrieveAPIView):
    permission_classes=[permissions.IsAuthenticated&IsCandidatoUser]
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user

class EmpresaOnlyView(generics.RetrieveAPIView):
    permission_classes=[permissions.IsAuthenticated&IsEmpresaUser]
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user