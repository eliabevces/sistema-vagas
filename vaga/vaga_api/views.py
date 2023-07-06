from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics,permissions
from django.contrib.auth.password_validation import validate_password
from .models import User, Candidato
from .serializers import VagaSerializer, EmpresaSerializer, MyTokenObtainPairSerializer, CandidatoSerializer
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


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)
            if 'text' not in data:
                return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f'Congratulation your API just responded to POST request with text: {text}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
    return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)

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

