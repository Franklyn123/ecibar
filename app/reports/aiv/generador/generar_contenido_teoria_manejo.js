import * as date_converter from '../../date_converter';
const array_teoria = require('../contenido/contenido_asistencias_teoricas.json');
const array_manejo = require('../contenido/contenido_manejo.json');

export function generar_teoria(fechas_teoria) {
  const teoria = [];
  for (const i in array_teoria) {
    teoria.push({
      nro: array_teoria[i].nro,
      nombreCurso: array_teoria[i].nombreCurso,
      horas: array_teoria[i].horas,
      fecha: date_converter.convertDate(new Date(fechas_teoria[i].fecha))
    });
  }

  return teoria;
}

export function generar_manejo(fechas_manejo) {
  const manejo = [];
  for (const i in array_manejo) {
    manejo.push({
      clases: array_manejo[i].clases,
      circuito: array_manejo[i].circuito,
      nhoras: array_manejo[i].nhoras,
      fecha: date_converter.convertDate(new Date(fechas_manejo[i].fecha))
    });
  }
  return manejo;
}
