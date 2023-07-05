from rest_framework import serializers
from .models import Vaga, User, Candidato, Empresa

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = ["nome", "faixa_salarial", "requisitos", "escolaridade_minima", "timestamp", "updated", "candidatos", "empresa"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['email', 'first_name', 'is_candidato', 'is_empresa']
        extra_kwargs = {
            'first_name': {'required': True}
        }

class CandidatoSignupSerializer(serializers.ModelSerializer):
    # password=serializers.CharField(style={"input_type":"password"}, write_only=True)
    # password2=serializers.CharField(style={"input_type":"password"}, write_only=True)
    class Meta:
        model=Candidato
        fields=['user', 'pretensao_salarial', 'escolaridade', 'experiencia']
        
    
    def save(self, **kwargs):
        user=self.validated_data['user']
        pretensao_salarial=self.validated_data['pretensao_salarial']
        escolaridade=self.validated_data['escolaridade']
        experiencia=self.validated_data['experiencia']
        user.is_candidato=True
        user.save()

        Candidato.objects.create(user=user, pretensao_salarial=pretensao_salarial, escolaridade=escolaridade, experiencia=experiencia)
        return user


class EmpresaSerializer(serializers.ModelSerializer):
    # password2=serializers.CharField(style={"input_type":"password"}, write_only=True)
    class Meta:
        model=User
        fields=['email', 'first_name','password', 'password2']
        extra_kwargs={
            'password':{'write_only':True}
        }
    

    # def save(self, **kwargs):
    #     user=User(
    #         email=self.validated_data['email'],
    #         first_name=self.validated_data['first_name']
    #     )
    #     password=self.validated_data['password']
    #     password2=self.validated_data['password2']
    #     if password !=password2:
    #         raise serializers.ValidationError({"error":"password do not match"})
    #     user.set_password(password)
    #     user.is_empresa=True
    #     user.save()
    #     Empresa.objects.create(user=user)
    #     return user