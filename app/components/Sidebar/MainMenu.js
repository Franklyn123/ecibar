import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Ionicon from 'react-ionicons';
import styles from './sidebar-jss';

class MainMenu extends React.Component {
  handleClick() {
    const { toggleDrawerOpen, loadTransition } = this.props;
    toggleDrawerOpen();
    loadTransition(false);
  }

  render() {
    const {
      classes,
      dataMenu
    } = this.props;
    const loguedUsername = localStorage.getItem('username');

    const getMenus = menuArray => menuArray.map((item, index) => {
      switch (item.key) {
        case 'asistencia':
          if (loguedUsername !== 'octavio' && loguedUsername !== 'administracion') {
            return false;
          }
          break;
        case 'ficha_inscripcion':
          if (loguedUsername !== 'octavio') {
            return false;
          }
          break;
        case 'seguimiento':
          if (loguedUsername !== 'octavio' && loguedUsername !== 'direccion' && loguedUsername !== 'administracion') {
            return false;
          }
          break;
        case 'historialexterno':
          if (loguedUsername !== 'octavio') {
            return false;
          }
          break;
        case 'listarhistorialexterno':
          if (loguedUsername !== 'octavio') {
            return false;
          }
          break;
        case 'Alumnos':
          if (loguedUsername !== 'octavio') {
            return false;
          }
          break;
        case 'instructores':
          if (loguedUsername !== 'octavio') {
            return false;
          }
          break;
        default:
          return true;
      }
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classes.nested}
          activeClassName={classes.active}
          component={NavLink}
          to={item.link}
          onClick={() => this.handleClick()}
        >
          {item.icon && (
            <ListItemIcon className={classes.icon}>
              <Ionicon icon={item.icon} />
            </ListItemIcon>
          )}
          <ListItemText classes={{ primary: classes.primary }} inset primary={item.name} />
          {item.badge && (
            <Chip color="primary" label={item.badge} className={classes.badge} />
          )}
        </ListItem>
      );
    });
    return (
      <div>
        {getMenus(dataMenu)}
      </div>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  // open: PropTypes.object.isRequired,
  // openSubMenu: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = state => ({
  force: state, // force active class for sidebar menu
  open: state.getIn([reducer, 'subMenuOpen'])
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withTheme()(withStyles(styles)(MainMenuMapped));
