from django.db import models
from django.contrib.auth.models import User

class Vaga(models.Model):
    nome = models.CharField(max_length = 180)
    faixa_salarial = models.CharField(max_length = 180)
    requisitos = models.CharField(max_length = 180)
    escolaridade_minima = models.CharField(max_length = 180)
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
    updated = models.DateTimeField(auto_now = True, blank = True)
    candidatos = models.ManyToManyField(User, blank = True, null = True)

    def __str__(self):
        return self.task
    
