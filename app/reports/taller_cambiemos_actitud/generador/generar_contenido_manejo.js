var array = require("../contenido/contenido_manejo.json");
import * as date_converter from "../../date_converter";

export function generar(manejo, instructor) {
  for (var i in array) {
    (array[i].fecha = date_converter.convertDate(new Date(manejo[i].fecha))),
      (array[i].Kinicio = manejo[i].km_inicio),
      (array[i].Ktermino = manejo[i].km_fin),
      (array[i].instructor = instructor);
  }
  return array;
}
