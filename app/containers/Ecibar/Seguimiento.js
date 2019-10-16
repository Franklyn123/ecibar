import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { getExpediente } from '../../actions2/seguimiento.action';

import * as ficha from '../../reports/fichainsripcion';
import * as reportes from './Reportes';

import moment from 'moment';

const datos = {
  estado: '',
  expediente: '',
  alumno: {
    dni: '',
    nombres: '',
    a_paterno: '',
    a_materno: '',
    sexo: '',
    domicilio: '',
    cel_tel: '',
    fecha_nacimiento: '',
    departamento: '',
    provincia: '',
    distrito: ''
  },
  fecha_registro_expediente: '',
  fecha_inicio_teoria: '',
  fecha_fin_teoria: '',
  fecha_inicio_manejo: '',
  fecha_fin_manejo: '',
  km_inicio: '',
  km_fin: '',
  vehiculo: '',
  clase_vehiculo: '',
  instructor: '',
  curso: '',
  licencia_actual: '',
  licencia_postula: '',
  clases_teoricas: [],
  clases_manejo: [],
  dias_manejo: '',
  horas_manejo: '',
  dias_teoria: '',
  horas_teoria: '',
  total_horas: ''
};

const styles = theme => ({
  demo: {
    height: 'auto'
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  input: {
    margin: theme.spacing.unit * 3
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menu: {
    width: 200
  },
  picker: {
    margin: `${theme.spacing.unit * 3}px 5px`
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class BlankPage extends React.Component {
  state = {
    numeracion: '',
    dni: ''
  };

  componentDidMount() {
    const loguedUsername = localStorage.getItem('username');
    if (!loguedUsername) {
      window.location.href = '/login';
    } else if (
      loguedUsername !== 'octavio' &&
      loguedUsername !== 'direccion' &&
      loguedUsername !== 'administracion'
    ) {
      window.location.href = '/not-found';
    }
  }

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onGetExpedienteClick = () => {
    const props = { ...this.props };
    props.getExpediente(this.state);
  };

  onPrintFichaInscripcion(datos) {
    ficha.ficha_inscripcion(datos);
  }

  onPrintFichas(datos) {
    reportes.generar_reportes(datos);
  }

  onPrintExamenes() {
    if (datos.curso === 'TALLER CAMBIEMOS DE ACTITUD') {
      window.open(
        '/examenes/taller_cambiemos_actitud/EXAMENES.pdf',
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800'
      );
    } else if (datos.curso === 'RECATEGORIZACIÓN') {
      window.open(
        '/examenes/aiia/EXAMENES.pdf',
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800'
      );
    }
  }

  render() {
    const props = { ...this.props };
    const title = brand.name + ' - Blank Page';
    const description = brand.desc;
    const { numeracion, dni } = this.state;

    const expediente = props.seguimiento.get('expediente');

    /*eslint-disable */
    const dias = new Array(
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    );

    /* eslint-enable */
    if (expediente != null && expediente.get('state')) {
      // Estado
      if (expediente.get('exp').get('estado')) {
        datos.estado = expediente.get('exp').get('estado');
      }

      // Numero expediente
      if (expediente.get('exp').get('numeracion')) {
        datos.expediente = expediente
          .get('exp')
          .get('numeracion')
          .toString();
      }

      //* ***************/
      //* *** ALUMNO ****/
      //* ***************/

      // DNI
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('dni')
      ) {
        datos.alumno.dni = expediente
          .get('exp')
          .get('alumno')
          .get('dni');
      }

      // Nombres
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('nombres')
      ) {
        datos.alumno.nombres = expediente
          .get('exp')
          .get('alumno')
          .get('nombres')
          .toUpperCase();
      }

      // Apellido Paterno
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('a_paterno')
      ) {
        datos.alumno.a_paterno = expediente
          .get('exp')
          .get('alumno')
          .get('a_paterno')
          .toUpperCase();
      }

      // Apellido Materno
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('a_materno')
      ) {
        datos.alumno.a_materno = expediente
          .get('exp')
          .get('alumno')
          .get('a_materno')
          .toUpperCase();
      }

      // Sexo
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('sexo')
      ) {
        datos.alumno.sexo = expediente
          .get('exp')
          .get('alumno')
          .get('sexo')
          .toUpperCase();
      }

      // Domicilio
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('domicilio')
      ) {
        datos.alumno.domicilio = expediente
          .get('exp')
          .get('alumno')
          .get('domicilio')
          .toUpperCase();
      }

      // Celular Telefono
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('cel_tel')
      ) {
        datos.alumno.cel_tel = expediente
          .get('exp')
          .get('alumno')
          .get('cel_tel')
          .toString();
      }

      // Fecha de Nacimiento
      if (
        expediente
          .get('exp')
          .get('alumno')
          .get('fecha_nacimiento')
      ) {
        datos.alumno.fecha_nacimiento = expediente
          .get('exp')
          .get('alumno')
          .get('fecha_nacimiento');
      }

      // Departamento
      if (expediente.get('departamento')) {
        datos.alumno.departamento = expediente
          .get('departamento')
          .toUpperCase()
          .toString();
      }

      // Provincia
      if (expediente.get('provincia')) {
        datos.alumno.provincia = expediente
          .get('provincia')
          .toUpperCase()
          .toString();
      }

      // Distrito
      if (expediente.get('distrito')) {
        datos.alumno.distrito = expediente
          .get('distrito')
          .toUpperCase()
          .toString();
      }

      /** ***************** */
      /** ** EXPEDIENTE *** */
      /** ***************** */

      // Fecha de Registro de Expediente
      if (expediente.get('exp').get('fecha_registro_expediente')) {
        datos.fecha_registro_expediente = expediente
          .get('exp')
          .get('fecha_registro_expediente')
          .toString();
      }

      // Curso
      if (expediente.get('curso')) {
        datos.curso = expediente.get('curso').toUpperCase();
      }

      // Licencia Actual
      if (expediente.get('lactual')) {
        datos.licencia_actual = expediente.get('lactual');
      }

      // Licencia que Postula
      if (expediente.get('lpostula')) {
        datos.licencia_postula = expediente.get('lpostula');
      }

      //* ****************/
      //* *** TEORIA  ****/
      //* ****************/

      // Asistencias Teoricas
      if (expediente.get('exp').get('asistencias_teoricas')) {
        datos.clases_teoricas = expediente
          .get('exp')
          .get('asistencias_teoricas');
      }

      if (
        expediente
          .get('exp')
          .get('curso_licencia')
          .get('dias_teoricas')
      ) {
        datos.dias_teoria = expediente
          .get('exp')
          .get('curso_licencia')
          .get('dias_teoricas')
          .toString();
      }

      if (
        expediente
          .get('exp')
          .get('curso_licencia')
          .get('horas_teoricas')
      ) {
        datos.horas_teoria = expediente
          .get('exp')
          .get('curso_licencia')
          .get('horas_teoricas')
          .toString();
      }

      if (expediente.get('exp').get('fecha_inicio_teoria')) {
        datos.fecha_inicio_teoria = expediente
          .get('exp')
          .get('fecha_inicio_teoria');
      }

      if (expediente.get('exp').get('fecha_fin_teoria')) {
        datos.fecha_fin_teoria = expediente.get('exp').get('fecha_fin_teoria');
      }

      //* ****************/
      //* *** MANEJO  ****/
      //* ****************/

      // Asistencias Manejo
      if (expediente.get('exp').get('asistencias_manejo')) {
        datos.clases_manejo = expediente.get('exp').get('asistencias_manejo');
      }

      if (expediente.get('lactual')) {
        datos.licencia_actual = expediente.get('lactual');
      }
      if (expediente.get('lpostula')) {
        datos.licencia_postula = expediente.get('lpostula');
      }

      if (
        expediente
          .get('exp')
          .get('curso_licencia')
          .get('dias_manejo')
      ) {
        datos.dias_manejo = expediente
          .get('exp')
          .get('curso_licencia')
          .get('dias_manejo')
          .toString();
      }

      if (
        expediente
          .get('exp')
          .get('curso_licencia')
          .get('horas_manejo')
      ) {
        datos.horas_manejo = expediente
          .get('exp')
          .get('curso_licencia')
          .get('horas_manejo')
          .toString();
      }

      if (expediente.get('exp').get('fecha_inicio_manejo')) {
        datos.fecha_inicio_manejo = expediente
          .get('exp')
          .get('fecha_inicio_manejo');
      }

      if (expediente.get('exp').get('fecha_fin_manejo')) {
        datos.fecha_fin_manejo = expediente.get('exp').get('fecha_fin_manejo');
      }

      if (expediente.get('exp').get('km_inicio')) {
        datos.km_inicio = expediente
          .get('exp')
          .get('km_inicio')
          .toString();
      }

      if (expediente.get('exp').get('km_fin')) {
        datos.km_fin = expediente
          .get('exp')
          .get('km_fin')
          .toString();
      }

      if (expediente.get('vehiculo')) {
        if (expediente.get('vehiculo').get('placa')) {
          datos.vehiculo = expediente.get('vehiculo').get('placa');
        }

        if (expediente.get('vehiculo').get('clase')) {
          datos.clase_vehiculo = expediente
            .get('vehiculo')
            .get('clase')
            .get('nombre')
            .toString();
        }
      }

      if (expediente.get('instructor')) {
        datos.instructor = (
          expediente.get('instructor').get('a_paterno') +
          ' ' +
          expediente.get('instructor').get('a_materno') +
          ' ' +
          expediente.get('instructor').get('nombres')
        ).toUpperCase();
      }

      //* ********************/
      //* *** ADICIONALES ****/
      //* ********************/

      if (
        expediente
          .get('exp')
          .get('curso_licencia')
          .get('total_horas')
      ) {
        datos.total_horas = expediente
          .get('exp')
          .get('curso_licencia')
          .get('total_horas')
          .toString();
      }
    }
    return (
      <div>
        <Helmet>
          <title>ECIBAR - Seguimiento</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="" desc="">
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
            spacing={40}
          >
            <TextField
              id="outlined-full-width"
              label="N° Expediente"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={numeracion}
              onChange={this.handleChangeInput('numeracion')}
            />
            <TextField
              id="outlined-full-width"
              label="DNI"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={dni}
              onChange={this.handleChangeInput('dni')}
            />
            {/*eslint-disable */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.onGetExpedienteClick.bind(this)}
              className={props.classes.button}
            >
              {/* eslint-enable */}
              Filtrar
            </Button>
          </Grid>
          <Typography variant="h6" className={props.classes.divider}>
            1.- DATOS DEL ALUMNO
          </Typography>
          <Grid
            container
            alignItems="flex-start"
            justify="space-between"
            direction="row"
            spacing={40}
          >
            <TextField
              id="outlined-full-width"
              label="Nombres"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={datos.alumno.nombres}
            />
            <TextField
              id="outlined-full-width"
              label="Apellido Paterno"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={datos.alumno.a_paterno}
            />
            <TextField
              id="outlined-full-width"
              label="Apellido Materno"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={datos.alumno.a_materno}
            />
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justify="space-between"
            direction="row"
            spacing={40}
            style={{ marginTop: 16 }}
          >
            <TextField
              id="outlined-full-width"
              label="Curso"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={datos.curso}
            />
            <TextField
              id="outlined-full-width"
              label="De"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={datos.licencia_actual}
            />
            <TextField
              id="outlined-full-width"
              label="A"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={datos.licencia_postula}
            />
          </Grid>
          <Typography variant="h6" className={props.classes.divider}>
            2.- ASISTENCIAS
          </Typography>
          <Table className="TABLE TEST">
            <TableHead>
              <TableRow>
                <TableCell padding="dense">
                  Asistencias de Teroria(
                  {datos.dias_teoria})
                </TableCell>
                <TableCell padding="dense">Dia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.clases_teoricas.map(item => (
                <TableRow key={item.get('fecha')}>
                  <TableCell padding="dense">
                    {moment(item.get('fecha')).format('L')}
                  </TableCell>
                  <TableCell padding="dense">
                    {dias[new Date(item.get('fecha')).getDay()]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell padding="dense">
                  Asistencias de Manejo(
                  {datos.dias_manejo})
                </TableCell>
                <TableCell padding="dense">Dia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.clases_manejo.map(item => (
                <TableRow key={item.get('fecha')}>
                  <TableCell padding="dense">
                    {moment(item.get('fecha')).format('L')}
                  </TableCell>
                  <TableCell padding="dense">
                    {dias[moment(item.get('fecha')).day()]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            color="primary"
            className={props.classes.button}
            disabled={datos.estado == 'R'}
            onClick={this.onPrintFichaInscripcion.bind(this, datos)}
          >
            FICHA DE INSCRIPCION
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={props.classes.button}
            disabled={datos.estado == 'R'}
            onClick={this.onPrintFichas.bind(this, datos)}
          >
            FICHAS TECNICAS
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={props.classes.button}
            onClick={this.onPrintExamenes.bind()}
          >
            EXÁMENES
          </Button>
        </PapperBlock>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  seguimiento: state.get('seguimiento')
});
export default connect(
  mapStateToProps,
  { getExpediente, ficha }
)(withStyles(styles)(BlankPage));
