import { fromJS, List } from 'immutable';
import { GET_EXPEDIENTES } from '../actions2/types';

const initialState = {
  expedientes: List([]),
  loading: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_EXPEDIENTES:
      return state.withMutations(mutableState => {
        const expedientes = action.payload;
        mutableState
          .set('expedientes', expedientes)
          .set('loading', fromJS(false));
      });

    default:
      return state;
  }
}
