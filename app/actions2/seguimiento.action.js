import axios from 'axios';
import { 
    GET_EXPEDIENTE,
    ITEMS_LOADING } from './types';


export const getExpediente = ids => dispatch => {

  //console.log("get_item in");
  dispatch(setItemsLoading());
  axios.post(`/api/seguimiento/expediente`,ids).then(res =>
    dispatch({
      type: GET_EXPEDIENTE,
      payload: res.data
    })
  );
};


export const setItemsLoading = () => {
    return {
      type: ITEMS_LOADING
    };
  };
