import { fromJS, List } from 'immutable';
import { GET_INSTRUCTORES } from '../actions2/types';

const initialState = {
  instructores: List([]),
  loading: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_INSTRUCTORES:
      return state.withMutations(mutableState => {
        const instructores = action.payload;
        mutableState
          .set('instructores', instructores)
          .set('loading', fromJS(false));
      });

    default:
      return state;
  }
}
