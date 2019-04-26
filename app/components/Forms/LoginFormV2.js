/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import styles from "./user-jss";

// validation functions
const required = value => (value == null ? "Required" : undefined);

class LoginFormV2 extends React.Component {
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      propiedades
    } = this.props;
    const { showPassword } = this.state;

    return (
      <Paper className={classNames(classes.sideWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Iniciar sesión
        </Typography>
        <section className={classes.pageFormSideWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextField}
                  placeholder="Usuario"
                  label="Usuario"
                  required
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextField}
                  type={showPassword ? "text" : "password"}
                  label="Contraseña"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>

            <div className={classes.optArea}>
              {propiedades.errorMessage && (
                <p
                  style={{
                    color: "#D8000C",
                    backgroundColor: "#FFBABA"
                  }}
                >
                  {propiedades.errorMessage}
                </p>
              )}
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                type="submit"
              >
                Continuar
                <ArrowForward
                  className={classNames(classes.rightIcon, classes.iconSmall)}
                  disabled={submitting || pristine}
                />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

LoginFormV2.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const LoginFormReduxed = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(LoginFormV2);

const reducerLogin = "login";
const reducerUi = "ui";
const FormInit = connect(state => ({
  force: state,
  initialValues: state.getIn([reducerLogin, "usersLogin"]),
  deco: state.getIn([reducerUi, "decoration"])
}))(LoginFormReduxed);

export default withStyles(styles)(FormInit);
