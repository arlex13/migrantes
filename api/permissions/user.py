# rest framework
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied


class UserPermissions(BasePermission):
    """Restrict what the user can do according to the user rol """

    def has_permission(self, request, view):
        user = request.user

        if user.is_superuser:
            return True
        if view.action in ['me']:
            return True
        if request.method == 'GET' and request.query_params.get('async_options') == "true":
            return True
        if view.action in ['retrieve', 'list'] and user.has_perm('api.view_user'):
            return True
        if view.action == "destroy" and user.has_perm('api.delete_user'):
            return True
        if view.action == "update" and user.has_perm('api.change_user'):
            return True
        if view.action == "create" and user.has_perm('api.add_user'):
            return True
        raise PermissionDenied(
            'Usted no tiene permiso para realizar esta acción.')
