import * as date_converter from '../../date_converter';
const array = require('../contenido/contenido_manejo.json');

export function generar_manejo_pag_1(fechas_manejo, instructor) {
  const manejo = [];
  for (let i = 0; i < 4; i++) {
    manejo.push({
      nro: array[i].nro,
      Hinicio: date_converter.extractHourFromDate(
        new Date(fechas_manejo[i].fecha_inicio)
      ),
      Hfinal: date_converter.extractHourFromDate(
        new Date(fechas_manejo[i].fecha_fin)
      ),
      clases: array[i].clases,
      circuito: array[i].circuito,
      fecha: date_converter.convertDate(
        new Date(fechas_manejo[i].fecha_inicio)
      ),
      Kinicio: fechas_manejo[i].km_inicio,
      Ktermino: fechas_manejo[i].km_fin,
      instructor
    });
  }
  return manejo;
}

export function generar_manejo_pag_2(fechas_manejo, instructor) {
  const manejo = [];
  for (let i = 4; i < 7; i++) {
    manejo.push({
      nro: array[i].nro,
      Hinicio: date_converter.extractHourFromDate(
        new Date(fechas_manejo[i].fecha_inicio)
      ),
      Hfinal: date_converter.extractHourFromDate(
        new Date(fechas_manejo[i].fecha_fin)
      ),
      clases: array[i].clases,
      circuito: array[i].circuito,
      fecha: date_converter.convertDate(
        new Date(fechas_manejo[i].fecha_inicio)
      ),
      Kinicio: fechas_manejo[i].km_inicio,
      Ktermino: fechas_manejo[i].km_fin,
      instructor
    });
  }
  return manejo;
}
