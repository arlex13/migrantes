from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import viewsets

router = DefaultRouter()
router.register(r'user', viewsets.UserViewSet)
router.register(r'migrante', viewsets.MigranteViewSet)
router.register(r'estadisticas', viewsets.EstadisticasViewSet, basename='estadisticas')

urlpatterns = [
    path('', include(router.urls)),
]