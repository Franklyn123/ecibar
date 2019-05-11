import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import RadioGroup from '@material-ui/core/RadioGroup';

import { Field, reduxForm } from 'redux-form/immutable';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import {
  getHistorialExterno,
  postHistorialExterno,
  putHistorialExterno,
  deleteHistorialExterno,
  getAlumnos,
  getTramitadores
} from '../../actions2/historialexterno';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  marcar: {
    width: 128,
    height: 128,
  },
});
class HistorialExt extends React.Component {
    state={
      alumnos: [],
      historial: [],
      toast: 'error',
      toastMessage: 'Error',
      open: false,
      name: 'Composed TextField',
      vendedor: '',
      alumno: '',
      aCuenta: 0,
      saldo: 0,
      fechaSaldo: new Date(),
      totalPago: 0,
      comision: 0
    }

    componentDidMount() {
      this.props.getHistorialExterno();
      this.props.getAlumnos();
      this.props.getTramitadores();
    }


    handleChangeInput = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    handleChangeSelect=name =>event =>{
      console.log(name);
      this.setState({[name]:event.target.value});
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.props.changeStateToast();
      // this.setState({ open: false });
    };

    onSubmit =e => {
      console.log(this.state.vendedor)
      e.preventDefault();
      if (this.state) {

        this.props.postHistorialExterno(this.state);
        this.setState({
          name: 'Composed TextField',
          vendedor: '',
          alumno: '',
          aCuenta: 0,
          saldo: 0,
          fechaSaldo: new Date(),
          totalPago: 0,
          comision: 0
        });
      } else {
        console.log('llene los datos porfavor');
      }
    }

    render() {
      //console.log(this);
      const { classes } = this.props;
      const { historiales } = this.props;
      const title = brand.name + ' - Blank Page';
      const description = brand.desc;
      const {
        vendedor, submitting, alumno, aCuenta, saldo, totalPago, comision
      } = this.state;
      //console.log(this.props.historialext);
      const historialExterno = this.props.historialext.get('historiales');
      /* if(historialExterno!=null && historialExterno.get('state')){
          console.log("abriendo");
        } */
     // console.log(historialExterno);
      const alumnos = this.props.historialext.get('alumnos');
      const tramitadores = this.props.historialext.get('tramitadores');
      // console.log(alumnos);
      return (
        <div>
          <Helmet>
            <title>ECIBAR - Historial de ventas externo</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <PapperBlock title="" desc="">
            <div>
              <Fragment>

                <form onSubmit={this.onSubmit}>
                  <Typography variant="h6" className={classes.divider}>1.- REGISTRO DE VENTA EXTERNA</Typography>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="space-between"
                    direction="row"
                    spacing={24}
                    style={{ marginTop: 16 }}
                  >
                   <Grid
                    item
                    md={6}
                    className={classes.demo}
                    >
                  <TextField
                    id="outline-select-currency"
                    select
                    fullWidth
                    label="Tramitador"
                    className={classes.TextField}
                    value={vendedor}
                    onChange={this.handleChangeSelect('vendedor')}
                    SelectProps={{
                      MenuProps:{
                        className:classes.menu,
                      }
                    }}
                    margin="normal"
                    variant="outlined"
                    required
                    >
                    <MenuItem key="-1" value="-1">
                        {''}
                      </MenuItem>
                      {tramitadores.map(option => (
                        <MenuItem key={option.get('nombres') +" "+ option.get('a_materno') +" "+ option.get('a_materno')} value={option.get('nombres') +" "+ option.get('a_materno') +" "+ option.get('a_materno')}>
                          {option.get('nombres') +" "+ option.get('a_materno') +" "+ option.get('a_materno')}
                        </MenuItem>
                      ))}
                    </TextField>

                    </Grid>

                    <Grid
                    item
                    md={6}
                    className={classes.demo}
                    >
                    <TextField
                    id="outline-select-currency"
                    select
                    fullWidth
                    label="Alumno"
                    className={classes.TextField}
                    value={alumno}
                    onChange={this.handleChangeSelect('alumno')}
                    SelectProps={{
                      MenuProps:{
                        className:classes.menu,
                      }
                    }}
                    margin="normal"
                    variant="outlined"
                    required
                    >
                    <MenuItem key="-1" value="-1">
                        {''}
                      </MenuItem>

                      {alumnos.map(option => (
                        <MenuItem key={option.nombres +" "+ option.a_materno +" "+ option.a_materno} value={option.nombres +" "+ option.a_materno +" "+ option.a_materno}>
                          {option.nombres +" "+ option.a_materno +" "+ option.a_materno}
                        </MenuItem>
                      ))}
                    </TextField>

                    </Grid>

                  </Grid>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="space-between"
                    direction="row"
                    spacing={24}
                    style={{ marginTop: 12 }}
                  >
                    <TextField
                      id="outlined-full-width"
                      label="A cuenta"
                      style={{ margin: 8 }}
                      placeholder=""
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={aCuenta}
                      onChange={this.handleChangeInput('aCuenta')}
                      required
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Saldo"
                      style={{ margin: 8 }}
                      placeholder=""
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={saldo}
                      onChange={this.handleChangeInput('saldo')}
                      required
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Monto Total"
                      style={{ margin: 8 }}
                      placeholder=""
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={totalPago}
                      onChange={this.handleChangeInput('totalPago')}
                      required
                    />
                  </Grid>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="flex-end"
                    direction="row"
                    spacing={24}
                    style={{ marginTop: 16 }}
                  >
                    <Button variant="contained" type="submit" color="primary" disabled={submitting}>
                    Guardar
                    </Button>
                  </Grid>
                </form>
              </Fragment>
            </div>
          </PapperBlock>

        </div>
      );
    }
}
const mapStateToProps = state => ({
  historialext: state.get('historialext')
});
export default connect(
  mapStateToProps, {
    getHistorialExterno, postHistorialExterno, putHistorialExterno, deleteHistorialExterno, getAlumnos, getTramitadores
  }
)(withStyles(styles)(HistorialExt));
