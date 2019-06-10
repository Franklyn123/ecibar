import axios from 'axios';
import { GET_EXPEDIENTES, ITEMS_LOADING } from './types';

// Get Expedientes
export const getExpedientes = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/expediente').then(res => {
    dispatch({
      type: GET_EXPEDIENTES,
      payload: res.data
    });
  });
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
