# Rest framework
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import date
from api.models import Migrante
import pandas as pd
from rest_framework.permissions import AllowAny, IsAuthenticated


MESES = [1,2,3,4,5,6,7,8,9,10,11,12]


class EstadisticasViewSet(viewsets.ViewSet):
  permission_classes = [AllowAny]

  @action(methods=['get'], detail=False)
  def informacion(self, request, *args , **kwargs):
    
    data_genero = self.genero()
    data_estado_civil = self.estado_civil()
    data_escolaridad = self.escolaridad()
    data_pais_origen = self.pais()

    data = {

        "genero": data_genero,
        "pais_origen": data_pais_origen,
        "estado_civil": data_estado_civil,
        "escolaridad": data_escolaridad,
    }
    return Response(data, status=status.HTTP_200_OK)

      
  def genero(self):
    anio= self.request.query_params.get('anio', date.today().year)

    query = Migrante.objects.filter(created__year=anio).values('id', 'genero','created')

    hombres = { "label":"Hombres" ,"backgroundColor" : "rgb(75, 192, 192)", 'data': map(lambda x:0, MESES)}
    mujeres = { "label":"Mujeres" ,"backgroundColor" : "rgb(53, 162, 250)", 'data': map(lambda x:0, MESES)}
    lgbti = { "label":"LGBTI" ,"backgroundColor" : "rgb(155, 99, 132)", 'data': map(lambda x:0, MESES)}

    tabla = pd.DataFrame(query)

    if tabla.shape[0] > 1:
      tabla['conteo'] = 1
      tabla['mes'] = pd.to_datetime(tabla['created']).dt.month
      tabla.sort_values(by="mes", inplace=True)
      tabla_hombres = tabla.query("genero=='Hombre'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_mujer = tabla.query("genero=='Mujer'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_lgbti = tabla.query("genero=='LGBTI'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})


      hombres['data'] = self.__obtener_dato_mes(tabla_hombres.to_dict("records"))
      mujeres['data'] = self.__obtener_dato_mes(tabla_mujer.to_dict("records"))
      lgbti['data'] = self.__obtener_dato_mes(tabla_lgbti.to_dict("records"))

    data_genero =[hombres, mujeres, lgbti]
    return data_genero
      
  def estado_civil(self):
    anio= self.request.query_params.get('anio', date.today().year)

    query = Migrante.objects.filter(created__year=anio).values('id', 'estado_civil','created')
    
    soltero = { "label":"Soltero" ,"backgroundColor" : "rgb(75, 192, 192)",'data': map(lambda x:0, MESES)}
    casado = { "label":"Casado" ,"backgroundColor" : "rgb(53, 162, 250)",'data': map(lambda x:0, MESES)}
    union_libre = { "label":"Union Libre" ,"backgroundColor" : "rgb(155, 99, 132)",'data': map(lambda x:0, MESES)}
    d_s_v = { "label":"D/S/V" ,"backgroundColor" : "rgb(100, 102, 100)",'data': map(lambda x:0, MESES)}

    tabla = pd.DataFrame(query)
    if tabla.shape[0] > 1:
      tabla['conteo'] = 1
      tabla['mes'] = pd.to_datetime(tabla['created']).dt.month
      tabla.sort_values(by="mes", inplace=True)

      tabla_soltero = tabla.query("estado_civil=='Soltero'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_casado = tabla.query("estado_civil=='Casado'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_union_libre = tabla.query("estado_civil=='Union Libre'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_d_s_v = tabla.query("estado_civil=='D/S/V'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})

      soltero['data'] = self.__obtener_dato_mes(tabla_soltero.to_dict("records"))
      casado['data'] = self.__obtener_dato_mes(tabla_casado.to_dict("records"))
      union_libre['data'] = self.__obtener_dato_mes(tabla_union_libre.to_dict("records"))
      d_s_v['data'] = self.__obtener_dato_mes(tabla_d_s_v.to_dict("records"))

    data_estado_civil =[soltero, casado, union_libre, d_s_v]
    return data_estado_civil


  def escolaridad(self):
    anio= self.request.query_params.get('anio', date.today().year)

    query = Migrante.objects.filter(created__year=anio).values('id', 'escolaridad','created')

    primaria = { "label":"Primaria" ,"backgroundColor" : "rgb(75, 192, 192)",'data': map(lambda x:0, MESES)}
    secundaria = { "label":"Secundaria" ,"backgroundColor" : "rgb(53, 162, 250)",'data': map(lambda x:0, MESES)}
    superior = { "label":"Superior" ,"backgroundColor" : "rgb(155, 99, 132)",'data': map(lambda x:0, MESES)}
    analfabeta = { "label":"Analfabeta" ,"backgroundColor" : "rgb(100, 102, 100)",'data': map(lambda x:0, MESES)}

    tabla = pd.DataFrame(query)
    if tabla.shape[0] > 1:	
      tabla['conteo'] = 1
      tabla['mes'] = pd.to_datetime(tabla['created']).dt.month
      tabla.sort_values(by="mes", inplace=True)

      tabla_primaria = tabla.query("escolaridad=='Primaria'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_secundaria = tabla.query("escolaridad=='Secundaria'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_superior = tabla.query("escolaridad=='Superior'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
      tabla_analfabeta = tabla.query("escolaridad=='Analfabeta'").groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})

      primaria['data'] = self.__obtener_dato_mes(tabla_primaria.to_dict("records"))
      secundaria['data'] = self.__obtener_dato_mes(tabla_secundaria.to_dict("records"))
      superior['data'] = self.__obtener_dato_mes(tabla_superior.to_dict("records"))
      analfabeta['data'] = self.__obtener_dato_mes(tabla_analfabeta.to_dict("records"))

    data_escolaridad =[primaria, secundaria, superior, analfabeta]
    return data_escolaridad

  def pais(self):
    anio = self.request.query_params.get('anio', date.today().year)

    query = Migrante.objects.filter(created__year=anio).values('id', 'pais','created')

    guatemala = { "label":"Guatemala" ,"backgroundColor" : "rgb(75, 192, 192)",'data': map(lambda x:0, MESES)}
    honduras = { "label":"Honduras" ,"backgroundColor" : "rgb(155, 99, 132)",'data': map(lambda x:0, MESES)}
    el_salvador = { "label":"El Salvador" ,"backgroundColor" : "rgb(100, 102, 100)",'data': map(lambda x:0, MESES)}

    DEFAULT = [ guatemala, honduras, el_salvador]

    backgroundColors = [ "rgb(75, 192, 192)", "rgb(53, 162, 250)", "rgb(155, 99, 132)", "rgb(100, 102, 100)"]    
    DATOS_POR_PAISES = []

    tabla = pd.DataFrame(query)
    if tabla.shape[0] > 1:	
      tabla['conteo'] = 1
      tabla['mes'] = pd.to_datetime(tabla['created']).dt.month

      color = 0
      for pais in tabla['pais'].sort_values().unique():
        datos_pais = {}
        tabla_pais = tabla.query("pais=='%s'" % pais).groupby(by=['mes'], as_index=False).agg({"conteo":"sum"})
        tabla_pais.sort_values(by="mes", inplace=True)
        datos_pais['data'] = self.__obtener_dato_mes(tabla_pais.to_dict("records"))
        datos_pais['label'] = pais
        datos_pais['backgroundColor'] = backgroundColors[color]
        color += 1
        if color == 4:
          color = 0
        DATOS_POR_PAISES.append(datos_pais) 
      return DATOS_POR_PAISES
    return DEFAULT

  def __obtener_dato_mes(self, lista_datos):
    datos_meses = []
    for mes in MESES:
      dato_mes = 0
      for dato in lista_datos:
        if dato['mes'] == mes:
          dato_mes = dato['conteo']
        
      datos_meses.append(dato_mes)
    return datos_meses
