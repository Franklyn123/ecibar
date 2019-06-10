import * as date_converter from '../../date_converter';
const array = require('../contenido/contenido_examenes.json');

export function generar(teoria) {
  array[0].fecha = date_converter.convertDate(new Date(teoria[3].fecha));
  array[1].fecha = date_converter.convertDate(new Date(teoria[4].fecha));
  array[2].fecha = date_converter.convertDate(new Date(teoria[5].fecha));
  array[3].fecha = date_converter.convertDate(new Date(teoria[6].fecha));
  return array;
}
