from django.urls import path, include,re_path
from . import views


from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterEmpresaView.as_view(), name='auth_register'),
    path('register_candidato/', views.RegisterCandidatoView.as_view(), name='auth_register_candidato'),
    path('vagas/', views.VagaListApiView, name='vagas'),
    path('vagasInfo/<int:id_vaga>/', views.VagaInfoView, name='vaga_info'),
    path('candidatoInfo/<int:id_candidato>/', views.CandidatoInfoView, name='candidato_info'),
    path('userInfo/<int:id_user>/', views.UserInfoView, name='user_info'),
    path('inscrever_vagas/', views.CandidatoVagaListApiView, name='vagas_candidato'),
    path('', views.getRoutes)
]
