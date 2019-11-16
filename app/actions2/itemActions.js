import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  GET_DEPARTAMENTOS,
  GET_PROVINCIAS,
  GET_DISTRITOS,
  GET_CURSOS,
  GET_LICENCIAS,
  ADD_FICHA_INSCRIPCION,
  GET_ESTADO,
  CHANGE_STATE_TOAST,
  CHANGE_LIST_A,
  CHANGE_LIST_DE,
  GET_CURSOS_LICENCIAS
} from "./types";

export const changeStateToast = () => dispatch => {
  dispatch({
    type: CHANGE_STATE_TOAST
  });
};

export const changeStateDe = data => dispatch => {
  dispatch({
    type: CHANGE_LIST_DE,
    payload: data
  });
};
export const changeStateA = data => dispatch => {
  dispatch({
    type: CHANGE_LIST_A,
    payload: data
  });
};
export const getCursosLicencias = () => dispatch => {
  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get("/api/fi/cursos_licencias").then(res =>
    dispatch({
      type: GET_CURSOS_LICENCIAS,
      payload: res.data
    })
  );
};
export const getItems = () => dispatch => {
  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};
export const getDepartamentos = () => dispatch => {
  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get("/api/fi/departamentos").then(res =>
    dispatch({
      type: GET_DEPARTAMENTOS,
      payload: res.data
    })
  );
};
export const getCursos = () => dispatch => {
  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get("/api/fi/tipo_cursos").then(res =>
    dispatch({
      type: GET_CURSOS,
      payload: res.data
    })
  );
};
export const getEstado = () => dispatch => {
  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get("/api/fi/estado").then(res =>
    dispatch({
      type: GET_ESTADO,
      payload: res.data
    })
  );
};
export const getLicencias = () => dispatch => {
  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.get("/api/fi/tipo_licencias").then(res =>
    dispatch({
      type: GET_LICENCIAS,
      payload: res.data
    })
  );
};

export const getProvincias = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/fi/provincias/${id}`).then(res =>
    dispatch({
      type: GET_PROVINCIAS,
      payload: res.data
    })
  );
};

export const getDistritos = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/fi/distritos/${id}`).then(res =>
    dispatch({
      type: GET_DISTRITOS,
      payload: res.data
    })
  );
};
export const addFichaInscripcion = fi => dispatch => {
  axios.post("/api/fi/ficha_inscripcion", fi).then(res =>
    dispatch({
      type: ADD_FICHA_INSCRIPCION,
      payload: res.data.state
    })
  );
};
export const addItem = item => dispatch => {
  axios.post("/api/items", item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
