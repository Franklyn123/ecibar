import * as date_converter from '../../date_converter';
const array = require('../contenido/contenido_examenes.json');

export function generar(teoria) {
  array[0].fecha = date_converter.convertDate(new Date(teoria[1].fecha));
  return array;
}
