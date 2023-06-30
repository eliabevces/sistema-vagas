from rest_framework import serializers
from .models import Vaga
class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = ["nome", "faixa_salarial", "requisitos", "escolaridade_minima", "timestamp", "updated", "candidatos"]