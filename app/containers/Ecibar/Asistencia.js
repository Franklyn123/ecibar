import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { connect } from "react-redux";
import {
  getAlumnosEnProceso,
  marcarAsistencia
} from "../../actions2/asistenciaActions";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 700
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  marcar: {
    width: 128,
    height: 128
  }
});
class Asistencia extends React.Component {
  constructor(props) {
    super(props);
    this.onMarcarAsitenciaClick = this.onMarcarAsitenciaClick.bind(this);
  }

  componentDidMount() {
    const props = { ...this.props };
    props.getAlumnosEnProceso();
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

  onMarcarAsitenciaClick = id => {
    const props = { ...this.props };
    props.marcarAsistencia(id);
  };

  render() {
    const props = { ...this.props };
    const title = brand.name + " - Blank Page";
    const description = brand.desc;
    const alumnos = props.asistencia.get("alumnos");
    return (
      <div>
        <Helmet>
          <title>ECIBAR - Asistencia</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="" desc="">
          {alumnos.map(exp => (
            <Paper
              className={props.classes.paper}
              style={{ marginTop: 8 }}
              key={exp.get("numeracion")}
            >
              <Grid container spacing={16}>
                <Grid item>
                  <ButtonBase className={props.classes.image}>
                    <img
                      className={props.classes.img}
                      alt="complex"
                      src="/images/usuario.png"
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography color="textSecondary">
                        DNI:
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        {exp.get("alumno").get("dni")}
                      </Typography>
                      <Typography color="textSecondary">
                        Apellidos y Nombres:
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        {exp.get("alumno").get("a_paterno")}{" "}
                        {exp.get("alumno").get("a_materno")},{" "}
                        {exp.get("alumno").get("nombres")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ButtonBase
                      className={props.classes.marcar}
                      onClick={e => {
                        e.preventDefault();
                        this.onMarcarAsitenciaClick(exp.get("numeracion"));
                      }}
                    >
                      MARCAR
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </PapperBlock>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  asistencia: state.get("asistencia")
});
export default connect(
  mapStateToProps,
  { getAlumnosEnProceso, marcarAsistencia }
)(withStyles(styles)(Asistencia));
