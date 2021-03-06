import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  Parent,
  Error,
  NotFound,
  NotFound2,
  Test,
  FichaInscripcion,
  Asistencia,
  Seguimiento,
  HistorialExt,
  ListarHistorialExterno,
  Expedientes,
  Alumnos,
  Instructores,
  Vehiculos,
  RENIEC
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app/ecibar" component={Parent} />
          <Route path="/app/ecibar/test" component={Test} />
          <Route
            path="/app/ecibar/ficha-inscripcion"
            component={FichaInscripcion}
          />
          <Route path="/app/ecibar/asistencia" component={Asistencia} />
          <Route path="/app/ecibar/seguimiento" component={Seguimiento} />
          <Route exact path="/app/ecibar/reniec" component={RENIEC} />
          <Route
            path="/app/ecibar/historial-ventas-externas"
            component={HistorialExt}
          />
          <Route
            path="/app/ecibar/listar-historial"
            component={ListarHistorialExterno}
          />
          <Route path="/app/ecibar/expedientes" component={Expedientes} />
          <Route path="/app/ecibar/alumnos" component={Alumnos} />
          <Route path="/app/ecibar/instructores" component={Instructores} />
          <Route path="/app/ecibar/vehiculos" component={Vehiculos} />

          {/* Pages */}
          <Route exact path="/app/pages" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/not-found" component={NotFound2} />
          <Route path="/app/pages/error" component={Error} />

          {/* Default */}
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default Application;
