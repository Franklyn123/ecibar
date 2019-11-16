import { fromJS, List } from 'immutable';
import { GET_ALUMNOS } from '../actions2/types';

const initialState = {
  alumnos: List([]),
  loading: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ALUMNOS:
      return state.withMutations(mutableState => {
        const alumnos = action.payload;
        mutableState.set('alumnos', alumnos).set('loading', fromJS(false));
      });

    default:
      return state;
  }
}
