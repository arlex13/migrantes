# rest framework
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied

from api.models.user import User


class UserPermissions(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if user.is_superuser:
            return True
        if view.action in ['me']:
            return True
        if request.method == 'GET' and request.query_params.get('async_options') == "true":
            return True
        if user.rol == User.ADMINISTRADOR:
            return True
        raise PermissionDenied(
            'Solo los administradores pueden realizar esta acción')

class UserAsistenteAdminPermissions(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if  view.action != "destroy" and user.rol == User.ASISTENTE:
            return True
        if user.rol == User.ADMINISTRADOR:
            return True
        raise PermissionDenied(
                'Solo los administradores pueden realizar esta acción')

class UserAdminPermissions(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if user.rol == User.ADMINISTRADOR:
            return True
        raise PermissionDenied(
                'Solo los administradores pueden realizar esta acción')