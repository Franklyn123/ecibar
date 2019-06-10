import * as date_converter from '../../date_converter';
const array = require('../contenido/contenido_manejo.json');

export function generar(manejo, instructor) {
  for (const i in array) {
    (array[i].fecha = date_converter.convertDate(new Date(manejo[i].fecha))),
    (array[i].Kinicio = manejo[i].km_inicio),
    (array[i].Ktermino = manejo[i].km_fin),
    (array[i].instructor = instructor);
  }
  return array;
}

export function generar_manejo_pag_1(fechas_manejo, instructor) {
  const manejo = [];
  for (let i = 0; i < 4; i++) {
    manejo.push({
      nro: array[i].nro,
      Hinicio: array[i].Hinicio,
      Hfinal: array[i].Hfinal,
      clases: array[i].clases,
      circuito: array[i].circuito,
      fecha: date_converter.convertDate(new Date(fechas_manejo[i].fecha)),
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
      Hinicio: array[i].Hinicio,
      Hfinal: array[i].Hfinal,
      clases: array[i].clases,
      circuito: array[i].circuito,
      fecha: date_converter.convertDate(new Date(fechas_manejo[i].fecha)),
      Kinicio: fechas_manejo[i].km_inicio,
      Ktermino: fechas_manejo[i].km_fin,
      instructor
    });
  }
  return manejo;
}
