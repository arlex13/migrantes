# rest framework
from rest_framework import serializers

# models
from api.models import Migrante



class MigranteBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Migrante
        fields = ('id', 'nombres', 'apellidos', 'dpi')


class MigranteReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Migrante
        fields =  '__all__'

class MigranteSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Migrante
        fields = "__all__"