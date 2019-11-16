import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import moment from 'moment';
import { getExpedientes } from '../../actions2/expedienteAction';

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

class Expedientes extends React.Component {
  state = {
    columns: [
      {
        name: 'Numero',
        options: {
          filter: true
        }
      },
      {
        name: 'DNI del Alumno',
        options: {
          filter: true
        }
      },
      {
        name: 'Licencia Actual',
        options: {
          filter: true
        }
      },
      {
        name: 'Licencia que Postula',
        options: {
          filter: true
        }
      },

      {
        name: 'Estado',
        options: {
          filter: true,
          customBodyRender: value => {
            if (value === 'R') {
              return <Chip label="Registrado" color="secondary" />;
            }
            if (value === 'T') {
              return <Chip label="Terminado" color="primary" />;
            }
            if (value === 'O') {
              return <Chip label="Observación" color="default"/>
            }
            return <Chip label="Observación" />;
          }
        }
      },
      {
        name: 'Fecha de Registro',
        options: {
          filter: true
        }
      }
    ]
  };

  componentDidMount() {
    this.props.getExpedientes();

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

    const expedientes = [];
    this.props.expediente.get('expedientes').map(expediente => {
      expedientes.push([
        expediente.numeracion,
        expediente.alumno.dni,
        expediente.curso_licencia.licencia_actual.nombre,
        expediente.curso_licencia.licencia_postula.nombre,
        expediente.estado,
        moment(expediente.fecha).format('L')
      ]);
      return true;
    });

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Expedientes"
          data={expedientes}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

Expedientes.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  expediente: state.get('expediente')
});
export default connect(
  mapStateToProps,
  { getExpedientes }
)(withStyles(styles)(Expedientes));
