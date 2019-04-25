import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';


import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import RadioGroup from '@material-ui/core/RadioGroup';

import { Field, reduxForm } from 'redux-form/immutable';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


// bottom
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {
  getItems,
  deleteItem,
  getDepartamentos,
  getProvincias,
  getDistritos,
  getCursos,
  getLicencias,
  addFichaInscripcion,
  getEstado,
  changeStateToast,
  getCursosLicencias,
  changeStateDe,
  changeStateA
} from '../../actions2/itemActions';
/*eslint-disable */
const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);
function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}
const fecha = convertDate(Date.now());

function imgToBase64(src, callback) {
  const outputFormat = src.substr(-3) === 'png' ? 'image/png' : 'image/jpeg';
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  // eslint-disable-next-line
  img.onload = function () {
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    let dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    // eslint-disable-next-line
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    img.src = src;
  }
}

const img = new Image();
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
  margin: {
    margin: theme.spacing.unit,
  },
});
// export const AppContext = React.createContext();
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
function MySnackbarContent(props) {
  const {
    classes, className, message, onClose, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class FichaInscripcion extends React.Component {
  constructor(props) {
    super(props);
    this.generarpdf4 = this.generarpdf4.bind(this);
  }

  state = {
    toast: 'error',
    toastMessage: 'Error',
    open: false,
    name: 'Composed TextField',
    currency: '',
    fechaRegistro: new Date(),
    dni: '',
    nombres: '',
    aPaterno: '',
    aMaterno: '',
    selectedDate: new Date(),
    domicilio: '',
    celTel: '',
    sexo: '',
    departamento: '040000',
    provincia: '-1',
    distrito: '-1',
    tipoCurso: '-1',
    de: '-1',
    a: '-1'
  };

  componentDidMount() {
    const props = { ...this.props };
    props.getItems();
    props.getDepartamentos();
    props.getProvincias('040000');
    props.getCursos();
    props.getLicencias();
    props.getEstado();
    props.getCursosLicencias();
    const loguedUsername = localStorage.getItem('username');
    if (loguedUsername === null) {
      window.location.href = '/login';
    } else if (loguedUsername !== 'octavio') {
      window.location.href = '/not-found';
    }
  }

  handleClick = () => {
    // this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    const props = { ...this.props };
    if (reason === 'clickaway') {
      return;
    }
    props.changeStateToast();
    // this.setState({ open: false });
  };

  onSubmit = e => {
    const props = { ...this.props };
    const state = { ...this.state };
    e.preventDefault();
    if (state.tipoCurso !== '-1'
      && state.de !== '-1'
      && state.a !== '-1') {
      // this.setState({ toast: 'success' });
      // this.setState({ toastMessage: 'Se registró correctamento!' });
      // this.setState({ toast: 'error' });
      // this.setState({ toastMessage: 'Ocurrió un error durante el registro!' });
      // this.setState({ open: true });
      // console.log(this.state);
      props.addFichaInscripcion(state);
      this.generarpdf4(state.numeracion, state.aPaterno, state.aMaterno, state.nombres, state.dni, state.celTel, state.departamento, state.provincia,
        state.distrito, state.domicilio);
      this.setState(
        {
          name: 'Composed TextField',
          currency: '',
          fechaRegistro: new Date(),
          dni: '',
          nombres: '',
          aPaterno: '',
          aMaterno: '',
          selectedDate: new Date(),
          domicilio: '',
          celTel: '',
          sexo: '',
          departamento: '040000',
          provincia: '-1',
          distrito: '-1',
          tipoCurso: '-1',
          de: '-1',
          a: '-1'
        }
      );
    }
    // dispatch(reset("ficha_inscripcion"));
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleFechaRegistroChange = (date) => {
    this.setState({ fechaRegistro: date });
  }

  selectLocale = (selectedLocale) => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null,
    });
  }

  handleMenuOpen = (event) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = event => {
    console.log(this);
    this.setState({ name: event.target.value });
  };

  // cha
  handleChangeSelect = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSelectCurso = name => event => {
    const props = { ...this.props };
    this.setState({
      [name]: event.target.value,
    });
    this.setState({
      a: '-1',
    });
    this.setState({
      de: '-1',
    });
    props.changeStateDe({ curso: event.target.value });
  };

  handleChangeSelectDe = name => event => {
    const props = { ...this.props };
    const state = { ...this.state };
    this.setState({
      [name]: event.target.value,
    });
    this.setState({
      a: '-1',
    });
    props.changeStateA({ curso: state.tipoCurso, de: event.target.value });
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSelectDep = name => event => {
    const props = { ...this.props };
    this.setState({
      [name]: event.target.value,
    });
    this.setState({
      provincia: '-1',
    });
    this.setState({
      distrito: '-1',
    });
    props.getProvincias(event.target.value);
    props.getDistritos('-1');
  };

  handleChangeSelectProv = name => event => {
    const props = { ...this.props };
    this.setState({
      [name]: event.target.value,
    });
    this.setState({
      distrito: '-1',
    });
    props.getDistritos(event.target.value);
  };

  handleChangeRadio = event => {
    // console.log("hh");
    // console.log(event[0]);
    this.setState({
      sexo: event[0],
    });
  };

  // eslint-disable-next-line
  generarpdf4=(nro, a_paterno, a_materno, nombre, dni, telefono, dep, pro, dist, domicilio) => {
    const datosNombres = [
      { AP: a_paterno, AM: a_materno, NM: nombre }
    ];
    const rows = [];
    const rowsNomb = [];
    // var converter = new pdfConverter();
    // eslint-disable-next-line
    const doc = new jsPDF('p', 'pt');
    // cambiar la ruta de la imagen a utilizar
    img.src = '/app/logoinst.jpg';
    imgToBase64(img.src, (imagen) => {
      console.log(imagen);
      doc.addImage(imagen, 'JPEG', 15, 10, 150, 40);
    });
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(16);
    doc.text(220, 28, 'OFICINA DE ADMISION');
    doc.setFontSize(10);
    doc.text(220, 45, 'FICHA DE INSCRIPCION');
    doc.setFontSize(10);

    const colnom = [
      { title: 'REGISTRO GENERAL ', dataKey: 'nombre' }
    ];
    const colDatosPersonales = [
      { title: '1.- DATOS DEL ALUMNO (INFORMACION QUE REGISTRA ADMISION)', dataKey: 'DPersonales' }
    ];
    const colNombres = [
      { title: 'APELLIDO PATERNO', dataKey: 'AP' },
      { title: 'APELLIDO MATERNO', dataKey: 'AM' },
      { title: 'NOMBRES', dataKey: 'NM' }
    ];
    const colsex = [
      { title: 'SEXO ', dataKey: 'sx' }
    ];
    const colM = [
      { title: 'M', dataKey: 'sx' }
    ];
    const colF = [
      { title: 'F', dataKey: 'sx' }
    ];
    const colfechaN = [
      { title: 'F. NACIMIENTO', dataKey: 'fechaN' }
    ];
    const colLNacimiento = [
      { title: 'LUGAR DE NACIMIENTO', dataKey: 'cp' }
    ];
    const colDNI = [
      { title: 'DNI', dataKey: 'cp' }
    ];

    const colLugarDNI = [
      { title: 'LUGAR DEL DNI', dataKey: 'cp' }
    ];
    const colLugarDEP = [
      { title: 'DEPARTAMENTO', dataKey: 'cp' }
    ];

    // encabezado para los nombres y apellidos
    doc.autoTable(colnom, rows, {
      margin: { horizontal: 15, top: 95 },
      columnStyles: {
        nombre: { columnWidth: 130 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    // eslint-disable-next-line
    const finalY = doc.autoTable.previous.finalY;
    doc.text(160, finalY - 8, '12');
    doc.autoTable(colDatosPersonales, rows, {
      margin: { horizontal: 15, top: finalY + 5 },
      columnStyles: {
        DPersonales: { columnWidth: 450 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    // eslint-disable-next-line
    for (const key in datosNombres) {
      const temp = datosNombres[key];
      rowsNomb.push(temp);
    }
    doc.autoTable(colNombres, rowsNomb, {
      margin: { horizontal: 15, top: finalY + 28 },
      columnStyles: {
        AP: { columnWidth: 150 },
        AM: { columnWidth: 150 },
        NM: { columnWidth: 150 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'

      }
    });
    const finalY1 = doc.autoTable.previous.finalY;
    // doc.text(180, 156, $scope.fechainicio);
    // encabezado de fecha fin
    doc.autoTable(colsex, rows, {
      margin: { horizontal: 15, top: finalY1 },
      columnStyles: {
        sx: { columnWidth: 41 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'

      }
    });
    doc.autoTable(colM, rows, {
      margin: { horizontal: 57, top: finalY1 },
      columnStyles: {
        sx: { columnWidth: 20 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        halign: 'center',
        overflowColumns: 'linebreak'
      }
    });
    doc.autoTable(colF, rows, {
      margin: { horizontal: 92, top: finalY1 },
      columnStyles: {
        sx: { columnWidth: 20 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        halign: 'center',
        overflowColumns: 'linebreak'
      }
    });
    // eslint-disable-next-line
    if ('M' === 'M') {
      doc.text(80, finalY1 + 15, 'X');
      // eslint-disable-next-line
    } else if ('M' !== 'M') {
      doc.text(115, finalY1 + 15, 'X');
    }

    doc.autoTable(colfechaN, rows, {
      margin: { horizontal: 165, top: finalY1 },
      columnStyles: {
        fechaN: { columnWidth: 90 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(257, finalY1 + 15, fecha);

    // doc.text(420, 130, $scope.licTramite);
    doc.autoTable(colLNacimiento, rows, {
      margin: { horizontal: 315, top: finalY1 },
      columnStyles: {
        cp: { columnWidth: 150 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    const finalY2 = doc.autoTable.previous.finalY;
    // doc.text(420, 153, $scope.licTramite);
    doc.autoTable(colDNI, rows, {
      margin: { horizontal: 15, top: finalY2 + 1 },
      columnStyles: {
        cp: { columnWidth: 41 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(80, finalY2 + 15, dni);
    doc.autoTable(colLugarDNI, rows, {
      margin: { horizontal: 165, top: finalY2 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(257, finalY2 + 15, dep);
    doc.autoTable(colLugarDEP, rows, {
      margin: { horizontal: 315, top: finalY2 + 1 },
      columnStyles: {
        cp: { columnWidth: 93 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(409, finalY2 + 15, dep);
    const finalY3 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'EDAD', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY3 + 1 },
      columnStyles: {
        cp: { columnWidth: 41 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(80, finalY3 + 15, '48038717');
    doc.autoTable([{ title: 'DOMICILIO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 165, top: finalY3 + 1 },
      columnStyles: {
        cp: { columnWidth: 149 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(164, finalY3 + 40, domicilio);
    doc.autoTable([{ title: 'PROVINCIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 315, top: finalY3 + 1 },
      columnStyles: {
        cp: { columnWidth: 93 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(409, finalY3 + 15, pro);
    const finalY4 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'TELEFONO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY4 + 1 },
      columnStyles: {
        cp: { columnWidth: 65 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(81, finalY4 + 15, telefono);
    doc.autoTable([{ title: 'DISTRITO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 315, top: finalY4 + 1 },
      columnStyles: {
        cp: { columnWidth: 93 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap',
        overflowColumns: 'linebreak'
      }
    });
    doc.text(409, finalY4 + 15, dist);
    const finalY5 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '2.- TIPO DE CURSO  (INFORMACION QUE REGISTRA ADMISION)', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY5 + 1 },
      columnStyles: {
        cp: { columnWidth: 450 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap'
      }
    });
    const finalY6 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'REVALIDACION', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'RECATEGORIZACION', dataKey: 'cp' }], rows, {
      margin: { horizontal: 120, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 100 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'PROFESIONALIZACION', dataKey: 'cp' }], rows, {
      margin: { horizontal: 235, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    // doc.line(15, finalY6 + 100, 100, finalY6 + 100)
    doc.autoTable([{ title: 'REFORZAMIENTO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 360, top: finalY6 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY7 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'TOLERANCIA CERO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY7 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'SENSIBILIZACION', dataKey: 'cp' }], rows, {
      margin: { horizontal: 120, top: finalY7 + 1 },
      columnStyles: {
        cp: { columnWidth: 100 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'OTROS', dataKey: 'cp' }], rows, {
      margin: { horizontal: 235, top: finalY7 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY8 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'LICENCIA QUE POSEE', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY8 + 1 },
      columnStyles: {
        cp: { columnWidth: 105 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'LICENCIA QUE ASPIRA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 235, top: finalY8 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY9 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'TURNO ELEGIDO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'MAÑANA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 105, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 46 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'TARDE', dataKey: 'cp' }], rows, {
      margin: { horizontal: 161, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'NOCHE', dataKey: 'cp' }], rows, {
      margin: { horizontal: 216, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'FECHA INSCRIPCION', dataKey: 'cp' }], rows, {
      margin: { horizontal: 271, top: finalY9 + 1 },
      columnStyles: {
        cp: { columnWidth: 92 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY10 = doc.autoTable.previous.finalY;
    doc.text(364, finalY10 - 5, convertDate(Date.now()));
    doc.autoTable([{ title: 'REGISTRADO POR', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY10 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.text(106, finalY10 + 15, 'MAX MINO MIRO');
    const finalY11 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '3.- AREA PROCESAMIENTO DE EXPEDIENTES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY11 + 1 },
      columnStyles: {
        cp: { columnWidth: 450 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap'
      }
    });
    const finalY12 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'INICIA TEORIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'DIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 105, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'MES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 170, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'FIN TEORIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 235, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'DIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 325, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'MES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 390, top: finalY12 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY13 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'INICIA MANEJO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'DIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 105, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'MES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 170, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'FIN MANEJO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 235, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'DIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 325, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'MES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 390, top: finalY13 + 1 },
      columnStyles: {
        cp: { columnWidth: 45 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY14 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'HORAS TEORIA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY14 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'HORAS PRACTICA MANEJO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 140, top: finalY14 + 1 },
      columnStyles: {
        cp: { columnWidth: 120 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'TOTAL DE HORAS', dataKey: 'cp' }], rows, {
      margin: { horizontal: 300, top: finalY14 + 1 },
      columnStyles: {
        cp: { columnWidth: 110 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY15 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'OBSERVACIONES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY15 + 1 },
      columnStyles: {
        cp: { columnWidth: 90 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    const finalY16 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '5.- OFICINA DE EXPEDICION DE CERTIFICADOS', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY16 + 1 },
      columnStyles: {
        cp: { columnWidth: 450 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap'
      }
    });
    const finalY17 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'NOMBRE DEL CURSO EN EL SISTEMA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 15, top: finalY17 + 1 },
      columnStyles: {
        cp: { columnWidth: 180 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: 'CERTIFICADO Nº', dataKey: 'cp' }], rows, {
      margin: { horizontal: 280, top: finalY17 + 1 },
      columnStyles: {
        cp: { columnWidth: 150 }
      },
      styles: {
        fontSize: 8,
        columnWidth: 'wrap'
      }
    });
    // SEGUNDO BLOQUE
    // let finalY = doc.autoTable.previous.finalY;
    // doc.text(160, finalY - 8, $scope.rgeneral);
    doc.autoTable([{ title: 'FICHA DE RESPONSABLES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY + 6 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 9,
        columnWidth: 'wrap'
      }
    });
    const finalY18 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '1.- ADMISION', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY18 + 2 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 9,
        columnWidth: 'wrap'
      }
    });
    doc.autoTable([{ title: '2.- CAJA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY18 + 90 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 9,
        columnWidth: 'wrap'
      }
    });
    const finalY20 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'PAGO COMPLETO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY20 + 1 },
      columnStyles: {
        cp: { columnWidth: 80 }
      },
      styles: {
        fontSize: 6,
        columnWidth: 'wrap'
      }
    });
    const finalY21 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'PAGO A CUENTA', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY21 + 1 },
      columnStyles: {
        cp: { columnWidth: 80 }
      },
      styles: {
        fontSize: 6,
        columnWidth: 'wrap'
      }
    });
    const finalY22 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: 'SALDO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY22 + 1 },
      columnStyles: {
        cp: { columnWidth: 80 }
      },
      styles: {
        fontSize: 6,
        columnWidth: 'wrap'
      }
    });
    const finalY23 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '3.- A.PROC. EXPEDIENTES', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY23 + 1 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 9,
        columnWidth: 'wrap'
      }
    });
    const finalY24 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '4.- CERTIFICADOS', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY24 + 73 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap'
      }
    });
    const finalY25 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '5.- DIRECTOR', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY25 + 30 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap'
      }
    });
    const finalY26 = doc.autoTable.previous.finalY;
    doc.autoTable([{ title: '6.- ARCHIVO', dataKey: 'cp' }], rows, {
      margin: { horizontal: 466, top: finalY26 + 30 },
      columnStyles: {
        cp: { columnWidth: 129 }
      },
      styles: {
        fontSize: 10,
        columnWidth: 'wrap'
      }
    });

    // FIN SEGUNDO BLOQUE
    doc.save('reporte4.pdf');
  }

  /* constructor(props) {
    console.log("IN")
    console.log(props);
    super(props);
    this.state = {
      item: []
    };
  } */

  render() {
    console.log('hello from FichaInscripcion');
    console.log(localStorage.getItem('username'));

    const { classes } = this.props;
    const {
      name, submitting,
      pristine, reset,
      handleSubmit,
      dni, nombres, aPaterno, aMaterno, selectedDate, domicilio, celTel, sexo,
      departamento, provincia, distrito,
      tipoCurso, de, a, fechaRegistro, currency
    } = this.state;

    // console.log("in test")
    console.log(this.props.item.get('open'));
    console.log(this.props.item.get('toast'));
    console.log(this.props.item.get('toastMessage'));
    console.log(this.props.item);
    const open = this.props.item.get('open');
    const toast = this.props.item.get('toast');
    const toastMessage = this.props.item.get('toastMessage');

    // console.log(this.props.item.get("items"));
    const items = this.props.item.get('items');
    const departamentos = this.props.item.get('departamentos');
    const provincias = this.props.item.get('provincias');
    const distritos = this.props.item.get('distritos');
    const cursos = this.props.item.get('cursos');
    const licencias = this.props.item.get('licencias');
    const numeracion = this.props.item.get('numeracion');
    const lde = this.props.item.get('de');
    const la = this.props.item.get('a');
    // console.log("out test");
    // console.log(items);

    const title = 'Dandelion Pro. Blank Page';
    const description = 'Dandelion Pro';
    return (
      <div>
        <Helmet>
          <title>ECIBAR - Ficha de Inscripción</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />

        </Helmet>
        <PapperBlock title="Fomulario" whiteBg icon="ios-menu-outline" desc="Formulario de Ficha de Inscripción">
          <div>
            <Fragment>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={this.handleClose}
              >
                <MySnackbarContentWrapper
                  onClose={this.handleClose}
                  variant={toast}
                  message={toastMessage}
                />
              </Snackbar>
              <form onSubmit={this.onSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  direction="row"
                  spacing={40}
                >
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name-simple">N° Expediente: </InputLabel>
                    <Input id="numeracion" value={numeracion} />
                  </FormControl>
                  <div className={classes.picker} style={{ margin: 8, padding: 0 }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        keyboard
                        label="Fecha"
                        format="DD/MM/YYYY"
                        placeholder="10/10/2018"
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        value={fechaRegistro}
                        onChange={this.handleFechaRegistroChange}
                        animateYearScrolling={false}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </Grid>
                <Typography variant="h6" className={classes.divider}>1.- DATOS DEL ALUMNO(INFORMACIÓN QUE REGISTRAR ADMISIÓN)</Typography>

                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  direction="row"
                  spacing={24}
                >
                  <Grid
                    item
                    md={4}
                    className={classes.demo}
                  >
                    <TextField
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
                      required
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Nombres"
                      style={{ margin: 8 }}
                      placeholder=""
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={nombres}
                      onChange={this.handleChangeInput('nombres')}
                      required
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Apellido Paterno"
                      style={{ margin: 8 }}
                      placeholder=""
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={aPaterno}
                      onChange={this.handleChangeInput('aPaterno')}
                      required
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Apellido Materno"
                      style={{ margin: 8 }}
                      placeholder=""
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={aMaterno}
                      onChange={this.handleChangeInput('aMaterno')}
                      required
                    />
                    <div className={classes.picker} style={{ margin: 8, padding: 0 }}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                          keyboard
                          label="Fecha de Nacimiento"
                          format="DD/MM/YYYY"
                          placeholder="10/10/2018"
                          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                          value={selectedDate}
                          onChange={this.handleDateChange}
                          animateYearScrolling={false}
                        />
                      </MuiPickersUtilsProvider>
                    </div>

                  </Grid>
                  <Grid
                    item
                    md={4}
                    className={classes.demo}
                  >

                    <TextField
                      id="outlined-multiline-flexible"
                      label="Domicilio"
                      multiline
                      fullWidth
                      style={{ margin: 8 }}
                      rowsMax="4"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={domicilio}
                      onChange={this.handleChangeInput('domicilio')}
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Telefono/Celular"
                      style={{ margin: 8 }}
                      placeholder=""
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={celTel}
                      onChange={this.handleChangeInput('celTel')}
                    />
                    <div className={classes.fieldBasic} style={{ margin: 8 }}>
                      <FormLabel component="label">Sexo</FormLabel>
                      <Field
                        name="sexo"
                        onChange={this.handleChangeRadio}
                        className={classes.inlineWrap}
                        component={renderRadioGroup}
                      >
                        <FormControlLabel value="m" control={<Radio />} label="Masculino" />
                        <FormControlLabel value="f" control={<Radio />} label="Femenino" />
                      </Field>
                    </div>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    className={classes.demo}
                  >
                    <Typography variant="subtitle1" style={{ margin: 8 }} className={classes.divider}>Lugar de Nacimiento</Typography>
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      pip
                      install
                      python-pytun
                      label="Departamento"
                      className={classes.textField}
                      value={departamento}
                      onChange={this.handleChangeSelectDep('departamento')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {''}
                      </MenuItem>
                      {departamentos.map(option => (

                        <MenuItem key={option.get('id')} value={option.get('id')}>
                          {option.get('name')}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="Provincia"
                      className={classes.textField}
                      value={provincia}
                      onChange={this.handleChangeSelectProv('provincia')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {'Seleccione'}
                      </MenuItem>
                      {provincias.map(option => (
                        <MenuItem key={option.get('id')} value={option.get('id')}>
                          {option.get('name')}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="Distrito"
                      className={classes.textField}
                      value={distrito}
                      onChange={this.handleChangeSelect('distrito')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {'Seleccione'}
                      </MenuItem>
                      {distritos.map(option => (
                        <MenuItem key={option.get('id')} value={option.get('id')}>
                          {option.get('name')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Typography variant="h6" className={classes.divider}>2.- TIPO DE CURSO(INFORMACIÓN QUE REGISTRA ADMISIÓN)</Typography>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  direction="row"
                  spacing={24}
                >

                  <Grid
                    item
                    md={4}
                    className={classes.demo}
                  >

                    <TextField
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="Tipo de Curso"
                      className={classes.textField}
                      value={tipoCurso}
                      onChange={this.handleChangeSelectCurso('tipoCurso')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {'Seleccione'}
                      </MenuItem>
                      {cursos.map(option => (
                        <MenuItem key={option.get('_id')} value={option.get('_id')}>
                          {option.get('nombre')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    className={classes.demo}
                  >

                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="De"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      value={de}
                      onChange={this.handleChangeSelectDe('de')}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {'Seleccione'}
                      </MenuItem>
                      {lde.map(option => (
                        <MenuItem key={option.get('_id')} value={option.get('_id')}>
                          {option.get('nombre')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    className={classes.demo}
                  >
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="A"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      value={a}
                      onChange={this.handleChangeSelect('a')}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {'Seleccione'}
                      </MenuItem>
                      {la.map(option => (
                        <MenuItem key={option.get('_id')} value={option.get('_id')}>
                          {option.get('nombre')}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="flex-end"
                  direction="row"
                  spacing={24}
                >
                  <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                    Submit
                  </Button>
                  <Button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
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

// console.log(Test.propTypes);
FichaInscripcion.propTypes = {
  getItems: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};
// console.log(state);
const mapStateToProps = state => ({
  item: state.get('item'),
});
// export default Test;
export default reduxForm({
  form: 'ficha_inscripcion'
})(connect(
  mapStateToProps,
  {
    getItems,
    deleteItem,
    getDepartamentos,
    getProvincias,
    getDistritos,
    getCursos,
    getLicencias,
    addFichaInscripcion,
    getEstado,
    changeStateToast,
    getCursosLicencias,
    changeStateDe,
    changeStateA
  }
)(withStyles(styles)(FichaInscripcion)));
