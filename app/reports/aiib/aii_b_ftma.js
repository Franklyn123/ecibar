import * as imageen from "../image_converter";
import * as date_converter from "../date_converter";
import * as generador from "./generador/generar_contenido_manejo";

var datosexamen = require("./contenido/contenido_examenes.json");

const img = new Image();
const img2 = new Image();

export function aii_b_FTMA(datos) {
  var rows = [];

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
  var filas = generador.generar(manejo, datos.instructor);

  var doc = new jsPDF("l", "pt");

  img.src = "/images/ecibar/ecibar.png";
  img2.src = "/images/ecibar/mtc.png";

  imageen.imgToBase64(img.src, function(imagen) {
    doc.addImage(imagen, "JPEG", 40, 40, 107, 23);

    imageen.imgToBase64(img2.src, function(imagen) {
      doc.addImage(imagen, "JPEG", 660, 40, 115, 29);

      doc.setFont("helvetica");
      doc.setFontType("bold");

      doc.setFontSize(16);

      // FTMA

      doc.text(235, 60, "FICHA TÉCNICA DE MANEJO DEL ALUMNO");
      doc.setFontSize(10);
      doc.setFillColor(41, 128, 186);

      doc.setFontSize(8);
      var colnom = [{ title: "APELLIDOS Y NOMBRES ", dataKey: "nombre" }];
      var coldoc = [
        { title: "DNI/CE No.                          ", dataKey: "dni" }
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
          dni: { columnWidth: 135 }
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
        date_converter.convertDate(new Date(manejo[0].fecha))
      );
      var finalY2 = doc.autoTable.previous.finalY;

      // Fecha fin
      doc.autoTable(colfechaf, rows, {
        margin: { horizontal: 40, top: finalY2 + 3 },
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
        finalY2 + 16,
        date_converter.convertDate(new Date(manejo[3].fecha))
      );
      var finalY3 = doc.autoTable.previous.finalY;

      // Placa del vehiculo
      doc.autoTable([{ title: "PLACA DEL VEHICULO", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY3 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        },
        columnStyles: {
          ti: { columnWidth: 135 }
        }
      });
      doc.text(185, finalY3 + 16, datos.vehiculo);
      var finalY4 = doc.autoTable.previous.finalY;

      // Categoria del vehiculo
      doc.autoTable([{ title: "CAT. DEL VEHICULO", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 40, top: finalY4 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        },
        columnStyles: {
          ti: { columnWidth: 135 }
        }
      });
      doc.text(185, finalY4 + 16, datos.clase_vehiculo);
      var finalY5 = doc.autoTable.previous.finalY;

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
      doc.text(500, 83, datos.expediente);

      //ENCABEZADO DEL SEGUNDO SECTOR
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

      doc.autoTable(colPE, rows, {
        margin: { horizontal: 400, top: finalY2 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap",
          overflow: "linebreak"
        }
      });
      doc.text(620, finalY2 + 16, datos.curso);

      doc.autoTable([{ title: "KILOMETRAJE DE INICIO", dataKey: "ti" }], rows, {
        tableWidth: "wrap",
        margin: { horizontal: 400, top: finalY3 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        },
        columnStyles: {
          ti: { columnWidth: 210 }
        }
      });
      doc.text(620, finalY3 + 16, manejo[0].km_inicio.toString());

      doc.autoTable(
        [{ title: "KILOMETRAJE DE TERMINO", dataKey: "ti" }],
        rows,
        {
          tableWidth: "wrap",
          margin: { horizontal: 400, top: finalY4 + 3 },
          styles: {
            fontSize: 8,
            columnWidth: "wrap"
          },
          columnStyles: {
            ti: { columnWidth: 210 }
          }
        }
      );
      doc.text(620, finalY4 + 16, manejo[3].km_fin.toString());

      // Datos de la capacitación
      doc.autoTable(
        [{ title: "DATOS DE LA CAPACITACION", dataKey: "ti" }],
        rows,
        {
          tableWidth: "wrap",
          margin: { horizontal: 15, top: finalY5 + 8 },
          styles: {
            fontSize: 8,
            columnWidth: "wrap",
            halign: "center"
          },
          columnStyles: {
            ti: { columnWidth: 805 }
          }
        }
      );

      var col = [
        { title: "No", dataKey: "nro" },
        { title: "FECHA", dataKey: "fecha" },
        { title: "HORA INICIO", dataKey: "Hinicio" },
        { title: "HORA DE TERMINO", dataKey: "Hfinal" },
        {
          title: "CLASES DE CIRCULACION EN VIAS REALIZADAS",
          dataKey: "clases"
        },
        {
          title: "CIRCUITO/ VIAS CUANDO SE LLEVE A CABO EM VIAS, INDICAR",
          dataKey: "circuito"
        },
        { title: "KM INICIO", dataKey: "Kinicio" },
        { title: "KM TERMINO", dataKey: "Ktermino" },
        { title: "APELLIDOS Y NOMBRES DEL INSTRUCTOR", dataKey: "instructor" },
        { title: "FIRMA DEL INSTRUCTOR", dataKey: "firmaInstructor" },
        { title: "FIRMA DEL ALUMNO", dataKey: "firmaAlumno" },
        { title: "HUELLA DEL ALUMNO", dataKey: "huellaAlumno" }
      ];

      for (var key in filas) {
        var temp = filas[key];
        rows.push(temp);
      }

      var finalYN = doc.autoTable.previous.finalY;

      doc.autoTable(col, rows, {
        tableWidth: "wrap",
        margin: { horizontal: 15, top: finalYN + 1 },
        styles: {
          fontSize: 7,
          columnWidth: "wrap",
          halign: "center",
          overflow: "linebreak"
        },
        columnStyles: {
          nro: { columnWidth: 20 },
          fecha: { columnWidth: 45 },
          Hinicio: { columnWidth: 40 },
          Hfinal: { columnWidth: 40 },
          clases: { columnWidth: 200, fontSize: 6 },
          circuito: { columnWidth: 80, fontSize: 6 },
          Kinicio: { columnWidth: 50 },
          Ktermino: { columnWidth: 50 },
          instructor: { columnWidth: 80 },
          firmaInstructor: { columnWidth: 70 },
          firmaAlumno: { columnWidth: 70 },
          huellaAlumno: { columnWidth: 60 }
        },
        theme: 'grid'
      });
      doc.setFontSize(8);

      var finalY = doc.autoTable.previous.finalY;

      doc.text(120, 540, "__________________________________");

      doc.text(120, 551, "      FIRMA DEL ALUMNO(HUELLA)");
      doc.text(580, 540, "___________________________");
      doc.text(580, 551, "      FIRMA DEL DIRECTOR");

      doc.save(datos.expediente + "_FTMA.pdf");
    });
  });
}
