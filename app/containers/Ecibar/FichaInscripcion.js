import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import { PapperBlock } from "dan-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";
import MomentUtils from "@date-io/moment";
import RadioGroup from "@material-ui/core/RadioGroup";

import { Field, reduxForm } from "redux-form/immutable";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// bottom
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

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
} from "../../actions2/itemActions";
const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const styles = theme => ({
  demo: {
    height: "auto"
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  input: {
    margin: theme.spacing.unit * 3
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    display: "flex",
    flexDirection: "row"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  }
});
// export const AppContext = React.createContext();
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}
const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    toast: "error",
    toastMessage: "Error",
    open: false,
    name: "Composed TextField",
    currency: "",
    fechaRegistro: new Date(),
    dni: "",
    nombres: "",
    aPaterno: "",
    aMaterno: "",
    selectedDate: new Date(),
    domicilio: "",
    celTel: "",
    sexo: "",
    departamento: "040000",
    provincia: "-1",
    distrito: "-1",
    tipoCurso: "-1",
    de: "-1",
    a: "-1"
  };

  handleClick = () => {};

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.changeStateToast();
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.tipoCurso != "-1" &&
      this.state.de != "-1" &&
      this.state.a != "-1"
    ) {
      this.props.addFichaInscripcion(this.state);
    }
    window.location.reload();
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleFechaRegistroChange = date => {
    this.setState({ fechaRegistro: date });
  };

  selectLocale = selectedLocale => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

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
      [name]: event.target.value
    });
  };

  handleChangeSelectCurso = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.setState({
      a: "-1"
    });
    this.setState({
      de: "-1"
    });
    console.log("in handle change select curso");
    this.props.changeStateDe({ curso: event.target.value });
  };

  handleChangeSelectDe = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.setState({
      a: "-1"
    });
    console.log("in handle change select de");
    console.log({ curso: this.state.tipoCurso, de: event.target.value });
    this.props.changeStateA({
      curso: this.state.tipoCurso,
      de: event.target.value
    });
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeSelectDep = name => event => {
    console.log(name);
    this.setState({
      [name]: event.target.value
    });
    this.setState({
      provincia: "-1"
    });
    this.setState({
      distrito: "-1"
    });
    this.props.getProvincias(event.target.value);
    this.props.getDistritos("-1");
  };

  handleChangeSelectProv = name => event => {
    console.log(name);
    this.setState({
      [name]: event.target.value
    });
    this.setState({
      distrito: "-1"
    });
    this.props.getDistritos(event.target.value);
  };

  handleChangeRadio = event => {
    this.setState({
      sexo: event[0]
    });
  };

  componentDidMount() {
    this.props.getItems();
    this.props.getDepartamentos();
    this.props.getProvincias("040000");
    this.props.getCursos();
    this.props.getLicencias();
    this.props.getEstado();
    this.props.getCursosLicencias();
    const loguedUsername = localStorage.getItem("username");

    if (!loguedUsername) {
      window.location.href = "/login";
    } else if (
      loguedUsername !== "octavio" &&
      loguedUsername !== "administracion"
    ) {
      window.location.href = "/not-found";
    }
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      submitting,
      pristine,
      reset,
      handleSubmit,
      dni,
      nombres,
      aPaterno,
      aMaterno,
      selectedDate,
      domicilio,
      celTel,
      sexo,
      departamento,
      provincia,
      distrito,
      tipoCurso,
      de,
      a,
      fechaRegistro,
      currency
    } = this.state;

    // console.log("in test")
    console.log(this.props.item.get("open"));
    console.log(this.props.item.get("toast"));
    console.log(this.props.item.get("toastMessage"));
    console.log(this.props.item);
    const open = this.props.item.get("open");
    const toast = this.props.item.get("toast");
    const toastMessage = this.props.item.get("toastMessage");

    // console.log(this.props.item.get("items"));
    const items = this.props.item.get("items");
    const departamentos = this.props.item.get("departamentos");
    const provincias = this.props.item.get("provincias");
    const distritos = this.props.item.get("distritos");
    const cursos = this.props.item.get("cursos");
    const licencias = this.props.item.get("licencias");
    const numeracion = this.props.item.get("numeracion");
    const lde = this.props.item.get("de");
    const la = this.props.item.get("a");
    // console.log("out test");
    // console.log(items);

    const title = "ECIBAR S.A.C.. Blank Page";
    const description = "ECIBAR S.A.C.";
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
        <PapperBlock
          title="Fomulario"
          whiteBg
          icon="ios-menu-outline"
          desc="Formulario de Ficha de Inscripción"
        >
          <div>
            <Fragment>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
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
                    <InputLabel htmlFor="name-simple">
                      N° Expediente:{" "}
                    </InputLabel>
                    <Input id="numeracion" value={numeracion} />
                  </FormControl>
                  <div
                    className={classes.picker}
                    style={{ margin: 8, padding: 0 }}
                  >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        keyboard
                        label="Fecha"
                        format="DD/MM/YYYY"
                        placeholder="10/10/2018"
                        mask={[
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/
                        ]}
                        value={fechaRegistro}
                        onChange={this.handleFechaRegistroChange}
                        animateYearScrolling={false}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </Grid>
                <Typography variant="h6" className={classes.divider}>
                  1.- DATOS DEL ALUMNO(INFORMACIÓN QUE REGISTRAR ADMISIÓN)
                </Typography>

                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  direction="row"
                  spacing={24}
                >
                  <Grid item md={4} className={classes.demo}>
                    <TextField
                      label="DNI"
                      style={{ margin: 8 }}
                      placeholder=""
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={dni}
                      onChange={this.handleChangeInput("dni")}
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
                        shrink: true
                      }}
                      value={nombres}
                      onChange={this.handleChangeInput("nombres")}
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
                        shrink: true
                      }}
                      value={aPaterno}
                      onChange={this.handleChangeInput("aPaterno")}
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
                        shrink: true
                      }}
                      value={aMaterno}
                      onChange={this.handleChangeInput("aMaterno")}
                      required
                    />
                    <div
                      className={classes.picker}
                      style={{ margin: 8, padding: 0 }}
                    >
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                          keyboard
                          label="Fecha de Nacimiento"
                          format="DD/MM/YYYY"
                          date={new Date("01-01-2000")}
                          mask={[
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/
                          ]}
                          value={selectedDate}
                          onChange={this.handleDateChange}
                          animateYearScrolling={false}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item md={4} className={classes.demo}>
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
                        shrink: true
                      }}
                      value={domicilio}
                      onChange={this.handleChangeInput("domicilio")}
                    />
                    <TextField
                      id="outlined-full-width"
                      label="Telefono/Celular"
                      style={{ margin: 8 }}
                      placeholder=""
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={celTel}
                      onChange={this.handleChangeInput("celTel")}
                    />
                    <div className={classes.fieldBasic} style={{ margin: 8 }}>
                      <FormLabel component="label">Sexo</FormLabel>
                      <Field
                        name="sexo"
                        onChange={this.handleChangeRadio}
                        className={classes.inlineWrap}
                        component={renderRadioGroup}
                      >
                        <FormControlLabel
                          value="m"
                          control={<Radio />}
                          label="Masculino"
                        />
                        <FormControlLabel
                          value="f"
                          control={<Radio />}
                          label="Femenino"
                        />
                      </Field>
                    </div>
                  </Grid>

                  <Grid item md={4} className={classes.demo}>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: 8 }}
                      className={classes.divider}
                    >
                      Lugar de Nacimiento
                    </Typography>
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      label="Departamento"
                      className={classes.textField}
                      value={departamento}
                      onChange={this.handleChangeSelectDep("departamento")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {""}
                      </MenuItem>
                      {departamentos.map(option => (
                        <MenuItem
                          key={option.get("id")}
                          value={option.get("id")}
                        >
                          {option.get("name")}
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
                      onChange={this.handleChangeSelectProv("provincia")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {"Seleccione"}
                      </MenuItem>
                      {provincias.map(option => (
                        <MenuItem
                          key={option.get("id")}
                          value={option.get("id")}
                        >
                          {option.get("name")}
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
                      onChange={this.handleChangeSelect("distrito")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {"Seleccione"}
                      </MenuItem>
                      {distritos.map(option => (
                        <MenuItem
                          key={option.get("id")}
                          value={option.get("id")}
                        >
                          {option.get("name")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Typography variant="h6" className={classes.divider}>
                  2.- TIPO DE CURSO(INFORMACIÓN QUE REGISTRA ADMISIÓN)
                </Typography>
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-between"
                  direction="row"
                  spacing={24}
                >
                  <Grid item md={4} className={classes.demo}>
                    <TextField
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="Tipo de Curso"
                      className={classes.textField}
                      value={tipoCurso}
                      onChange={this.handleChangeSelectCurso("tipoCurso")}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {"Seleccione"}
                      </MenuItem>
                      {cursos.map(option => (
                        <MenuItem
                          key={option.get("_id")}
                          value={option.get("_id")}
                        >
                          {option.get("nombre")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4} className={classes.demo}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="De"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      value={de}
                      onChange={this.handleChangeSelectDe("de")}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {"Seleccione"}
                      </MenuItem>
                      {lde.map(option => (
                        <MenuItem
                          key={option.get("_id")}
                          value={option.get("_id")}
                        >
                          {option.get("nombre")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4} className={classes.demo}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      fullWidth
                      style={{ margin: 8 }}
                      label="A"
                      className={classes.textField}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      value={a}
                      onChange={this.handleChangeSelect("a")}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key="-1" value="-1">
                        {"Seleccione"}
                      </MenuItem>
                      {la.map(option => (
                        <MenuItem
                          key={option.get("_id")}
                          value={option.get("_id")}
                        >
                          {option.get("nombre")}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
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
Test.propTypes = {
  getItems: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};
// console.log(state);
const mapStateToProps = state => ({
  item: state.get("item")
});
// export default Test;
export default reduxForm({
  form: "ficha_inscripcion"
})(
  connect(
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
  )(withStyles(styles)(Test))
);
