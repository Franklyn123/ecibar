import * as imageen from "./image_converter";
import * as date_converter from "./date_converter";
const XlsxPopulate = require("xlsx-populate");

export function ficha_inscripcion(inputFormat) {
  //var file = document.getElementById("/Ficha_inscripcion.xlsx").files[0];

  // A File object is a special kind of blob.
  XlsxPopulate.fromDataAsync("/Ficha_inscripcion.xlsx").then(function(
    workbook
  ) {
    console.log("hey there");
  });
}
