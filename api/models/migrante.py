# Django
from django.db import models

# Models
from api.models import BaseModel

class Migrante(BaseModel):

  nombres = models.CharField(max_length=250)
  apellidos = models.CharField(max_length=250)

  no_identificacion = models.CharField(max_length=250, null=True, blank=True)
  fecha_nacimiento = models.DateField(null=True, blank=True)

  genero = models.CharField(max_length=250)
  estado_civil = models.CharField(max_length=250)

  escolaridad = models.CharField(max_length=250)
  familia_en_el_norte = models.CharField(max_length=250)

  religion = models.CharField(max_length=250)
  no_deportados = models.CharField(max_length=250)

  causa_migracion = models.CharField(max_length=250)
  planes = models.CharField(max_length=250)

  pais_violacion = models.CharField(max_length=250)
  ciudad_pueblo = models.CharField(max_length=250, null=True, blank=True)

  departamento = models.CharField(max_length=250)
  pais = models.CharField(max_length=250)

  ocupacion = models.CharField(max_length=250)
