import axios from 'axios';
import {
  GET_INSTRUCTORES
} from './types';
// eslint-disable-next-line
export const getInstructores = () => dispatch => {
  axios.get('/api/instructor/hinstructores').then(res => {
    dispatch({
      type: GET_INSTRUCTORES,
      payload: res.data
    });
  });
};
