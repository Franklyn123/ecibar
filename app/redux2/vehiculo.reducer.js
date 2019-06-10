import { fromJS, List } from 'immutable';
import { GET_VEHICULOS } from '../actions2/types';

const initialState = {
  vehiculos: List([]),
  loading: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_VEHICULOS:
      return state.withMutations(mutableState => {
        const vehiculos = action.payload;
        mutableState.set('vehiculos', vehiculos).set('loading', fromJS(false));
      });

    default:
      return state;
  }
}
