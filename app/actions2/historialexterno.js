import axios from 'axios';
import {
  GET_HISTORIAL_EXTERNO,
  ADD_HISTORIAL_EXTERNO,
  CHANGE_HISTORIAL_EXTERNO,
  DELETE_HISTORIAL_EXTERNO,
  GET_ALUMNOS,
  CHANGE_STATE_TOAST,
  ITEMS_LOADING,
  GET_TRAMITADORES,
  GET_VEHICULOS
} from './types';

export const getHistorialExterno = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/historialexterno/historialext').then(res => {
    console.log(res.data);
    dispatch({
      type: GET_HISTORIAL_EXTERNO,
      payload: res.data
    });
  });
};

export const getTramitadores = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/tramitador/tramitadores').then(res => {
    dispatch({
      type: GET_TRAMITADORES,
      payload: res.data
    });
  });
};

export const changeStateToast = () => dispatch => {
  dispatch({
    type: CHANGE_STATE_TOAST
  });
};

export const postHistorialExterno = historial => dispatch => {
  axios.post('/api/historialexterno/historialext', historial).then(res => {
    dispatch({
      type: ADD_HISTORIAL_EXTERNO,
      payload: res.data
    });
  });
};

// Get Alumnos
export const getAlumnos = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/historialexterno/halumnos').then(res => {
    dispatch({
      type: GET_ALUMNOS,
      payload: res.data
    });
  });
};

// Get Vehiculos
export const getVehiculos = () => dispatch => {
  dispatch(setItemsLoading());

  axios.get('/api/vehiculo').then(res => {
    dispatch({
      type: GET_VEHICULOS,
      payload: res.data
    });
  });
};

export const getAlumnosDetallados = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/historialexterno/alumnosdetallados').then(res => {
    dispatch({
      type: GET_ALUMNOS_DETALLADOS,
      payload: res.data
    });
  });
};

export const putHistorialExterno = historial => dispatch => {
  axios
    .put(`/api/historialexterno/historialext/ ${historial._id}`, historial)
    .then(res => {
      dispatch({
        type: CHANGE_HISTORIAL_EXTERNO,
        payload: res.data
      });
    });
};

export const deleteHistorialExterno = historial => dispatch => {
  axios
    .delete(`/api/historialexterno/historialext/ ${historial._id}`)
    .then(res => {
      dispatch({
        type: DELETE_HISTORIAL_EXTERNO,
        payload: res.data
      });
    });
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
