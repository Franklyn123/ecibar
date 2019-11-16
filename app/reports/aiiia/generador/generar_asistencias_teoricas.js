import * as date_converter from "../../date_converter";
var array = require("../contenido/contenido_asistencias_teoricas.json");

export function generar(teoria) {
  for (var i in array) {
    array[i].fecha = date_converter.convertDate(new Date(teoria[i].fecha));
  }
  return array;
}
