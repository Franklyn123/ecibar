import { fromJS, List } from 'immutable';
import { GET_HISTORIAL_EXTERNO, GET_ALUMNOS, GET_TRAMITADORES } from '../actions2/types';

const initialState = {
    historiales: List([]),
    alumnos: List([]),
    tramitadores: List([]),
    loading: false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
    switch (action.type) {
        case GET_HISTORIAL_EXTERNO:
            return state.withMutations((mutableState) => {
                const historiales = fromJS(action.payload);
                mutableState
                    .set('historiales', historiales)
                    .set('loading', fromJS(false));
            });
        case GET_ALUMNOS:
            return state.withMutations((mutableState) => {
                const alumnos = action.payload;
                mutableState
                    .set('alumnos', alumnos)
                    .set('loading', false);
            });
        case GET_TRAMITADORES:
            return state.withMutations((mutableState) => {
                const tramitadores = fromJS(action.payload);
                mutableState
                    .set('tramitadores', tramitadores)
                    .set('loading', fromJS(false));
            });
        default:
            return state;
    }
}
