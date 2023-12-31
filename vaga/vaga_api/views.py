from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics
from django.contrib.auth.password_validation import validate_password
from .models import User, Candidato, Vaga
from .serializers import VagaSerializer, EmpresaSerializer, MyTokenObtainPairSerializer, CandidatoSerializer, UserSerializer
from .permissions import IsCandidatoUser, IsEmpresaUser
import json


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterEmpresaView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = EmpresaSerializer

class RegisterCandidatoView(generics.CreateAPIView):
    serializer_class = CandidatoSerializer

    def create(self, request, *args, **kwargs):
        post_data = request.data
        if post_data['password'] != post_data['password2']:
            raise ValidationError(
                {"password": "Password fields didn't match."})
        
        validate_password(post_data['password'])

        user = User.objects.create(
            username=post_data['username'],
            email=post_data['email'],
            is_empresa=post_data['is_empresa'],
            is_candidato= post_data['is_candidato'],
            first_name=post_data['first_name']
        )

        user.set_password(post_data['password'])
        user.save()


        candidato = Candidato.objects.create(
            user=user , pretensao_salarial=post_data["pretensao_salarial"], escolaridade=post_data["escolaridade"], experiencia=post_data["experiencia"])
        candidato.save()

        serializer = CandidatoSerializer(candidato)

        return Response(serializer.data)
  
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/test/'
    ]
    return Response(routes)


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
@permission_classes([IsEmpresaUser])
def VagaListApiView(request):

    if request.method == 'GET':
        
        Vagas = Vaga.objects.filter(empresa=request.user.id)
        serializer = VagaSerializer(Vagas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        data = {
            'nome': request.data.get('nome'), 
            'faixa_salarial': request.data.get('faixa_salarial'), 
            'requisitos': request.data.get('requisitos'), 
            'escolaridade_minima': request.data.get('escolaridade_minima'),
            'empresa': request.user.id
            
        }

        serializer = VagaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PATCH':
        try:
            data = {
                'id': request.data.get('id'),
                'nome': request.data.get('nome'), 
                'faixa_salarial': request.data.get('faixa_salarial'), 
                'requisitos': request.data.get('requisitos'), 
                'escolaridade_minima': request.data.get('escolaridade_minima'),
                'empresa': request.user.id
                
            }
            Vaga.objects.filter(id=data['id']).update(nome=request.data.get('nome'), faixa_salarial=data['faixa_salarial'], requisitos=data['requisitos'], escolaridade_minima=data['escolaridade_minima'])
            return Response(status=status.HTTP_200_OK)

        except json.JSONDecodeError:    
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        id = request.data.get('id')
        Vaga.objects.filter(id=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsEmpresaUser])
def VagaInfoView(request, id_vaga):

    if request.method == 'GET':
        try:
            vaga = Vaga.objects.get(id=id_vaga)
            serializer = VagaSerializer(vaga)
            return Response(serializer.data)
        except json.JSONDecodeError:    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([IsEmpresaUser])
def CandidatoInfoView(request, id_candidato):

    if request.method == 'GET':
        try:
            candidato = Candidato.objects.get(user_id=id_candidato)
            serializer = CandidatoSerializer(candidato, many=False)
            return Response(serializer.data)
        except json.JSONDecodeError:    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserInfoView(request, id_user):

    if request.method == 'GET':
        try:
            user = User.objects.get(id=id_user)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except json.JSONDecodeError:    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH'])
@permission_classes([IsCandidatoUser])
def CandidatoVagaListApiView(request):

    if request.method == 'GET':
        
        Vagas = Vaga.objects.all().exclude(candidatos__user=request.user.id)
        serializer = VagaSerializer(Vagas, many=True)
        return Response(serializer.data)

    elif request.method == 'PATCH':
         
        try:
            print(request.data)
            print(request.user.id)
            cand = Candidato.objects.get(user=request.user.id)
            vaga = Vaga.objects.get(id=request.data.get('id'))
            vaga.candidatos.add(cand)
            vaga.save()
            serializer = VagaSerializer(vaga)
            return Response(serializer.data)
        except json.JSONDecodeError:    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
