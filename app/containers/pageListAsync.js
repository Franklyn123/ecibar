import Loadable from 'react-loadable';
import Loading from 'dan-components/Loading';
// Other
export const Error = Loadable({
  loader: () => import('./Pages/Error'),
  loading: Loading,
});

export const Parent = Loadable({
  loader: () => import('./Parent'),
  loading: Loading,
});

export const Test = Loadable({
  loader: () => import('./Ecibar/Test'),
  loading: Loading,
});
export const FichaInscripcion = Loadable({
  loader: () => import('./Ecibar/FichaInscripcion'),
  loading: Loading,
});
export const Asistencia = Loadable({
  loader: () => import('./Ecibar/Asistencia'),
  loading: Loading,
});
export const Seguimiento = Loadable({
  loader: () => import('./Ecibar/Seguimiento'),
  loading: Loading,
});

export const HistorialExt = Loadable({
  loader: () => import('./Ecibar/historialExterno'),
  loading: Loading,
});

export const ListarHistorialExterno = Loadable({
  loader: () => import('./Ecibar/ListHistorialExterno'),
  loading: Loading,
});

export const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});

export const Alumnos = Loadable({
  loader: () => import('./Ecibar/Alumnos'),
  loading: Loading,
});

export const Instructores = Loadable({
  loader: () => import('./Ecibar/Instructores'),
  loading: Loading,
});

export const Login = Loadable({
  loader: () => import('./Ecibar/LoginApp'),
  loading: Loading,
});

export const NotFound2 = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: Loading,
});
