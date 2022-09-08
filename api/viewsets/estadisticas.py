# Rest framework
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import date
from api.models import Migrante
import pandas as pd


MESES = [1,2,3,4,5,6,7,8,9,10,11,12]


class EstadisticasViewSet(viewsets.ViewSet):

  @action(methods=['get'], detail=True)
  def genero(self, request, *args , **kwargs):
      anio= self.request.query_params.get('anio', date.today().year)

      query = Migrante.objects.filter(created__year=anio).values('id', 'genero','created')

      tabla = pd.DataFrame(query)
      tabla['conteo'] = 1
      tabla['mes'] = pd.to_datetime(tabla['created']).month
      tabla.sort_values(by="mes", inplace=True)
      tabla_hombres = tabla.query("genero=='Hombre'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_mujer = tabla.query("genero=='Mujer'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_lgbti = tabla.query("genero=='LGBTI'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})

      hombres = { "label":"Hombres" ,"backgroundColor" : "rgb(75, 192, 192)"}
      mujeres = { "label":"Mujeres" ,"backgroundColor" : "rgb(53, 162, 250)"}
      lgbti = { "label":"LGBTI" ,"backgroundColor" : "rgb(100, 162, 250)"}

      hombres['data'] = self.__obtener_dato_mes(tabla_hombres.to_dict("records"))
      mujeres['data'] = self.__obtener_dato_mes(tabla_mujer.to_dict("records"))
      lgbti['data'] = self.__obtener_dato_mes(tabla_lgbti.to_dict("records"))


      return Response(data=[hombres, mujeres, lgbti], status=status.HTTP_200_OK)
      
      
  def __obtener_dato_mes(self, lista_datos):
    datos_meses = []
    for mes in MESES:
      dato_mes = 0
      for dato in lista_datos:
        if dato['mes'] == mes:
          dato_mes = dato['conteo']
        
      datos_meses.append(dato_mes)
    return datos_meses
