import * as fechaa from "../../date_converter";
var parametros = require("../contenido/contenido_evaluacion_manejo.json");

export function generar_parametros() {
  return parametros;
}

export function generar_evaluacion() {
  var array = [
    {
      evaluacion: "A:MB",
      tipoexamen: "HABILIDAD PARA CONDUCIR",
      resultado: ""
    },
    {
      evaluacion: "B:B",
      tipoexamen: "HABILIDAD PARA ESTACIONAR",
      resultado: ""
    },
    {
      evaluacion: "C:R",
      tipoexamen: "APLICACION DE REGLAMENTO",
      resultado: ""
    }
  ];

  return array;
}
