import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import { getInstructores } from '../../actions2/instructorAction';

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

class Instructores extends React.Component {
  state = {
    columns: [
      {
        name: 'Nombres',
        options: {
          filter: true
        }
      },
      {
        name: 'Apellido Paterno',
        options: {
          filter: true
        }
      },
      {
        name: 'Apellido Materno',
        options: {
          filter: true
        }
      },
      {
        name: 'Clases de Vehiculos',
        options: {
          filter: true
        }
      },
      {
        name: 'Curso',
        options: {
          filter: true
        }
      }
    ],
    data: []
  };

  componentDidMount() {
    this.props.getInstructores();

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

    const instructores = [];
    this.props.instructor.get('instructores').map(instructor => {
      let clases = '';
      instructor.clases.map(clase => {
        clases = clases + ' ' + clase.nombre;
      });

      instructores.push([
        instructor.nombres,
        instructor.a_paterno,
        instructor.a_materno,
        clases,
        instructor.curso == 'T' ? 'Teoría' : 'Manejo'
      ]);
      return true;
    });

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Instructores"
          data={instructores}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

Instructores.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  instructor: state.get('instructor')
});
export default connect(
  mapStateToProps,
  { getInstructores }
)(withStyles(styles)(Instructores));
