from django.contrib import admin
from .models import Candidato, Empresa, Vaga, User
# Register your models here.

admin.site.register(User)
admin.site.register(Candidato)
admin.site.register(Empresa)
admin.site.register(Vaga)