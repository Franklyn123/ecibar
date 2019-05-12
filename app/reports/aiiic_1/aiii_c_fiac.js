import * as imageen from "../image_converter";
import * as date_converter from "../date_converter";
import * as generador from "./generador/generar_contenido_teoria_manejo";

const img = new Image();
const img2 = new Image();
const img3 = new Image();
const img4 = new Image();

export function aiii_c_FIAC(datos) {
  // Genera arreglo de objetos JSON de dias de teoria
  var teoria = [];
  for (var i = 0; i < datos.clases_teoricas.size; i++) {
    teoria.push({
      fecha: datos.clases_teoricas._tail.array[i]._root.entries[0][1]
    });
  }

  // Genera arreglo de objetos JSON de dias de manejo
  var manejo = [];
  for (var i = 0; i < datos.clases_manejo.size; i++) {
    manejo.push({
      fecha: datos.clases_manejo._tail.array[i]._root.entries[0][1],
      km_inicio: datos.clases_manejo._tail.array[i]._root.entries[1][1],
      km_fin: datos.clases_manejo._tail.array[i]._root.entries[2][1]
    });
  }

  var rows = [];
  var rows1 = [];
  var filas_teoria_pag_1 = generador.generar_teoria_pag_1(teoria);
  var filas_teoria_pag_2 = generador.generar_teoria_pag_2(teoria);

  var filas_manejo_pag_1 = generador.generar_manejo_pag_1(manejo);
  var filas_manejo_pag_2 = generador.generar_manejo_pag_2(manejo);

  var doc = new jsPDF("l", "pt");

  img.src = "/images/ecibar/ecibar.png";
  img2.src = "/images/ecibar/mtc.png";
  img3.src = "/images/ecibar/ecibar.png";
  img4.src = "/images/ecibar/mtc.png";

  imageen.imgToBase64(img.src, function(imagen0) {
    doc.addImage(imagen0, "JPEG", 40, 40, 107, 23);

    imageen.imgToBase64(img2.src, function(imagen1) {
      doc.addImage(imagen1, "JPEG", 660, 40, 115, 29);

      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(16);

      doc.text(235, 60, "FICHA INDIVIDUAL DEL ALUMNO CAPACITADO");

      doc.setFontSize(8);
      doc.setFillColor(41, 128, 186);

      var colnom = [{ title: "APELLIDOS Y NOMBRES ", dataKey: "nombre" }];
      var coldoc = [
        {
          title: "DNI/CE No.                                     ",
          dataKey: "dni"
        }
      ];
      var colfechai = [{ title: "FECHA DE INICIO ", dataKey: "fechainicio" }];
      var colfechaf = [{ title: "FECHA DE TERMINO", dataKey: "fechafin" }];
      var colCT = [
        { title: "CLASE Y CATEGORIA DE LICENCIA QUE POSEE", dataKey: "cp" }
      ];
      var colCP = [
        { title: "CLASE Y CATEGORIA DE LICENCIA A LA POSTULA", dataKey: "cp" }
      ];

      var colPE = [
        {
          title: "TIPO DE CURSO",
          dataKey: "cp"
        }
      ];

      // Nombres y apellidos
      doc.autoTable(colnom, rows, {
        margin: { horizontal: 40, top: 70 },
        columnStyles: {
          nombre: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(
        185,
        83,
        datos.alumno.a_paterno +
          " " +
          datos.alumno.a_materno +
          " " +
          datos.alumno.nombres
      );
      var finalY0 = doc.autoTable.previous.finalY;

      // DNI
      doc.autoTable(coldoc, rows, {
        margin: { horizontal: 40, top: finalY0 + 3 },
        columnStyles: {
          n_dni: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(185, finalY0 + 16, datos.alumno.dni);
      var finalY1 = doc.autoTable.previous.finalY;

      // Fecha de inicio
      doc.autoTable(colfechai, rows, {
        margin: { horizontal: 40, top: finalY1 + 3 },
        columnStyles: {
          fechainicio: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(
        185,
        finalY1 + 16,
        date_converter.convertDate(new Date(teoria[0].fecha))
      );
      var finalYY2 = doc.autoTable.previous.finalY;

      // Fecha fin
      doc.autoTable(colfechaf, rows, {
        margin: { horizontal: 40, top: finalYY2 + 3 },
        columnStyles: {
          fechafin: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(
        185,
        finalYY2 + 16,
        date_converter.convertDate(new Date(manejo[3].fecha))
      );
      var finalY3 = doc.autoTable.previous.finalY;

      // N expediente
      doc.autoTable(
        [{ title: "NRO DE EXPEDIENTE", dataKey: "expediente" }],
        rows,
        {
          margin: { horizontal: 400, top: 70 },
          columnStyles: {
            cp: { columnWidth: 205 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap",
            overflow: "linebreak"
          }
        }
      );
      doc.text(505, 83, datos.expediente);

      // ENCABEZADO DEL SEGUNDO SECTOR
      // Licencia que posee
      doc.autoTable(colCT, rows, {
        margin: { horizontal: 400, top: finalY0 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalY0 + 16, datos.licencia_actual);

      // Licencia a la que postula
      doc.autoTable(colCP, rows, {
        margin: { horizontal: 400, top: finalY1 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalY1 + 16, datos.licencia_postula);

      // Curso
      doc.autoTable(colPE, rows, {
        margin: { horizontal: 400, top: finalYY2 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalYY2 + 16, datos.curso);

      doc.autoTable(
        [{ title: "RESUMEN DE LAS CLASES TEÓRICAS", dataKey: "ti" }],
        rows,
        {
          tableWidth: "wrap",
          margin: { horizontal: 40, top: finalY3 + 8 },
          styles: {
            fontSize: 8,
            columnWidth: "wrap",
            halign: "center"
          },
          columnStyles: {
            ti: { columnWidth: 740 }
          }
        }
      );

      var finalY4 = doc.autoTable.previous.finalY;

      doc.autoTable([{ title: "CLASES TEÓRICAS", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY4 + 1 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          halign: "center"
        },
        columnStyles: {
          ti: { columnWidth: 309 }
        }
      });
      doc.autoTable([{ title: "PRÁCTICAS DE MANEJO", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 350, top: finalY4 + 1 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          halign: "center"
        },
        columnStyles: {
          ti: { columnWidth: 430 }
        }
      });

      var col = [
        { title: "No", dataKey: "nro" },
        { title: "NOMBRE DEL CURSO", dataKey: "nombreCurso" },
        { title: "HORAS", dataKey: "horas" },
        { title: "FECHA CAPACITACION", dataKey: "fecha" }
      ];
      for (var key in filas_teoria_pag_1) {
        var temp = filas_teoria_pag_1[key];
        rows.push(temp);
      }

      var finalY5 = doc.autoTable.previous.finalY;

      doc.autoTable(col, rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY5 + 1 },
        styles: {
          fontSize: 6.5,
          columnWidth: "wrap",
          halign: "left",
          overflow: "linebreak"
        },
        columnStyles: {
          nro: { columnWidth: 20 },
          nombreCurso: { columnWidth: 159 },
          horas: { columnWidth: 60 },
          fecha: { columnWidth: 70 }
        }
      });

      doc.setFontSize(8);
      var finalY2 = doc.autoTable.previous.finalY;
      doc.text(95, finalY2 + 10, "TOTAL DE HORAS IMPARTIDAS: ");
      doc.text(245, finalY2 + 10, "32");
      var col = [
        { title: "CLASES DE CIRCULACION", dataKey: "clases" },
        { title: "CIRCUITO/ VIAS CUANDO SE LLEVE A CABO", dataKey: "circuito" },
        { title: "HORAS", dataKey: "nhoras" },
        { title: "FECHA CAPACITACION", dataKey: "fecha" }
      ];
      for (var key in filas_manejo_pag_1) {
        var temp = filas_manejo_pag_1[key];
        rows1.push(temp);
      }
      doc.autoTable(col, rows1, {
        tableWidth: "wrap",
        margin: { horizontal: 350, top: finalY5 + 1 },
        styles: {
          fontSize: 6.5,
          columnWidth: "wrap",
          halign: "center",
          overflow: "linebreak"
        },
        columnStyles: {
          clases: { columnWidth: 220 },
          circuito: { columnWidth: 110 },
          nhoras: { columnWidth: 40 },
          fecha: { columnWidth: 60 }
        }
      });
      var finalY = doc.autoTable.previous.finalY;
      doc.text(556, finalY + 10, "TOTAL DE HORAS IMPARTIDAS: ");
      doc.text(695, finalY + 10, "28");

      doc.text(120, 540, "__________________________________");

      doc.text(120, 551, "      FIRMA DEL ALUMNO(HUELLA)");
      doc.text(580, 540, "___________________________");
      doc.text(580, 551, "      FIRMA DEL DIRECTOR");

      /********************/
      /***** PAGINA 2 *****/
      /********************/

      doc.addPage();

      doc.addImage(imagen0, "JPEG", 40, 40, 107, 23);
      doc.addImage(imagen1, "JPEG", 660, 40, 115, 29);

      // Nombres y apellidos
      doc.autoTable(colnom, rows, {
        margin: { horizontal: 40, top: 70 },
        columnStyles: {
          nombre: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(
        185,
        83,
        datos.alumno.a_paterno +
          " " +
          datos.alumno.a_materno +
          " " +
          datos.alumno.nombres
      );

      // DNI
      doc.autoTable(coldoc, rows, {
        margin: { horizontal: 40, top: finalY0 + 3 },
        columnStyles: {
          n_dni: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(185, finalY0 + 16, datos.alumno.dni);

      // Fecha de inicio
      doc.autoTable(colfechai, rows, {
        margin: { horizontal: 40, top: finalY1 + 3 },
        columnStyles: {
          fechainicio: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(
        185,
        finalY1 + 16,
        date_converter.convertDate(new Date(teoria[0].fecha))
      );

      // Fecha fin
      doc.autoTable(colfechaf, rows, {
        margin: { horizontal: 40, top: finalYY2 + 3 },
        columnStyles: {
          fechafin: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(
        185,
        finalYY2 + 16,
        date_converter.convertDate(new Date(manejo[3].fecha))
      );

      // N expediente
      doc.autoTable(
        [{ title: "NRO DE EXPEDIENTE", dataKey: "expediente" }],
        rows,
        {
          margin: { horizontal: 400, top: 70 },
          columnStyles: {
            cp: { columnWidth: 205 }
          },
          styles: {
            fontSize: 8,
            columnWidth: "wrap",
            overflow: "linebreak"
          }
        }
      );
      doc.text(505, 83, datos.expediente);

      // ENCABEZADO DEL SEGUNDO SECTOR
      // Licencia que posee
      doc.autoTable(colCT, rows, {
        margin: { horizontal: 400, top: finalY0 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalY0 + 16, datos.licencia_actual);

      // Licencia a la que postula
      doc.autoTable(colCP, rows, {
        margin: { horizontal: 400, top: finalY1 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalY1 + 16, datos.licencia_postula);

      // Curso
      doc.autoTable(colPE, rows, {
        margin: { horizontal: 400, top: finalYY2 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalYY2 + 16, datos.curso);

      doc.autoTable(
        [{ title: "RESUMEN DE LAS CLASES TEÓRICAS", dataKey: "ti" }],
        rows,
        {
          tableWidth: "wrap",
          margin: { horizontal: 40, top: finalY3 + 8 },
          styles: {
            fontSize: 8,
            columnWidth: "wrap",
            halign: "center"
          },
          columnStyles: {
            ti: { columnWidth: 740 }
          }
        }
      );

      doc.autoTable([{ title: "CLASES TEÓRICAS", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY4 + 1 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          halign: "center"
        },
        columnStyles: {
          ti: { columnWidth: 309 }
        }
      });
      doc.autoTable([{ title: "PRÁCTICAS DE MANEJO", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 350, top: finalY4 + 1 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          halign: "center"
        },
        columnStyles: {
          ti: { columnWidth: 430 }
        }
      });

      var col = [
        { title: "No", dataKey: "nro" },
        { title: "NOMBRE DEL CURSO", dataKey: "nombreCurso" },
        { title: "HORAS", dataKey: "horas" },
        { title: "FECHA CAPACITACION", dataKey: "fecha" }
      ];

      rows = [];

      for (var key in filas_teoria_pag_2) {
        var temp = filas_teoria_pag_2[key];
        rows.push(temp);
      }

      doc.autoTable(col, rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY5 + 1 },
        styles: {
          fontSize: 6.5,
          columnWidth: "wrap",
          halign: "left",
          overflow: "linebreak"
        },
        columnStyles: {
          nro: { columnWidth: 20 },
          nombreCurso: { columnWidth: 159 },
          horas: { columnWidth: 60 },
          fecha: { columnWidth: 70 }
        }
      });

      doc.setFontSize(8);
      doc.text(95, finalY2 - 40, "TOTAL DE HORAS IMPARTIDAS: ");
      doc.text(245, finalY2 - 40, "24");

      var col = [
        { title: "CLASES DE CIRCULACION", dataKey: "clases" },
        { title: "CIRCUITO/ VIAS CUANDO SE LLEVE A CABO", dataKey: "circuito" },
        { title: "HORAS", dataKey: "nhoras" },
        { title: "FECHA CAPACITACION", dataKey: "fecha" }
      ];

      rows1 = [];

      for (var key in filas_manejo_pag_2) {
        var temp = filas_manejo_pag_2[key];
        rows1.push(temp);
      }
      doc.autoTable(col, rows1, {
        tableWidth: "wrap",
        margin: { horizontal: 350, top: finalY5 + 1 },
        styles: {
          fontSize: 6.5,
          columnWidth: "wrap",
          halign: "center",
          overflow: "linebreak"
        },
        columnStyles: {
          clases: { columnWidth: 220 },
          circuito: { columnWidth: 110 },
          nhoras: { columnWidth: 40 },
          fecha: { columnWidth: 60 }
        }
      });
      doc.text(556, finalY - 40, "TOTAL DE HORAS IMPARTIDAS: ");
      doc.text(695, finalY - 40, "2");

      doc.text(120, 540, "__________________________________");
      doc.text(120, 551, "      FIRMA DEL ALUMNO(HUELLA)");
      doc.text(580, 540, "___________________________");
      doc.text(580, 551, "      FIRMA DEL DIRECTOR");

      doc.save(datos.expediente + "_FIAC.pdf");
    });
  });
}
