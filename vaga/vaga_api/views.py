from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Vaga
from .serializers import VagaSerializer

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
