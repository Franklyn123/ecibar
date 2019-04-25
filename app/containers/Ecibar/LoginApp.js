/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { LoginFormV2 } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import axios from 'axios';


class LoginApp extends React.Component {
  state = {
    errorMessage: ''
  }

  submitForm = params => {
    axios.post('/api/tramitador/login', {
      username: params.get('email'),
      password: params.get('password')
    })
      .then((response) => {
        if (response.data.status === true) {
          localStorage.setItem('username', response.data.username);
          window.location.href = '/app';
        }
        this.setState({
          errorMessage: response.data.error
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const title = brand.name + ' - Login Version 2';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.containerSide}>
          <Hidden smDown>
            <div className={classes.opening}>
              <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
              Bienvenido a&nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>Por favor inicie sesión</Typography>
            </div>
          </Hidden>
          {this.props.errorMessage && <p>{this.props.errorMessage}</p>}
          <div className={classes.sideFormWrap}>
            <LoginFormV2 propiedades={{ errorMessage: this.state.errorMessage }} onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

LoginApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginApp);
