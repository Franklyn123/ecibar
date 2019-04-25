import { fromJS, List } from 'immutable';
import {
    GET_ALUMNOS_EN_PROCESO,
    MARCAR_ASISTENCIA
}  from '../actions2/types';

const initialState = {
  /* Settings for Themes and layout */
  alumnos: List([]),
  loading:false,
};


const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ALUMNOS_EN_PROCESO:
      return state.withMutations((mutableState) => {
          const alumnos = fromJS(action.payload);
          mutableState
          .set('alumnos',alumnos)
          .set('loading',fromJS(false));
      });
    case MARCAR_ASISTENCIA:
      return state.withMutations((mutableState) => {
          const alumnos =mutableState.get('alumnos').filter(item => item.get('numeracion') !== action.payload);
          mutableState
          .set('alumnos',alumnos)
          .set('loading',fromJS(false));
      });
    
    default:
      return state;
  }
}
