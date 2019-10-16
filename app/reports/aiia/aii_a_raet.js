import * as image_converter from '../image_converter';
import * as generador_examenes from './generador/generar_contenido_examenes';

const img = new Image();

export function aii_a_RAET(datos) {
  // Genera arreglo de objetos JSON de dias de teoria
  var teoria = [];
  for (var i = 0; i < datos.clases_teoricas.size; i++) {
    teoria.push({
      fecha: datos.clases_teoricas._tail.array[i]._root.entries[0][1]
    });
  }

  var filas = generador_examenes.generar(teoria);

  var doc = new jsPDF('l', 'pt');
  var rows = [];

  img.src = '/images/ecibar/ecibar.png';

  image_converter.imgToBase64(img.src, function(imagen) {
    doc.addImage(imagen, 'JPEG', 40, 40, 168, 42.75, undefined, 'FAST');

    doc.setFont('helvetica');
    doc.setFontType('bold');

    // RACT
    doc.setFontSize(20);
    doc.text(280, 70, 'REGISTRO DE ASISTENCIA A EXÁMENES TEÓRICOS');

    doc.setFontSize(8);

    var exp = [
      {
        title: 'Nº EXPEDIENTE                                        ',
        dataKey: 'exp'
      }
    ];
    var colnom = [{ title: 'APELLIDOS Y NOMBRES ', dataKey: 'nombre' }];
    var collic = [{ title: 'LICENCIA EN TRAMITE ', dataKey: 'lt' }];
    var coltipoc = [{ title: 'TIPO DE CURSO ', dataKey: 'tc' }];

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
      datos.alumno.a_paterno +
        ' ' +
        datos.alumno.a_materno +
        ' ' +
        datos.alumno.nombres
    );
    var finalY0 = doc.autoTable.previous.finalY;

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
    var finalY1 = doc.autoTable.previous.finalY;

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

    // Tabla de asistencia a examenes teoricos
    var col = [
      { title: 'FECHA', dataKey: 'fecha' },
      { title: 'Nª', dataKey: 'nro' },
      { title: 'TIPO DE EXAMEN', dataKey: 'tipoexamen' },
      { title: 'NOTA', dataKey: 'nota' },
      { title: 'PROMEDIO', dataKey: 'promedio' },
      { title: 'RESULTADO', dataKey: 'resultado' }
    ];

    for (var key in filas) {
      var temp = filas[key];
      rows.push(temp);
    }

    // Tabla de examenes
    doc.autoTable(col, rows, {
      tableWidth: 'wrap',
      margin: { horizontal: 40, top: finalY1 + 8 },
      styles: {
        overflow: 'linebreak',
        columnWidth: 'wrap',
        fontSize: 8,
        cellPadding: 4,
        overflowColumns: 'linebreak',
        halign: 'center'
      },
      columnStyles: {
        fecha: { columnWidth: 70, halign: 'center' },
        nro: { columnWidth: 30, halign: 'center' },
        tipoexamen: { columnWidth: 350 },
        nota: { columnWidth: 80, halign: 'center' },
        promedio: { columnWidth: 80, halign: 'center' },
        resultado: { columnWidth: 80, halign: 'center' }
      },
      overflowColumns: ['tipoexamen']
    });

    doc.setFontSize(8);
    var finalY = doc.autoTable.previous.finalY;
    doc.text(540, finalY + 10, 'PROMEDIO FINAL: ');
    doc.text(690, finalY + 10, '');

    doc.text(120, 540, '__________________________________');

    doc.text(120, 551, '      FIRMA DEL ALUMNO(HUELLA)');
    doc.text(580, 540, '___________________________');
    doc.text(580, 551, '      FIRMA DEL DIRECTOR');

    doc.save(datos.expediente + '_RAET.pdf');
  });
}
