import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAlumnos } from '../../actions2/historialexterno';

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


class ListarHistorialExterno extends React.Component {
  state = {
    columns: [
      {
        name: 'DNI',
        options: {
          filter: true
        }
      },
      {
        name: 'Apellido Paterno',
        options: {
          filter: true,
        }
      },
      {
        name: 'Apellido Materno',
        options: {
          filter: false,
          customBodyRender: (value) => (
            <LinearProgress variant="determinate" color="secondary" value={value} />
          )
        }
      },
      {
        name: 'Nombres',
        options: {
          filter: true,
          customBodyRender: (value) => {
            if (value === 'active') {
              return (<Chip label="Active" color="secondary" />);
            }
            if (value === 'non-active') {
              return (<Chip label="Non Active" color="primary" />);
            }
            return (<Chip label="Unknown" />);
          }
        }
      },
      {
        name: 'Fecha registro expediente',
        options: {
          filter: true,
          customBodyRender: (value) => {
            const nf = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
      },
      {
        name: 'Licencia postula',
        options: {
          filter: true,
          customBodyRender: (value) => {
            const nf = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
      },
      {
        name: 'Licencia actual',
        options: {
          filter: true,
          customBodyRender: (value) => {
            const nf = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
      },
    ],
    data: []
  }

  componentDidMount() {
    const props = { ...this.props };
    props.getAlumnos();
    const loguedUsername = localStorage.getItem('username');

    if (!loguedUsername) {
      window.location.href = '/login';
    } else if (loguedUsername !== 'octavio') {
      window.location.href = '/not-found';
    }
  }

  render() {
    const { columns, data } = this.state;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 10,
      page: 1
    };
    const props = { ...this.props };
    const { classes } = this.props;
    const alumnos = props.historialext.get('alumnos');

    alumnos.map(alumno => {
      let fechaRegistroExpediente = '';
      let licenciaPostula = '';
      let licenciaActual = '';
      if (alumno.expediente) {
        fechaRegistroExpediente = moment(alumno.expediente.fecha_registro_expediente).format('MMM Do YY');
      }
      if (alumno.licencia_postula) {
        licenciaPostula = alumno.licencia_postula.nombre;
      }
      if (alumno.licencia_actual) {
        licenciaActual = alumno.licencia_actual.nombre;
      }
      data.push([alumno.dni, alumno.a_paterno, alumno.a_materno, alumno.nombres, fechaRegistroExpediente, licenciaPostula, licenciaActual]);
      return true;
    });

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Alumnos"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

ListarHistorialExterno.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  historialext: state.get('historialext')
});
export default connect(
  mapStateToProps,
  { getAlumnos }
)(withStyles(styles)(ListarHistorialExterno));
