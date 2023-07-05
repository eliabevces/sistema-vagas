from django.shortcuts import redirect, render
from django.http import request
from django.views.generic import CreateView
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, generics,permissions
from rest_framework.renderers import JSONRenderer
from .models import Vaga, Empresa, User
from .serializers import VagaSerializer, UserSerializer, CandidatoSignupSerializer, EmpresaSerializer
from .permissions import IsCandidatoUser, IsEmpresaUser



# @api_view(['GET', 'POST'])
class VagaListApiView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    
    def get(self, request, format=None):
        data = Vaga.objects.all()

        serializer = VagaSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = VagaSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_201_CREATED)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class VagaListApiView(APIView):
#     # add permission to check if user is authenticated
#     # permission_classes = [permissions.IsAuthenticated]

#     # 1. List all
#     def get(self, request, *args, **kwargs):

#         Vagas = Vaga.objects
#         serializer = VagaSerializer(Vagas, many=True)
#         return Response(JSONRenderer().render(serializer.data), status=status.HTTP_200_OK)

#     # 2. Create
#     def post(self, request, *args, **kwargs):

#         data = {
            
#             'nome': request.data.get('nome'), 
#             'faixa_salarial': request.data.get('faixa_salarial'), 
#             'requisitos': request.data.get('requisitos'), 
#             'escolaridade_minima': request.data.get('escolaridade_minima')
#         }

#         serializer = VagaSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def EmpresasListApiView(request):

    if request.method == 'GET':
        data = Empresa.objects.all()

        serializer = EmpresaSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
    # def post(self, request, *args, **kwargs):

    #     data = {
            
    #         'first_name': request.data.get('first_name'), 
    #         'faixa_salarial': request.data.get('faixa_salarial'), 
    #         'requisitos': request.data.get('requisitos'), 
    #         'escolaridade_minima': request.data.get('escolaridade_minima')
    #     }

    #     serializer = VagaSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
# class EmpresasListApiView(APIView):

#     def get(self, request, *args, **kwargs):
#         users = Empresa.objects
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

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


# class EmpresaSignupView(generics.GenericAPIView):
#     serializer_class=EmpresaSignupSerializer
#     def post(self, request, *args, **kwargs):
#         serializer=self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user=serializer.save()
#         return Response({
#             "user":UserSerializer(user, context=self.get_serializer_context()).data,
#             "message":"account created successfully"
#         })




# class LogoutView(APIView):
#     def post(self, request, format=None):
#         request.auth.delete()
#         return Response(status=status.HTTP_200_OK)


# class CandidatoOnlyView(generics.RetrieveAPIView):
#     permission_classes=[permissions.IsAuthenticated&IsCandidatoUser]
#     serializer_class=UserSerializer

#     def get_object(self):
#         return self.request.user

# class EmpresaOnlyView(generics.RetrieveAPIView):
#     permission_classes=[permissions.IsAuthenticated&IsEmpresaUser]
#     serializer_class=UserSerializer

#     def get_object(self):
#         return self.request.user