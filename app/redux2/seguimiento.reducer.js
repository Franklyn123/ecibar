import { fromJS, List } from 'immutable';
import {
    GET_EXPEDIENTE
}  from '../actions2/types';

const initialState = {
  /* Settings for Themes and layout */
  expediente: null,
  loading:false,
};


const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_EXPEDIENTE:
      return state.withMutations((mutableState) => {
          const expediente = fromJS(action.payload);
          mutableState
          .set('expediente',expediente)
          .set('loading',fromJS(false));
      });
    
    default:
      return state;
  }
}
