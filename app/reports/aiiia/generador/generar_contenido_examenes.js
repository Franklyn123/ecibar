import * as date_converter from "../../date_converter";
var array = require("../contenido/contenido_examenes.json");

export function generar(teoria) {
  array[0].fecha = date_converter.convertDate(new Date(teoria[1].fecha));
  array[1].fecha = date_converter.convertDate(new Date(teoria[2].fecha));
  array[2].fecha = date_converter.convertDate(new Date(teoria[3].fecha));
  return array;
}
