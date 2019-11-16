import axios from 'axios';
import { GET_INSTRUCTORES, ITEMS_LOADING } from './types';

// Get Instructores
export const getInstructores = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/instructor').then(res => {
    dispatch({
      type: GET_INSTRUCTORES,
      payload: res.data
    });
  });
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
});
