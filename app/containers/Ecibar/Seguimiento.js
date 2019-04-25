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

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  input: {
    margin: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  picker: {
    margin: `${theme.spacing.unit * 3}px 5px`,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class BlankPage extends React.Component {
  state = {
    numeracion: '',
    dni: ''
  }

  componentDidMount() {
    const loguedUsername = localStorage.getItem('username');
    if (!loguedUsername) {
      window.location.href = '/login';
    } else if (loguedUsername !== 'octavio' && loguedUsername !== 'direccion' && loguedUsername !== 'administracion') {
      window.location.href = '/not-found';
    }
  }

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onGetExpedienteClick= () => {
    const props = { ...this.props };
    props.getExpediente(this.state);
  };

  render() {
    const props = { ...this.props };
    const title = brand.name + ' - Blank Page';
    const description = brand.desc;
    const { numeracion, dni } = this.state;

    const expediente = props.seguimiento.get('expediente');
    let nombres = '';
    let aPaterno = '';
    let aMaterno = '';
    let aTeoricas = [];
    let aManejo = [];
    let curso = '';
    let de = '';
    let a = '';
    let dmanejo = 0;
    let dteoria = 0;

    /*eslint-disable */
    const dias = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
    /* eslint-enable */
    if (expediente != null && expediente.get('state')) {
      nombres = expediente.get('exp').get('alumno').get('nombres');
      aPaterno = expediente.get('exp').get('alumno').get('a_paterno');
      aMaterno = expediente.get('exp').get('alumno').get('a_materno');
      aTeoricas = expediente.get('exp').get('asistencias_teoricas');
      aManejo = expediente.get('exp').get('asistencias_manejo');
      curso = expediente.get('curso');
      de = expediente.get('lactual');
      a = expediente.get('lpostula');
      dmanejo = expediente.get('exp').get('curso_licencia').get('dias_teoricas');
      dteoria = expediente.get('exp').get('curso_licencia').get('dias_manejo');
    } else {
      nombres = '';
      aPaterno = '';
      aMaterno = '';
      aTeoricas = [];
      aManejo = [];
      curso = '';
      de = '';
      a = '';
      dmanejo = 0;
      dteoria = 0;
    }
    // console.log();
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
                shrink: true,
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
                shrink: true,
              }}
              value={dni}
              onChange={this.handleChangeInput('dni')}
            />
            {/*eslint-disable */}
            <Button variant="contained" color="primary" onClick={this.onGetExpedienteClick.bind(this)} className={props.classes.button}>
            {/* eslint-enable */}

                    Filtrar
            </Button>
          </Grid>
          <Typography variant="h6" className={props.classes.divider}>1.- DATOS DEL ALUMNO</Typography>
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
                shrink: true,
              }}
              value={nombres}
            />
            <TextField
              id="outlined-full-width"
              label="Apellido Paterno"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={aPaterno}
            />
            <TextField
              id="outlined-full-width"
              label="Apellido Materno"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={aMaterno}
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
                shrink: true,
              }}
              value={curso}
            />
            <TextField
              id="outlined-full-width"
              label="De"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={de}
            />
            <TextField
              id="outlined-full-width"
              label="A"
              style={{ margin: 8 }}
              placeholder=""
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={a}
            />
          </Grid>
          <Typography variant="h6" className={props.classes.divider}>2.- ASISTENCIAS</Typography>
          <Table className="TABLE TEST">
            <TableHead>
              <TableRow>
                <TableCell padding="dense">
Asistencias de Teroria(
                  {dteoria}
)
                </TableCell>
                <TableCell padding="dense">Dia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aTeoricas.map(item => (
                <TableRow key={item.get('fDia') + '-' + item.get('fMes') + '-' + item.get('fAnio')}>
                  <TableCell padding="dense">{item.get('fDia') + '-' + item.get('fMes') + '-' + item.get('fAnio')}</TableCell>
                  <TableCell padding="dense">{dias[new Date(item.get('fAnio'), item.get('fMes'), item.get('fDia')).getDay()]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table className="TABLE TEST">
            <TableHead>
              <TableRow>
                <TableCell padding="dense">
Asistencias de Manejo(
                  {dmanejo}
)
                </TableCell>
                <TableCell padding="dense">Dia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aManejo.map(item => (
                <TableRow key={item.get('fDia') + '-' + item.get('fMes') + '-' + item.get('fAnio')}>
                  <TableCell padding="dense">{item.get('fDia') + '-' + item.get('fMes') + '-' + item.get('fAnio')}</TableCell>
                  <TableCell padding="dense">{dias[new Date(item.get('fAnio'), item.get('fMes'), item.get('fDia')).getDay()]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" color="primary" className={props.classes.button}>
                    IMPRIMIR
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
  { getExpediente })(withStyles(styles)(BlankPage));
