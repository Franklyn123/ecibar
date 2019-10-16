import * as imageen from '../image_converter';
import * as date_converter from '../date_converter';
import * as generador from './generador/generar_contenido_manejo';

const datosexamen = require('./contenido/contenido_examenes.json');

const img = new Image();
const img2 = new Image();

export function aiii_c_FTMA(datos) {
  const rows = [];
  const rows1 = [];

  // Genera arreglo de objetos JSON de dias de manejo
  const manejo = [];
  for (var i = 0; i < datos.clases_manejo.size; i++) {
    manejo.push({
      fecha_inicio: datos.clases_manejo._tail.array[i]._root.entries[1][1],
      fecha_fin: datos.clases_manejo._tail.array[i]._root.entries[2][1],
      km_inicio: datos.clases_manejo._tail.array[i]._root.entries[5][1],
      km_fin: datos.clases_manejo._tail.array[i]._root.entries[6][1]
    });
  }

  const filas_manejo_pag_1 = generador.generar_manejo_pag_1(
    manejo,
    datos.instructor
  );
  const filas_manejo_pag_2 = generador.generar_manejo_pag_2(
    manejo,
    datos.instructor
  );

  const doc = new jsPDF('l', 'pt');

  img.src = '/images/ecibar/ecibar.png';
  img2.src = '/images/ecibar/mtc.png';

  imageen.imgToBase64(img.src, imagen0 => {
    doc.addImage(imagen0, 'JPEG', 40, 40, 107, 23, undefined, 'FAST');

    imageen.imgToBase64(img2.src, imagen1 => {
      doc.addImage(imagen1, 'JPEG', 660, 40, 115, 29, undefined, 'FAST');

      doc.setFont('helvetica');
      doc.setFontType('bold');

      doc.setFontSize(16);

      // FTMA

      doc.text(235, 60, 'FICHA TÉCNICA DE MANEJO DEL ALUMNO');
      doc.setFontSize(10);
      doc.setFillColor(41, 128, 186);

      doc.setFontSize(8);
      const colnom = [{ title: 'APELLIDOS Y NOMBRES ', dataKey: 'nombre' }];
      const coldoc = [
        { title: 'DNI/CE No.                          ', dataKey: 'dni' }
      ];
      const colfechai = [{ title: 'FECHA DE INICIO ', dataKey: 'fechainicio' }];
      const colfechaf = [{ title: 'FECHA DE TERMINO', dataKey: 'fechafin' }];
      const colCT = [
        { title: 'CLASE Y CATEGORIA DE LICENCIA QUE POSEE', dataKey: 'cp' }
      ];
      const colCP = [
        { title: 'CLASE Y CATEGORIA DE LICENCIA A LA POSTULA', dataKey: 'cp' }
      ];

      const colPE = [
        {
          title: 'TIPO DE CURSO',
          dataKey: 'cp'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        83,
        datos.alumno.a_paterno +
          ' ' +
          datos.alumno.a_materno +
          ' ' +
          datos.alumno.nombres
      );
      const finalY0 = doc.autoTable.previous.finalY;

      // DNI
      doc.autoTable(coldoc, rows, {
        margin: { horizontal: 40, top: finalY0 + 3 },
        columnStyles: {
          dni: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(185, finalY0 + 16, datos.alumno.dni);
      const finalY1 = doc.autoTable.previous.finalY;

      // Fecha de inicio
      doc.autoTable(colfechai, rows, {
        margin: { horizontal: 40, top: finalY1 + 3 },
        columnStyles: {
          fechainicio: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        finalY1 + 16,
        date_converter.convertDate(new Date(manejo[0].fecha_inicio))
      );
      const finalY2 = doc.autoTable.previous.finalY;

      // Fecha fin
      doc.autoTable(colfechaf, rows, {
        margin: { horizontal: 40, top: finalY2 + 3 },
        columnStyles: {
          fechafin: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        finalY2 + 16,
        date_converter.convertDate(new Date(manejo[3].fecha_fin))
      );
      const finalY3 = doc.autoTable.previous.finalY;

      // Placa del vehiculo
      doc.autoTable([{ title: 'PLACA DEL VEHICULO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 40, top: finalY3 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 135 }
        }
      });
      doc.text(185, finalY3 + 16, datos.vehiculo);
      const finalY4 = doc.autoTable.previous.finalY;

      // Categoria del vehiculo
      doc.autoTable([{ title: 'CAT. DEL VEHICULO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 40, top: finalY4 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 135 }
        }
      });
      doc.text(185, finalY4 + 16, datos.clase_vehiculo);
      const finalY5 = doc.autoTable.previous.finalY;

      // N expediente
      doc.autoTable(
        [{ title: 'NRO DE EXPEDIENTE', dataKey: 'expediente' }],
        rows,
        {
          margin: { horizontal: 400, top: 70 },
          columnStyles: {
            cp: { columnWidth: 205 }
          },
          styles: {
            fontSize: 8,
            columnWidth: 'wrap',
            overflow: 'linebreak'
          }
        }
      );
      doc.text(500, 83, datos.expediente);

      // ENCABEZADO DEL SEGUNDO SECTOR
      doc.autoTable(colCT, rows, {
        margin: { horizontal: 400, top: finalY0 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(620, finalY2 + 16, datos.curso);

      doc.autoTable([{ title: 'KILOMETRAJE INICIO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 400, top: finalY3 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 210 }
        }
      });
      doc.text(620, finalY3 + 16, manejo[0].km_inicio.toString());

      doc.autoTable([{ title: 'KILOMETRAJE TERMINO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 400, top: finalY4 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 210 }
        }
      });
      doc.text(620, finalY4 + 16, manejo[3].km_fin.toString());

      // Datos de la capacitación
      doc.autoTable(
        [{ title: 'DATOS DE LA CAPACITACION', dataKey: 'ti' }],
        rows,
        {
          tableWidth: 'wrap',
          margin: { horizontal: 15, top: finalY5 + 8 },
          styles: {
            fontSize: 8,
            columnWidth: 'wrap',
            halign: 'center'
          },
          columnStyles: {
            ti: { columnWidth: 805 }
          }
        }
      );

      const col = [
        { title: 'No', dataKey: 'nro' },
        { title: 'FECHA', dataKey: 'fecha' },
        { title: 'HORA INICIO', dataKey: 'Hinicio' },
        { title: 'HORA TERMINO', dataKey: 'Hfinal' },
        {
          title: 'CLASES DE CIRCULACION EN VIAS REALIZADAS',
          dataKey: 'clases'
        },
        {
          title: 'CIRCUITO/ VIAS CUANDO SE LLEVE A CABO EM VIAS, INDICAR',
          dataKey: 'circuito'
        },
        { title: 'KM INICIO', dataKey: 'Kinicio' },
        { title: 'KM TERMINO', dataKey: 'Ktermino' },
        { title: 'APELLIDOS Y NOMBRES DEL INSTRUCTOR', dataKey: 'instructor' },
        { title: 'FIRMA DEL INSTRUCTOR', dataKey: 'firmaInstructor' },
        { title: 'FIRMA ALUMNO', dataKey: 'firmaAlumno' },
        { title: 'HUELLA ALUMNO', dataKey: 'huellaAlumno' }
      ];

      for (var key in filas_manejo_pag_1) {
        var temp = filas_manejo_pag_1[key];
        rows.push(temp);
      }

      const finalYN = doc.autoTable.previous.finalY;

      doc.autoTable(col, rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 15, top: finalYN + 1 },
        styles: {
          fontSize: 7,
          columnWidth: 'wrap',
          halign: 'center',
          overflow: 'linebreak'
        },
        columnStyles: {
          nro: { columnWidth: 20 },
          fecha: { columnWidth: 45 },
          Hinicio: { columnWidth: 40 },
          Hfinal: { columnWidth: 40 },
          clases: { columnWidth: 200, fontSize: 6 },
          circuito: { columnWidth: 80, fontSize: 6 },
          Kinicio: { columnWidth: 45 },
          Ktermino: { columnWidth: 45 },
          instructor: { columnWidth: 80 },
          firmaInstructor: { columnWidth: 75 },
          firmaAlumno: { columnWidth: 75 },
          huellaAlumno: { columnWidth: 60 }
        },
        theme: 'grid'
      });
      doc.setFontSize(8);

      const finalY = doc.autoTable.previous.finalY;

      doc.text(120, 540, '__________________________________');

      doc.text(120, 551, '      FIRMA DEL ALUMNO(HUELLA)');
      doc.text(580, 540, '___________________________');
      doc.text(580, 551, '      FIRMA DEL DIRECTOR');

      /** ***************** */
      /** *** PAGINA 2 **** */
      /** ***************** */

      doc.addPage();

      doc.addImage(imagen0, 'JPEG', 40, 40, 107, 23);
      doc.addImage(imagen1, 'JPEG', 660, 40, 115, 29);

      // Nombres y apellidos
      doc.autoTable(colnom, rows, {
        margin: { horizontal: 40, top: 70 },
        columnStyles: {
          nombre: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        83,
        datos.alumno.a_paterno +
          ' ' +
          datos.alumno.a_materno +
          ' ' +
          datos.alumno.nombres
      );

      // DNI
      doc.autoTable(coldoc, rows, {
        margin: { horizontal: 40, top: finalY0 + 3 },
        columnStyles: {
          dni: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        finalY1 + 16,
        date_converter.convertDate(new Date(manejo[0].fecha_inicio))
      );

      // Fecha fin
      doc.autoTable(colfechaf, rows, {
        margin: { horizontal: 40, top: finalY2 + 3 },
        columnStyles: {
          fechafin: { columnWidth: 135 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        finalY2 + 16,
        date_converter.convertDate(new Date(manejo[6].fecha_fin))
      );

      // Placa del vehiculo
      doc.autoTable([{ title: 'PLACA DEL VEHICULO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 40, top: finalY3 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 135 }
        }
      });
      doc.text(185, finalY3 + 16, datos.vehiculo);

      // Categoria del vehiculo
      doc.autoTable([{ title: 'CAT. DEL VEHICULO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 40, top: finalY4 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 135 }
        }
      });
      doc.text(185, finalY4 + 16, datos.clase_vehiculo);

      // N expediente
      doc.autoTable(
        [{ title: 'NRO DE EXPEDIENTE', dataKey: 'expediente' }],
        rows,
        {
          margin: { horizontal: 400, top: 70 },
          columnStyles: {
            cp: { columnWidth: 205 }
          },
          styles: {
            fontSize: 8,
            columnWidth: 'wrap',
            overflow: 'linebreak'
          }
        }
      );
      doc.text(500, 83, datos.expediente);

      // ENCABEZADO DEL SEGUNDO SECTOR
      doc.autoTable(colCT, rows, {
        margin: { horizontal: 400, top: finalY0 + 3 },
        columnStyles: {
          cp: { columnWidth: 210 }
        },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          overflow: 'linebreak'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(620, finalY2 + 16, datos.curso);

      doc.autoTable([{ title: 'KILOMETRAJE DE INICIO', dataKey: 'ti' }], rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 400, top: finalY3 + 3 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap'
        },
        columnStyles: {
          ti: { columnWidth: 210 }
        }
      });
      doc.text(620, finalY3 + 16, manejo[4].km_inicio.toString());

      doc.autoTable(
        [{ title: 'KILOMETRAJE DE TERMINO', dataKey: 'ti' }],
        rows,
        {
          tableWidth: 'wrap',
          margin: { horizontal: 400, top: finalY4 + 3 },
          styles: {
            fontSize: 8,
            columnWidth: 'wrap'
          },
          columnStyles: {
            ti: { columnWidth: 210 }
          }
        }
      );
      doc.text(620, finalY4 + 16, manejo[6].km_fin.toString());

      // Datos de la capacitación
      doc.autoTable(
        [{ title: 'DATOS DE LA CAPACITACION', dataKey: 'ti' }],
        rows,
        {
          tableWidth: 'wrap',
          margin: { horizontal: 15, top: finalY5 + 8 },
          styles: {
            fontSize: 8,
            columnWidth: 'wrap',
            halign: 'center'
          },
          columnStyles: {
            ti: { columnWidth: 805 }
          }
        }
      );

      for (var key in filas_manejo_pag_2) {
        var temp = filas_manejo_pag_2[key];
        rows1.push(temp);
      }

      doc.autoTable(col, rows1, {
        tableWidth: 'wrap',
        margin: { horizontal: 15, top: finalYN + 1 },
        styles: {
          fontSize: 7,
          columnWidth: 'wrap',
          halign: 'center',
          overflow: 'linebreak'
        },
        columnStyles: {
          nro: { columnWidth: 20 },
          fecha: { columnWidth: 45 },
          Hinicio: { columnWidth: 40 },
          Hfinal: { columnWidth: 40 },
          clases: { columnWidth: 200, fontSize: 6 },
          circuito: { columnWidth: 80, fontSize: 6 },
          Kinicio: { columnWidth: 45 },
          Ktermino: { columnWidth: 45 },
          instructor: { columnWidth: 80 },
          firmaInstructor: { columnWidth: 75 },
          firmaAlumno: { columnWidth: 75 },
          huellaAlumno: { columnWidth: 60 }
        },
        theme: 'grid'
      });
      doc.setFontSize(8);

      doc.text(120, 540, '__________________________________');

      doc.text(120, 551, '      FIRMA DEL ALUMNO(HUELLA)');
      doc.text(580, 540, '___________________________');
      doc.text(580, 551, '      FIRMA DEL DIRECTOR');

      doc.save(datos.expediente + '_FTMA.pdf');
    });
  });
}
