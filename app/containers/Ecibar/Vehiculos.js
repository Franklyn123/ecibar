import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import { getVehiculos } from '../../actions2/vehiculoAction';

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 40
        }
      }
    }
  }
});

class Vehiculos extends React.Component {
  state = {
    columns: [
      {
        name: 'Placa',
        options: {
          filter: true
        }
      },
      {
        name: 'Clase',
        options: {
          filter: true
        }
      },
      {
        name: 'Kilometraje'
      },
      {
        name: 'Marca',
        options: {
          filter: true
        }
      }
    ]
  };

  componentDidMount() {
    this.props.getVehiculos();

    const loguedUsername = localStorage.getItem('username');
    if (!loguedUsername) {
      window.location.href = '/login';
    } else if (loguedUsername !== 'octavio'
    && loguedUsername !== 'administracion') {
      window.location.href = '/not-found';
    }
  }

  render() {
    const { columns } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 10,
      page: 1
    };

    const vehiculos = [];
    this.props.vehiculo.get('vehiculos').map(vehiculo => {
      vehiculos.push([
        vehiculo.placa,
        vehiculo.clase.nombre,
        vehiculo.km,
        vehiculo.marca
      ]);
      return true;
    });

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Vehiculos"
          data={vehiculos}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

Vehiculos.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  vehiculo: state.get('vehiculo')
});
export default connect(
  mapStateToProps,
  { getVehiculos }
)(withStyles(styles)(Vehiculos));
