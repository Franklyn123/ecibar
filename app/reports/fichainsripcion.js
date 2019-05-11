import * as imageen from "./image_converter";
import * as date_converter from "./date_converter";

const img = new Image();
export function ficha_inscripcion(datos) {
  // Genera arreglo de objetos JSON de dias de teoria
  var teoria = [];
  for (var i = 0; i < datos.clases_teoricas.size; i++) {
    teoria.push({
      fecha: datos.clases_teoricas._tail.array[i]._root.entries[0][1]
    });
  }

  // Genera arreglo de objetos JSON de dias de manejo
  var manejo = [];
  for (var i = 0; i < datos.clases_manejo.length; i++) {
    manejo.push({
      fecha: datos.clases_manejo[i]._root.entries[0][1],
      km_inicio: datos.clases_manejo[i]._root.entries[1][1],
      km_fin: datos.clases_manejo[i]._root.entries[2][1]
    });
  }

  const datosNombres = [
    { AP: datos.a_paterno, AM: datos.a_materno, NM: datos.nombres }
  ];
  var rows = [];
  var rowsNomb = [];
  var doc = new jsPDF("l", "pt");
  img.src = "/images/ecibar/ecibar.png";
  console.log(img.src);
  imageen.imgToBase64(img.src, function(imagen) {
    doc.addImage(imagen, "JPEG", 40, 40, 168, 42.75);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(275, 55, "OFICINA DE ADMISION");
    doc.setFontSize(10);
    doc.text(275, 72, "FICHA DE INSCRIPCION");

    doc.setFontSize(8);

    var colnom = [{ title: "REGISTRO GENERAL ", dataKey: "nombre" }];
    var colDatosPersonales = [
      {
        title: "1.- DATOS DEL ALUMNO (INFORMACION QUE REGISTRA ADMISION)",
        dataKey: "DPersonales"
      }
    ];
    var colNombres = [
      { title: "APELLIDO PATERNO", dataKey: "AP" },
      { title: "APELLIDO MATERNO", dataKey: "AM" },
      { title: "NOMBRES", dataKey: "NM" }
    ];
    var colsex = [{ title: "SEXO ", dataKey: "sx" }];
    var colM = [{ title: "M", dataKey: "sx" }];
    var colF = [{ title: "F", dataKey: "sx" }];
    var colfechaN = [{ title: "F. NACIMIENTO", dataKey: "fechaN" }];
    var colLNacimiento = [{ title: "LUGAR DE NACIMIENTO", dataKey: "cp" }];
    var colDNI = [{ title: "DNI", dataKey: "cp" }];

    var colLugarDNI = [{ title: "LUGAR DEL DNI", dataKey: "cp" }];
    var colLugarDEP = [{ title: "DEPARTAMENTO", dataKey: "cp" }];

    //encabezado para los nombres y apellidos
    doc.autoTable(colnom, rows, {
      margin: { horizontal: 55, top: 95 },
      columnStyles: {
        nombre: { columnWidth: 130 }
      },
      styles: {
        fontSize: 10,
        columnWidth: "wrap"
      }
    });
    let finalY = doc.autoTable.previous.finalY;
    doc.text(215, finalY - 8, datos.expediente);

    doc.autoTable(colDatosPersonales, rows, {
      margin: { horizontal: 55, top: finalY + 5 },
      columnStyles: {
        DPersonales: { columnWidth: 582 }
      },
      styles: {
        fontSize: 10,
        columnWidth: "wrap"
      }
    });

    for (var key in datosNombres) {
      var temp = datosNombres[key];
      rowsNomb.push(temp);
    }
    doc.autoTable(colNombres, rowsNomb, {
      margin: { horizontal: 55, top: finalY + 28 },
      columnStyles: {
        AP: { columnWidth: 194 },
        AM: { columnWidth: 194 },
        NM: { columnWidth: 194 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY1 = doc.autoTable.previous.finalY;
    //doc.text(180, 156, $scope.fechainicio);
    //encabezado de fecha fin
    doc.autoTable(colsex, rows, {
      margin: { horizontal: 55, top: finalY1 },
      columnStyles: {
        sx: { columnWidth: 55 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });

    doc.autoTable(colM, rows, {
      margin: { horizontal: 130, top: finalY1 },
      columnStyles: {
        sx: { columnWidth: 20 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        halign: "center"
      }
    });
    doc.autoTable(colF, rows, {
      margin: { horizontal: 170, top: finalY1 },
      columnStyles: {
        sx: { columnWidth: 20 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        halign: "center"
      }
    });
    if (datos.alumno.sexo == "M") {
      doc.text(155, finalY1 + 13, "X");
    } else if (datos.alumno.sexo != "M") {
      doc.text(195, finalY1 + 13, "X");
    }

    doc.autoTable(colfechaN, rows, {
      margin: { horizontal: 220, top: finalY1 },
      columnStyles: {
        fechaN: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(
      320,
      finalY1 + 15,
      date_converter.convertDate(new Date(datos.alumno.fecha_nacimiento))
    );

    //doc.text(420, 130, $scope.licTramite);
    doc.autoTable(colLNacimiento, rows, {
      margin: { horizontal: 440, top: finalY1 },
      columnStyles: {
        cp: { columnWidth: 150 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    let finalY2 = doc.autoTable.previous.finalY;
    //doc.text(420, 153, $scope.licTramite);
    doc.autoTable(colDNI, rows, {
      margin: { horizontal: 55, top: finalY2 + 1 },
      columnStyles: {
        cp: { columnWidth: 55 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(120, finalY2 + 15, datos.alumno.dni);

    doc.autoTable(colLugarDNI, rows, {
      margin: { horizontal: 220, top: finalY2 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(320, finalY2 + 15, "dep");

    doc.autoTable(colLugarDEP, rows, {
      margin: { horizontal: 440, top: finalY2 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(540, finalY2 + 15, "LIMA");

    let finalY3 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "EDAD", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY3 + 1 },
      columnStyles: {
        cp: { columnWidth: 55 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(120, finalY3 + 15, "40");

    doc.autoTable([{ title: "DOMICILIO", dataKey: "cp" }], rows, {
      margin: { horizontal: 220, top: finalY3 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(220, finalY3 + 35, datos.alumno.domicilio);

    doc.autoTable([{ title: "PROVINCIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 440, top: finalY3 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(540, finalY3 + 15, "pro");

    let finalY4 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "TELÉFONO", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY4 + 1 },
      columnStyles: {
        cp: { columnWidth: 55 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(120, finalY4 + 15, datos.alumno.cel_tel);

    doc.autoTable([{ title: "DISTRITO", dataKey: "cp" }], rows, {
      margin: { horizontal: 440, top: finalY4 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap",
        overflowColumns: "linebreak"
      }
    });
    doc.text(540, finalY4 + 15, "dist");
    let finalY5 = doc.autoTable.previous.finalY;
    doc.autoTable(
      [
        {
          title: "2.- TIPO DE CURSO  (INFORMACION QUE REGISTRA ADMISION)",
          dataKey: "cp"
        }
      ],
      rows,
      {
        margin: { horizontal: 55, top: finalY5 + 3 },
        columnStyles: {
          cp: { columnWidth: 582 }
        },
        styles: {
          fontSize: 10,
          columnWidth: "wrap"
        }
      }
    );
    let finalY6 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "REVALIDACION", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "RECATEGORIZACION", dataKey: "cp" }], rows, {
      margin: { horizontal: 175, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 100 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "PROFESIONALIZACION", dataKey: "cp" }], rows, {
      margin: { horizontal: 305, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    //doc.line(15, finalY6 + 100, 100, finalY6 + 100)
    doc.autoTable([{ title: "REFORZAMIENTO", dataKey: "cp" }], rows, {
      margin: { horizontal: 445, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY7 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "TOLERANCIA CERO", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY7 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "SENSIBILIZACION", dataKey: "cp" }], rows, {
      margin: { horizontal: 175, top: finalY7 + 1 },
      columnStyles: {
        cp: { columnWidth: 100 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "OTROS", dataKey: "cp" }], rows, {
      margin: { horizontal: 305, top: finalY7 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY8 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "LICENCIA QUE POSEE", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY8 + 1 },
      columnStyles: {
        cp: { columnWidth: 105 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "LICENCIA QUE ASPIRA", dataKey: "cp" }], rows, {
      margin: { horizontal: 290, top: finalY8 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY9 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "TURNO ELEGIDO", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "MAÑANA", dataKey: "cp" }], rows, {
      margin: { horizontal: 160, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 50 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "TARDE", dataKey: "cp" }], rows, {
      margin: { horizontal: 240, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 50 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "NOCHE", dataKey: "cp" }], rows, {
      margin: { horizontal: 320, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 50 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "FECHA INSCRIPCION", dataKey: "cp" }], rows, {
      margin: { horizontal: 400, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 100 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY10 = doc.autoTable.previous.finalY;
    doc.text(510, finalY10 - 5, date_converter.convertDate(Date.now()));
    doc.autoTable([{ title: "REGISTRADO POR", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY10 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.text(161, finalY10 + 15, "MAX MINO MIRO");
    let finalY11 = doc.autoTable.previous.finalY;
    doc.autoTable(
      [{ title: "3.- AREA PROCESAMIENTO DE EXPEDIENTES", dataKey: "cp" }],
      rows,
      {
        margin: { horizontal: 55, top: finalY11 + 3 },
        columnStyles: {
          cp: { columnWidth: 582 }
        },
        styles: {
          fontSize: 10,
          columnWidth: "wrap"
        }
      }
    );
    let finalY12 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "INICIA TEORIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "DIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 160, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "MES", dataKey: "cp" }], rows, {
      margin: { horizontal: 225, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "FIN TEORIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 335, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "DIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 445, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "MES", dataKey: "cp" }], rows, {
      margin: { horizontal: 510, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY13 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "INICIA MANEJO", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "DIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 160, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "MES", dataKey: "cp" }], rows, {
      margin: { horizontal: 225, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "FIN MANEJO", dataKey: "cp" }], rows, {
      margin: { horizontal: 335, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "DIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 445, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "MES", dataKey: "cp" }], rows, {
      margin: { horizontal: 510, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY14 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "HORAS TEORIA", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY14 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "HORAS PRACTICA MANEJO", dataKey: "cp" }], rows, {
      margin: { horizontal: 205, top: finalY14 + 1 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    doc.autoTable([{ title: "TOTAL DE HORAS", dataKey: "cp" }], rows, {
      margin: { horizontal: 425, top: finalY14 + 1 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY15 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "OBSERVACIONES", dataKey: "cp" }], rows, {
      margin: { horizontal: 55, top: finalY15 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY16 = doc.autoTable.previous.finalY;
    doc.autoTable(
      [{ title: "5.- OFICINA DE EXPEDICION DE CERTIFICADOS", dataKey: "cp" }],
      rows,
      {
        margin: { horizontal: 55, top: finalY16 + 3 },
        columnStyles: {
          cp: { columnWidth: 582 }
        },
        styles: {
          fontSize: 10,
          columnWidth: "wrap"
        }
      }
    );
    let finalY17 = doc.autoTable.previous.finalY;
    doc.autoTable(
      [{ title: "NOMBRE DEL CURSO EN EL SISTEMA", dataKey: "cp" }],
      rows,
      {
        margin: { horizontal: 55, top: finalY17 + 1 },
        columnStyles: {
          cp: { columnWidth: 180 }
        },
        styles: {
          fontSize: 8,
          columnWidth: "wrap"
        }
      }
    );
    doc.autoTable([{ title: "CERTIFICADO Nº", dataKey: "cp" }], rows, {
      margin: { horizontal: 380, top: finalY17 + 1 },
      columnStyles: {
        cp: { columnWidth: 120 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    //SEGUNDO BLOQUE
    //let finalY = doc.autoTable.previous.finalY;
    //doc.text(160, finalY - 8, $scope.rgeneral);
    doc.autoTable([{ title: "FIRMA DE RESPONSABLES", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY + 6 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 9,
        columnWidth: "wrap"
      }
    });
    let finalY18 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "1.- ADMISION", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY18 + 2 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY19 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "2.- CAJA", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY18 + 70 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY20 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "PAGO COMPLETO", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY20 + 1 },
      columnStyles: {
        cp: { columnWidth: 80 }
      },
      styles: {
        fontSize: 6
      }
    });
    let finalY21 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "PAGO A CUENTA", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY21 + 1 },
      columnStyles: {
        cp: { columnWidth: 80 }
      },
      styles: {
        fontSize: 6
      }
    });
    let finalY22 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "SALDO", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY22 + 1.1 },
      columnStyles: {
        cp: { columnWidth: 80 }
      },
      styles: {
        fontSize: 6
      }
    });
    let finalY23 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "3.- A.PROC. EXPEDIENTES", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY23 + 3 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY24 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "4.- CERTIFICADOS", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY24 + 50 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY25 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "5.- DIRECTOR", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY25 + 35 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });
    let finalY26 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: "6.- ARCHIVO", dataKey: "cp" }], rows, {
      margin: { horizontal: 640, top: finalY26 + 35 },
      columnStyles: {
        cp: { columnWidth: 130 }
      },
      styles: {
        fontSize: 8,
        columnWidth: "wrap"
      }
    });

    //FIN SEGUNDO BLOQUE
    doc.save("_FI.pdf");
  });
}
