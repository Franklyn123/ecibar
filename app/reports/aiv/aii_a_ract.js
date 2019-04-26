import * as image_converter from '../image_converter';
import * as generador_asistencias from './generador/generar_asistencias_teoricas';

const img = new Image();

export function aii_a_RACT(datos) {
  // Genera arreglo de objetos JSON de dias de teoria
  const teoria = [];
  for (let i = 0; i < datos.clases_teoricas.size; i++) {
    teoria.push({
      fecha: datos.clases_teoricas._tail.array[i]._root.entries[0][1]
    });
  }

  const filas = generador_asistencias.generar(teoria);

  const doc = new jsPDF('l', 'pt');
  const rows = [];

  img.src = '/images/ecibar/ecibar.png';

  image_converter.imgToBase64(img.src, (imagen) => {
    doc.addImage(imagen, 'JPEG', 40, 40, 168, 42.75);

    doc.setFont('helvetica');
    doc.setFontType('bold');

    // RACT
    doc.setFontSize(20);
    doc.text(310, 70, 'REGISTRO DE ASISTENCIA A CLASES TEORICAS');

    doc.setFontSize(8);

    const exp = [
      {
        title: 'Nº EXPEDIENTE                                        ',
        dataKey: 'exp'
      }
    ];
    const colnom = [{ title: 'APELLIDOS Y NOMBRES ', dataKey: 'nombre' }];
    const collic = [{ title: 'LICENCIA EN TRAMITE ', dataKey: 'lt' }];
    const coltipoc = [{ title: 'TIPO DE CURSO ', dataKey: 'tc' }];

    // Nombres y apellidos
    doc.autoTable(colnom, rows, {
      margin: { horizontal: 40, top: 100 },
      columnStyles: {
        nombre: { columnWidth: 160 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.text(
      210,
      113,
      datos.alumno.a_paterno
        + ' '
        + datos.alumno.a_materno
        + ' '
        + datos.alumno.nombres
    );
    const finalY0 = doc.autoTable.previous.finalY;

    // Licencia en tramite
    doc.autoTable(collic, rows, {
      margin: { horizontal: 40, top: finalY0 + 3 },
      columnStyles: {
        lt: { columnWidth: 160 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.text(210, finalY0 + 16, datos.licencia_postula);
    const finalY1 = doc.autoTable.previous.finalY;

    // Expediente
    doc.autoTable(exp, rows, {
      margin: { horizontal: 450, top: 100 },
      columnStyles: {
        nombre: { columnWidth: 160 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.text(620, 113, datos.expediente);

    // Tipo de curso
    doc.autoTable(coltipoc, rows, {
      margin: { horizontal: 450, top: finalY0 + 3 },
      columnStyles: {
        tc: { columnWidth: 160 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.text(620, finalY0 + 16, datos.curso);

    doc.setFontSize(10);
    const col = [
      { title: 'NRO', dataKey: 'nro' },
      { title: 'FECHA', dataKey: 'fecha' },
      { title: 'HORA DE ENTRADA', dataKey: 'horaentrada' },
      { title: 'HORA DE SALIDA', dataKey: 'horasalida' },
      { title: 'HORAS', dataKey: 'horas' }
    ];

    for (const key in filas) {
      const temp = filas[key];
      rows.push(temp);
    }

    // Tabla de horas
    doc.autoTable(col, rows, {
      tableWidth: 'wrap',
      margin: { horizontal: 40, top: finalY1 + 8 },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap',
        halign: 'center'
      },
      columnStyles: {
        nro: { columnWidth: 60 },
        fecha: { columnWidth: 130 },
        horaentrada: { columnWidth: 170 },
        horasalida: { columnWidth: 170 },
        horas: { columnWidth: 120 }
      }
    });

    doc.setFontSize(8);
    const finalY = doc.autoTable.previous.finalY;
    doc.text(450, finalY + 10, 'TOTAL HORAS: ');
    doc.text(623, finalY + 10, '30');

    doc.text(120, 540, '__________________________________');

    doc.text(120, 551, '      FIRMA DEL ALUMNO(HUELLA)');
    doc.text(580, 540, '___________________________');
    doc.text(580, 551, '      FIRMA DEL DIRECTOR');

    doc.save(datos.expediente + '_RACT.pdf');
  });
}
