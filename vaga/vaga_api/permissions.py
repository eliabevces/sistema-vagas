from rest_framework.permissions import BasePermission



class IsCandidatoUser(BasePermission):
    def has_permission(self, request, view):

        return bool(request.user and request.user.is_candidato)


class IsEmpresaUser(BasePermission):
    def has_permission(self, request, view):

        return bool(request.user and request.user.is_empresa)