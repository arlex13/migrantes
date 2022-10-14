# Django
from datetime import date
from django.db import models

# Models
from api.models import BaseModel

class Migrante(BaseModel):

  nombres = models.CharField(max_length=250)
  apellidos = models.CharField(max_length=250)

  no_identificacion = models.CharField(max_length=20)
  fecha_nacimiento = models.DateField()

  genero = models.CharField(max_length=10)
  estado_civil = models.CharField(max_length=15)

  escolaridad = models.CharField(max_length=15)
  familia_en_el_norte = models.CharField(max_length=15)

  religion = models.CharField(max_length=10)
  no_deportados = models.CharField(max_length=5)

  causa_migracion = models.CharField(max_length=15)
  planes = models.CharField(max_length=10)

  pais_violacion = models.CharField(max_length=15)
  ciudad_pueblo = models.CharField(max_length=250)

  departamento = models.CharField(max_length=250)
  pais = models.CharField(max_length=250)

  ocupacion = models.CharField(max_length=250)
  edad = models.CharField(max_length=3, default='12')

  def calcular_edad(self):
    hoy = date.today()
    return hoy.year - self.fecha_nacimiento.year - ((hoy.month, hoy.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day))
