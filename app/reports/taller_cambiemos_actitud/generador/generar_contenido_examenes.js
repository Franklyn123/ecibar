import * as date_converter from "../../date_converter";
var array = require("../contenido/contenido_examenes.json");

export function generar(teoria) {
  array[0].fecha = date_converter.convertDate(new Date(teoria[0].fecha));
  return array;
}
