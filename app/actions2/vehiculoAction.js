import axios from "axios";
import { GET_VEHICULOS, ITEMS_LOADING } from "./types";

// Get Vehiculos
export const getVehiculos = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/vehiculo").then(res => {
    dispatch({
      type: GET_VEHICULOS,
      payload: res.data
    });
  });
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
