# django
from django.db import transaction

# Rest framework
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

# Models
from api.models import Migrante

# Serializer
from api.serializers import MigranteBaseSerializer, MigranteReadSerializer, MigranteSaveSerializer


class MigranteViewSet(viewsets.ModelViewSet):
    serializer_class = MigranteReadSerializer
    queryset = Migrante.objects.filter(active=True)
    permission_classes = [AllowAny]

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombres",)
    search_fields = ("nombres",)
    ordering_fields = ("id", "nombres")

    # def get_permissions(self):
    #     if self.action in ('buscar',):
    #         self.permission_classes = [AllowAny]
    #     return super(self.__class__, self).get_permissions()

    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)
        if async_options:
            return MigranteBaseSerializer
        if self.action == 'list' or self.action == 'retrieve':
            return MigranteReadSerializer
        else:
            return MigranteSaveSerializer

    def create(self, request, *args, **kwargs):
        user = request.user.id
        data = request.data
        data['createdBy'] = user # user who created the record 

        with transaction.atomic():
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        usuario = request.user.id
        data = request.data
        instance = self.get_object()
        data['updatedBy'] = usuario # user who updated the record

        with transaction.atomic():
            serializer = self.get_serializer(instance, data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["get"], detail=False)
    def buscar(self, request, *args, **kwargs):

        # instance = self.get_object()
        # serializer = self.get_serializer(instance).data

        return Response({'data': 'hola hola'})