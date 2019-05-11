import axios from 'axios';
import {
  GET_ALUMNOS_EN_PROCESO,
  ITEMS_LOADING,
  MARCAR_ASISTENCIA
} from './types';


export const getAlumnosEnProceso = () => dispatch => {
  // console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get('/api/asistencia/alumnos_en_proceso').then(res => dispatch({
    type: GET_ALUMNOS_EN_PROCESO,
    payload: res.data
  })
  );
};


export const marcarAsistencia = id => dispatch => {
  // console.log("get_item in");
  /* axios.get('/api/fi/alumnos').then(res =>
      dispatch({
        type: GET_ALUMNOS_EN_PROCESO,
        payload: res.data
      })
    ); */
  axios.get(`/api/asistencia/marcar_asistencia/${id}`).then(res => dispatch({
    type: MARCAR_ASISTENCIA,
    payload: id
  })
  );
};
export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
