import * as date_converter from "../../date_converter";
var array_teoria = require("../contenido/contenido_asistencias_teoricas.json");
var array_manejo = require("../contenido/contenido_manejo.json");

export function generar_teoria_pag_1(fechas_teoria) {
  var teoria = [];
  for (var i = 0; i < 4; i++) {
    teoria.push({
      nro: array_teoria[i].nro,
      nombreCurso: array_teoria[i].nombreCurso,
      horas: array_teoria[i].horas,
      fecha: date_converter.convertDate(new Date(fechas_teoria[i].fecha))
    });
  }

  return teoria;
}

export function generar_teoria_pag_2(fechas_teoria) {
  var teoria = [];
  for (var i = 4; i < 7; i++) {
    teoria.push({
      nro: array_teoria[i].nro,
      nombreCurso: array_teoria[i].nombreCurso,
      horas: array_teoria[i].horas,
      fecha: date_converter.convertDate(new Date(fechas_teoria[i].fecha))
    });
  }
  return teoria;
}

export function generar_manejo_pag_1(fechas_manejo) {
  var manejo = [];
  for (var i = 0; i < 4; i++) {
    manejo.push({
      clases: array_manejo[i].clases,
      circuito: array_manejo[i].circuito,
      nhoras: array_manejo[i].nhoras,
      fecha: date_converter.convertDate(new Date(fechas_manejo[i].fecha))
    });
  }
  return manejo;
}

export function generar_manejo_pag_2(fechas_manejo) {
  var manejo = [];
  for (var i = 4; i < 5; i++) {
    manejo.push({
      clases: array_manejo[i].clases,
      circuito: array_manejo[i].circuito,
      nhoras: array_manejo[i].nhoras,
      fecha: date_converter.convertDate(new Date(fechas_manejo[i].fecha))
    });
  }
  return manejo;
}
