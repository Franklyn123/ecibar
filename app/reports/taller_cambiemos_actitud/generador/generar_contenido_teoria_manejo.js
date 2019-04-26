import * as date_converter from "../../date_converter";
var array_teoria = require("../contenido/contenido_asistencias_teoricas.json");

export function generar_teoria(fechas_teoria) {
  var teoria = [];
  for (var i = 0; i < 7; i++) {
    teoria.push({
      nro: array_teoria[i].nro,
      nombreCurso: array_teoria[i].nombreCurso,
      minutos: array_teoria[i].minutos,
      fecha: date_converter.convertDate(new Date(fechas_teoria[0].fecha))
    });
  }

  return teoria;
}
