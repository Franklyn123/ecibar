import * as imageen from '../image_converter';
import * as date_converter from '../date_converter';
import * as generador from './generador/generar_contenido_examenes';

const img = new Image();
const img2 = new Image();

export function aiv_RAET(datos) {
  // Genera arreglo de objetos JSON de dias de teoria

  const teoria = [];
  for (let i = 0; i < datos.clases_teoricas.size; i++) {
    teoria.push({
      fecha: datos.clases_teoricas._tail.array[i]._root.entries[0][1]
    });
  }

  const rows = [];
  const rows1 = [];
  const filas_teoria = generador.generar(teoria);

  const doc = new jsPDF('l', 'pt');

  img.src = '/images/ecibar/ecibar.png';
  img2.src = '/images/ecibar/mtc.png';

  imageen.imgToBase64(img.src, imagen => {
    doc.addImage(imagen, 'JPEG', 40, 40, 107, 23);

    imageen.imgToBase64(img2.src, imagen => {
      doc.addImage(imagen, 'JPEG', 660, 40, 115, 29);

      doc.setFont('helvetica');
      doc.setFontType('bold');
      doc.setFontSize(16);

      doc.text(225, 60, 'REGISTRO DE ASISTENCIA A EXÁMENES TEÓRICOS');

      doc.setFontSize(8);
      doc.setFillColor(41, 128, 186);

      const colnom = [{ title: 'APELLIDOS Y NOMBRES ', dataKey: 'nombre' }];
      const coldoc = [
        {
          title: 'DNI/CE No.                                     ',
          dataKey: 'dni'
        }
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
        datos.alumno.a_paterno
          + ' '
          + datos.alumno.a_materno
          + ' '
          + datos.alumno.nombres
      );
      const finalY0 = doc.autoTable.previous.finalY;

      // DNI
      doc.autoTable(coldoc, rows, {
        margin: { horizontal: 40, top: finalY0 + 3 },
        columnStyles: {
          n_dni: { columnWidth: 135 }
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
        date_converter.convertDate(new Date(teoria[0].fecha))
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(
        185,
        finalY2 + 16,
        date_converter.convertDate(new Date(teoria[1].fecha))
      );
      const finalY3 = doc.autoTable.previous.finalY;

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
          columnWidth: 'wrap',
          overflow: 'linebreak'
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
          columnWidth: 'wrap',
          overflow: 'linebreak'
        }
      });
      doc.text(620, finalY1 + 16 - 5, datos.licencia_postula);

      // Licencia en tramite
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
      doc.text(620, finalY2 + 16 - 5, datos.curso);

      doc.autoTable(
        [{ title: 'RESUMEN DE LAS CLASES TEÓRICAS', dataKey: 'ti' }],
        rows,
        {
          tableWidth: 'wrap',
          margin: { horizontal: 40, top: finalY3 + 8 },
          styles: {
            fontSize: 8,
            columnWidth: 'wrap',
            halign: 'center'
          },
          columnStyles: {
            ti: { columnWidth: 740 }
          }
        }
      );

      const col = [
        { title: 'No', dataKey: 'nro' },
        { title: 'FECHA', dataKey: 'fecha' },
        { title: 'EXAMEN', dataKey: 'tipoexamen' },
        { title: 'NOTA', dataKey: 'nota' },
        { title: 'HORA INGRESO', dataKey: 'horaentrada' },
        { title: 'FIRMA DEL ALUMNO', dataKey: 'firmaalumno1' },
        { title: 'HUELLA', dataKey: 'huella1' },
        { title: 'HORA SALIDA', dataKey: 'horasalida' },
        { title: 'FIRMA DEL ALUMNO', dataKey: 'firmaalumno2' },
        { title: 'HUELLA', dataKey: 'huella2' }
      ];
      for (const key in filas_teoria) {
        const temp = filas_teoria[key];
        rows.push(temp);
      }

      const finalY5 = doc.autoTable.previous.finalY;

      doc.autoTable(col, rows, {
        tableWidth: 'wrap',
        margin: { horizontal: 40, top: finalY5 + 1 },
        styles: {
          fontSize: 8,
          columnWidth: 'wrap',
          halign: 'center',
          overflow: 'linebreak'
        },
        columnStyles: {
          nro: { columnWidth: 30 },
          fecha: { columnWidth: 60 },
          tipoexamen: { columnWidth: 170 },
          nota: { columnWidth: 40 },
          horaentrada: { columnWidth: 50 },
          firmaalumno1: { columnWidth: 110 },
          huella1: { columnWidth: 60 },
          horasalida: { columnWidth: 50 },
          firmaalumno2: { columnWidth: 110 },
          huella2: { columnWidth: 60 }
        },
        theme: 'grid'
      });

      doc.setFontSize(8);
      var finalY2 = doc.autoTable.previous.finalY;
      doc.text(600, finalY2 + 10, 'TOTAL DE HORAS IMPARTIDAS: ');
      doc.text(750, finalY2 + 10, '12');

      const finalY = doc.autoTable.previous.finalY;

      doc.text(120, 540, '__________________________________');

      doc.text(120, 551, '      FIRMA DEL ALUMNO(HUELLA)');
      doc.text(580, 540, '___________________________');
      doc.text(580, 551, '      FIRMA DEL DIRECTOR');

      doc.save(datos.expediente + '_RAET.pdf');
    });
  });
}
