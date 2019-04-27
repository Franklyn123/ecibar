// AII-A
import * as aiia_raet from "../../reports/aiia/aii_a_raet";
import * as aiia_ract from "../../reports/aiia/aii_a_ract";
import * as aiia_ftma from "../../reports/aiia/aii_a_ftma";
import * as aiia_fiac from "../../reports/aiia/aii_a_fiac";
import * as aiia_epm from "../../reports/aiia/aii_a_epm";

// AII-B
import * as aiib_raet from "../../reports/aiib/aii_b_raet";
import * as aiib_ract from "../../reports/aiib/aii_b_ract";
import * as aiib_ftma from "../../reports/aiib/aii_b_ftma";
import * as aiib_fiac from "../../reports/aiib/aii_b_fiac";
import * as aiib_epm from "../../reports/aiib/aii_b_epm";

// AIII-A
import * as aiiia_raet from "../../reports/aiiia/aiii_a_raet";
import * as aiiia_ract from "../../reports/aiiia/aiii_a_ract";
import * as aiiia_ftma from "../../reports/aiiia/aiii_a_ftma";
import * as aiiia_fiac from "../../reports/aiiia/aiii_a_fiac";
import * as aiiia_epm from "../../reports/aiiia/aiii_a_epm";

// AIII-B
import * as aiiib_raet from "../../reports/aiiib/aiii_b_raet";
import * as aiiib_ract from "../../reports/aiiib/aiii_b_ract";
import * as aiiib_ftma from "../../reports/aiiib/aiii_b_ftma";
import * as aiiib_fiac from "../../reports/aiiib/aiii_b_fiac";
import * as aiiib_epm from "../../reports/aiiib/aiii_b_epm";

// AIII-C from AIII-A and AIII-B
import * as aiiic_2_raet from "../../reports/aiiic_2/aiii_c_raet";
import * as aiiic_2_ract from "../../reports/aiiic_2/aiii_c_ract";
import * as aiiic_2_ftma from "../../reports/aiiic_2/aiii_c_ftma";
import * as aiiic_2_fiac from "../../reports/aiiic_2/aiii_c_fiac";
import * as aiiic_2_epm from "../../reports/aiiic_2/aiii_c_epm";

// AIII-C from AII-B

import * as aiiic_1_raet from "../../reports/aiiic_1/aiii_c_raet";
import * as aiiic_1_ract from "../../reports/aiiic_1/aiii_c_ract";
import * as aiiic_1_ftma from "../../reports/aiiic_1/aiii_c_ftma";
import * as aiiic_1_fiac from "../../reports/aiiic_1/aiii_c_fiac";
import * as aiiic_1_epm from "../../reports/aiiic_1/aiii_c_epm";

// TALLER CAMBIEMOS DE ACTITUD

import * as tca_ract from "../../reports/taller_cambiemos_actitud/tca_ract";
import * as tca_fiac from "../../reports/taller_cambiemos_actitud/tca_fiac";
import * as tca_raet from "../../reports/taller_cambiemos_actitud/tca_raet";

export function generar_reportes(datos) {
  if (datos.curso === "RECATEGORIZACIÓN") {
    switch (datos.licencia_postula) {
      case "AII-A":
        aiia_raet.aii_a_RAET(datos);
        aiia_ract.aii_a_RACT(datos);
        aiia_ftma.aii_a_FTMA(datos);
        aiia_fiac.aii_a_FIAC(datos);
        aiia_epm.aii_a_EPM(datos);
        break;
      case "AII-B":
        aiib_raet.aii_b_RAET(datos);
        aiib_ract.aii_b_RACT(datos);
        aiib_ftma.aii_b_FTMA(datos);
        aiib_fiac.aii_b_FIAC(datos);
        aiib_epm.aii_b_EPM(datos);
        break;
      case "AIII-A":
        aiiia_raet.aiii_a_RAET(datos);
        aiiia_ract.aiii_a_RACT(datos);
        aiiia_ftma.aiii_a_FTMA(datos);
        aiiia_fiac.aiii_a_FIAC(datos);
        aiiia_epm.aiii_a_EPM(datos);
        break;
      case "AIII-B":
        aiiib_raet.aiii_b_RAET(datos);
        aiiib_ract.aiii_b_RACT(datos);
        aiiib_ftma.aiii_b_FTMA(datos);
        aiiib_fiac.aiii_b_FIAC(datos);
        aiiib_epm.aiii_b_EPM(datos);
        break;
      case "AIII-C":
        if (!(datos.licencia_actual === "AII-B")) {
          aiiic_2_raet.aiii_c_RAET(datos);
          aiiic_2_ract.aiii_c_RACT(datos);
          aiiic_2_ftma.aiii_c_FTMA(datos);
          aiiic_2_fiac.aiii_c_FIAC(datos);
          aiiic_2_epm.aiii_c_EPM(datos);
        } else {
          // aiiic_1_raet.aiii_c_RAET(datos);
          // aiiic_1_ract.aiii_c_RACT(datos);
          // aiiic_1_ftma.aiii_c_FTMA(datos);
          aiiic_1_fiac.aiii_c_FIAC(datos);
          // aiiic_1_epm.aiii_c_EPM(datos);
        }
        break;
      case "AIV":
        break;
    }
  } else if (datos.curso === "SENSIBILIZACIÓN") {
    tca_ract.tca_RACT(datos);
    tca_fiac.tca_FIAC(datos);
    tca_raet.tca_RAET(datos);
  }
}
