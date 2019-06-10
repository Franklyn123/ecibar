import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { getAlumnos } from "../../actions2/alumnoAction";

const styles = theme => ({
  table: {
    "& > div": {
      overflow: "auto"
    },
    "& table": {
      minWidth: 500,
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40
        }
      }
    }
  }
});

class Alumnos extends React.Component {
  state = {
    columns: [
      {
        name: "DNI",
        options: {
          filter: true
        }
      },
      {
        name: "Nombres",
        options: {
          filter: true
        }
      },
      {
        name: "Apellido Paterno",
        options: {
          filter: true
        }
      },
      {
        name: "Apellido Materno",
        options: {
          filter: true
        }
      },
      {
        name: "Celular",
        options: {
          filter: true
        }
      },
      {
        name: "Domicilio",
        options: {
          filter: false
        }
      }
    ]
  };

  componentDidMount() {
    this.props.getAlumnos();

    const loguedUsername = localStorage.getItem("username");
    if (!loguedUsername) {
      window.location.href = "/login";
    } else if (loguedUsername !== "octavio" &&
    loguedUsername !== "administracion") {
      window.location.href = "/not-found";
    }
  }

  render() {
    const { columns } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 1
    };

    let alumnos = [];
    this.props.alumno.get("alumnos").map(alumno => {
      alumnos.push([
        alumno.dni,
        alumno.nombres,
        alumno.a_paterno,
        alumno.a_materno,
        alumno.cel_tel,
        alumno.domicilio
      ]);
      return true;
    });

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Alumnos"
          data={alumnos}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

Alumnos.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  alumno: state.get("alumno")
});
export default connect(
  mapStateToProps,
  { getAlumnos }
)(withStyles(styles)(Alumnos));
