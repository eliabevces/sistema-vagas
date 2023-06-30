from django.urls import path, include
from .views import (
    VagaListApiView,
)

urlpatterns = [
    path('api', VagaListApiView.as_view()),
]