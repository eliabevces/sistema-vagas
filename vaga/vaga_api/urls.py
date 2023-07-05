from django.urls import path, include,re_path

from .views import (
    VagaListApiView,
    # UsersListApiView,
    EmpresasListApiView,
    CandidatoSignupView,
    # EmpresaSignupView,
    # LogoutView,
    # CandidatoOnlyView,
    # EmpresaOnlyView
    )

urlpatterns=[
    path('vagas/', VagaListApiView.as_view()),
    # path('users/', UsersListApiView),
    path('empresas/', EmpresasListApiView),
    path('signup/candidato/', CandidatoSignupView.as_view()),
    # path('signup/empresa/', EmpresaSignupView.as_view()),
    # path('logout/', LogoutView.as_view(), name='logout-view'),
    # path('candidato/dashboard/', CandidatoOnlyView.as_view(), name='candidato-dashboard'),
    # path('empresa/dashboard/', EmpresaOnlyView.as_view(), name='empresa-dashboard'),
]