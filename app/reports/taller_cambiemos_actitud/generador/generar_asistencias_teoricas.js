import * as date_converter from "../../date_converter";
var array = require("../contenido/contenido_asistencias_teoricas.json");

export function generar(teoria, dias_teoria) {
  for (var i = 0; i < dias_teoria; i++) {
    array[i].fecha = date_converter.convertDate(new Date(teoria[0].fecha));
  }
  return array;
}
