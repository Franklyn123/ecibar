import axios from "axios";
import { GET_ALUMNOS, ITEMS_LOADING } from "./types";

// Get Alumnos
export const getAlumnos = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/alumno").then(res => {
    dispatch({
      type: GET_ALUMNOS,
      payload: res.data
    });
  });
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
