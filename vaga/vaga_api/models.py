from django.db import models
from django.contrib.auth.models import AbstractUser

ESCOLARIDADES_CHOICES = (
    (1, 'Ensino fundamental'),
    (2, 'Ensino médio'),
    (3, 'Tecnólogo'),
    (4, 'Ensino Superior'),
    (5, 'Pós / MBA / Mestrado'),
    (6, 'Doutorado')
)
class User(AbstractUser):
    is_candidato = models.BooleanField(default=False)
    is_empresa = models.BooleanField(default=False) 

    def save(self, *args, **kwargs):
        self.username = self.email
        return super().save(*args, **kwargs)
 
class Candidato(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='candidato')
    pretensao_salarial = models.DecimalField(max_digits= 8, decimal_places=2)
    experiencia = models.CharField(max_length = 300)
    escolaridade = models.PositiveSmallIntegerField(choices=ESCOLARIDADES_CHOICES, default=1, blank=False, null=False)

    def __str__(self):
        return self.user.email
    
class Empresa(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='empresa')

    def __str__(self):
        return self.user.email



class Vaga(models.Model):
    FAIXA_SALARIAL_CHOICES = (
        (1, 'Até 1.000'),
        (2, 'De 1.000 a 2.000'),
        (3, 'De 2.000 a 3.000'),
        (4, 'Acima de 3.000')
    )

    nome = models.CharField(max_length = 180)
    faixa_salarial = models.PositiveSmallIntegerField(choices=FAIXA_SALARIAL_CHOICES, default=1, blank=False, null=False)
    requisitos = models.CharField(max_length = 300)
    escolaridade_minima = models.PositiveSmallIntegerField(choices=ESCOLARIDADES_CHOICES, default=1, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
    updated = models.DateTimeField(auto_now = True, blank = True)
    candidatos = models.ManyToManyField(Candidato, blank = True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)


    def __str__(self):
        return self.nome
    
