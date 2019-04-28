import * as imageen from "../image_converter";
import * as date_converter from "../date_converter";
import * as generador from "./generador/generar_contenido_evaluacion_manejo";

const img = new Image();
const img2 = new Image();

export function aiii_c_EPM(datos) {
  // Genera arreglo de objetos JSON de dias de manejo
  var manejo = [];
  for (var i = 0; i < datos.clases_manejo.length; i++) {
    manejo.push({
      fecha: datos.clases_manejo[i]._root.entries[0][1],
      km_inicio: datos.clases_manejo[i]._root.entries[1][1],
      km_fin: datos.clases_manejo[i]._root.entries[2][1]
    });
  }

  var rows = [];
  var rows1 = [];
  var rows3 = [];
  var parametros = generador.generar_parametros();
  var datos1 = [];
  var datos2 = generador.generar_evaluacion();

  var doc = new jsPDF("p", "pt");

  img.src = "/images/ecibar/ecibar.png";
  img2.src = "/images/ecibar/mtc.png";

  imageen.imgToBase64(img.src, function(imagen) {
    doc.addImage(imagen, "JPEG", 440, 40, 107, 23);

    imageen.imgToBase64(img2.src, function(imagen) {
      doc.addImage(imagen, "JPEG", 40, 40, 107, 23);

      doc.setFont("helvetica");
      doc.setFontType("bold");

      // EPM
      doc.setFontSize(20);
      doc.text(95, 100, "EVALUACIÓN DE PRACTICA DE MANEJO");

      doc.setFontSize(8);

      doc.setFillColor(41, 128, 186);

      var colnom = [{ title: "APELLIDOS Y NOMBRES", dataKey: "nombre" }];
      var coldoc = [{ title: "INSTRUCTOR", dataKey: "inst" }];
      var colfechai = [{ title: "FECHA", dataKey: "fechainicio" }];
      var colCT = [
        { title: "CLASE Y CATEGORIA DE LICENCIA QUE POSEE", dataKey: "cp" }
      ];
      var colCP = [
        { title: "CLASE Y CATEGORIA DE LICENCIA A LA POSTULA", dataKey: "cp" }
      ];
      var colPE = [
        {
          title: "PRECISAR: OBTENCIÓN, REVALIDACIÓN, RECATEGORIZACIÓN",
          dataKey: "cp"
        }
      ];

      // Nombres y apelllidos
      doc.autoTable(colnom, rows, {
        margin: { horizontal: 40, top: 120 },
        columnStyles: {
          nombre: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      });
      doc.text(
        185,
        133,
        datos.alumno.a_paterno +
          " " +
          datos.alumno.a_materno +
          " " +
          datos.alumno.nombres
      );
      var finalY0 = doc.autoTable.previous.finalY;

      // Instructor
      doc.autoTable(coldoc, rows, {
        margin: { horizontal: 40, top: finalY0 + 3 },
        columnStyles: {
          inst: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      });
      doc.text(185, finalY0 + 16, datos.instructor);
      var finalY1 = doc.autoTable.previous.finalY;

      // Fecha de inicio
      doc.autoTable(colfechai, rows, {
        margin: { horizontal: 40, top: finalY1 + 3 },
        columnStyles: {
          fechainicio: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      });
      doc.text(
        185,
        finalY1 + 16,
        date_converter.convertDate(new Date(manejo[4].fecha))
      );
      var finalY2 = doc.autoTable.previous.finalY;

      // Clase de vehiculo
      doc.autoTable([{ title: "A. CLASE VEHICULO", dataKey: "clase" }], rows, {
        margin: { horizontal: 40, top: finalY2 + 3 },
        columnStyles: {
          clase: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      });
      doc.text(185, finalY2 + 16, datos.clase_vehiculo);
      var finalY3 = doc.autoTable.previous.finalY;

      // Placa de vehiculo
      doc.autoTable([{ title: "PLACA", dataKey: "clase" }], rows, {
        margin: { horizontal: 330, top: finalY2 + 3 },
        columnStyles: {
          clase: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      });
      doc.text(476, finalY2 + 16, datos.vehiculo);
      var finalY4 = doc.autoTable.previous.finalY;

      // Hora de comienzo
      doc.autoTable(
        [{ title: "B. HORA DE COMIENZO", dataKey: "clase" }],
        rows,
        {
          margin: { horizontal: 40, top: finalY4 + 3 },
          columnStyles: {
            clase: { columnWidth: 135 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap"
          }
        }
      );
      doc.text(185, finalY4 + 16, "3:00");
      var finalY5 = doc.autoTable.previous.finalY;

      // Hora de fin
      doc.autoTable([{ title: "HORA DE TERMINO", dataKey: "clase" }], rows, {
        margin: { horizontal: 330, top: finalY4 + 3 },
        columnStyles: {
          clase: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      });
      doc.text(476, finalY4 + 16, "5:00");

      // Via de circulacion
      var finalY02 = doc.autoTable.previous.finalY;
      doc.autoTable(
        [{ title: "C. VIA DE CIRCULACION", dataKey: "clase" }],
        rows,
        {
          margin: { horizontal: 40, top: finalY5 + 3 },
          columnStyles: {
            clase: { columnWidth: 135 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap"
          }
        }
      );
      doc.setFontSize(8);
      doc.text(
        185,
        finalY5 + 16,
        "Av. Sepulveda s/n Helipuerto Salaverry, Cuartel salaverry. Miraflores Arequipa"
      );
      var finalY6 = doc.autoTable.previous.finalY;

      // Kilometraje de comienzo
      doc.autoTable(
        [{ title: "D. KILOMETRAJE DE COMIENZO", dataKey: "clase" }],
        rows,
        {
          margin: { horizontal: 40, top: finalY6 + 3 },
          columnStyles: {
            clase: { columnWidth: 140 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap"
          }
        }
      );
      doc.text(190, finalY6 + 16, datos.km_inicio);

      // Kilometraje de termino
      doc.autoTable(
        [{ title: "KILOMETRAJE DE TERMINO", dataKey: "clase" }],
        rows,
        {
          margin: { horizontal: 330, top: finalY6 + 3 },
          columnStyles: {
            clase: { columnWidth: 135 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap"
          }
        }
      );
      doc.text(475, finalY6 + 16, datos.km_fin);
      var finalY7 = doc.autoTable.previous.finalY;

      doc.autoTable(
        [{ title: "PARAMETROS DE EVALUACION", dataKey: "clase" }],
        rows,
        {
          margin: { horizontal: 40, top: finalY7 + 8 },
          columnStyles: {
            clase: { columnWidth: 339 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap",
            halign: "center"
          }
        }
      );
      doc.autoTable([{ title: "PUNTAJE", dataKey: "clase" }], rows, {
        margin: { horizontal: 380, top: finalY7 + 8 },
        columnStyles: {
          clase: { columnWidth: 180 }
        },
        styles: {
          fontSize: 8,
          halign: "center"
        }
      });

      var finalY8 = doc.autoTable.previous.finalY;

      doc.setFontSize(10);

      var col = [
        { title: "No", dataKey: "nro" },
        { title: "PARAMETRO", dataKey: "param" },
        { title: "1 PTS", dataKey: "op1" },
        { title: "1/2 PTS", dataKey: "op2" },
        { title: "0 PTS", dataKey: "op3" }
      ];

      for (var key in parametros) {
        var temp = parametros[key];
        rows.push(temp);
      }
      doc.autoTable(col, rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY8 + 1 },
        styles: {
          fontSize: 7,
          columnWidth: "wrap"
        },
        columnStyles: {
          nro: { columnWidth: 31 },
          param: { columnWidth: 310 },
          op1: { columnWidth: 60 },
          op2: { columnWidth: 60 },
          op3: { columnWidth: 60 }
        }
      });

      var finalY9 = doc.autoTable.previous.finalY;

      for (var key in datos1) {
        var temp = datos1[key];
        rows1.push(temp);
      }
      doc.autoTable(
        [
          {
            title: "NOTA: OBSERVACION DEL ALUMNO CON RELACION",
            dataKey: "clase"
          }
        ],
        rows1,
        {
          margin: { horizontal: 40, top: finalY9 + 5 },
          columnStyles: {
            clase: { columnWidth: 220 }
          },
          styles: {
            fontSize: 6,
            columnWidth: "wrap",
            halign: "center"
          }
        }
      );
      doc.autoTable([{ title: "AL APRENDIZAJE", dataKey: "clase" }], rows1, {
        margin: { horizontal: 40, top: finalY9 + 3 },
        columnStyles: {
          clase: { columnWidth: 220 }
        },
        styles: {
          fontSize: 6,
          columnWidth: "wrap",
          halign: "center"
        }
      });
      var finalY10 = doc.autoTable.previous.finalY;
      doc.autoTable([{ title: "OBSERVACIÓN", dataKey: "clase" }], rows1, {
        margin: { horizontal: 40, top: finalY10 + 3 },
        columnStyles: {
          clase: { columnWidth: 109 }
        },
        styles: {
          fontSize: 6,
          columnWidth: "wrap",
          halign: "center"
        }
      });
      doc.autoTable([{ title: "SI", dataKey: "clase" }], rows1, {
        margin: { horizontal: 150, top: finalY10 + 3 },
        columnStyles: {
          clase: { columnWidth: 30 }
        },
        styles: {
          fontSize: 6,
          columnWidth: "wrap",
          halign: "center"
        }
      });
      doc.autoTable([{ title: "NO", dataKey: "clase" }], rows1, {
        margin: { horizontal: 200, top: finalY10 + 3 },
        columnStyles: {
          clase: { columnWidth: 30 }
        },
        styles: {
          fontSize: 6,
          columnWidth: "wrap",
          halign: "center"
        }
      });

      var col1 = [
        { title: "EVALUACION", dataKey: "evaluacion" },
        { title: "TIPO EXAMEN", dataKey: "tipoexamen" },
        { title: "RESULTADO", dataKey: "resultado" }
      ];
      for (var key in datos2) {
        var temp = datos2[key];
        rows3.push(temp);
      }
      doc.autoTable(col1, rows3, {
        tableWidth: "wrap",
        margin: { horizontal: 300, top: finalY9 + 5 },
        styles: {
          fontSize: 6,
          columnWidth: "wrap",
          overflow: "linebreak"
        },
        columnStyles: {
          evaluacion: { columnWidth: 80 },
          tipoexamen: { columnWidth: 100 },
          resultado: { columnWidth: 70 }
        }
      });

      var finalY = doc.autoTable.previous.finalY;

      doc.setFontSize(8);
      doc.text(50, 790, "__________________________________");
      doc.text(50, 801, "     FIRMA DEL ALUMNO(HUELLA)");
      doc.text(420, 790, "_________________________");
      doc.text(420, 801, "     FIRMA DEL DIRECTOR");
      doc.save(datos.expediente + "_EPM.pdf");
    });
  });
}
