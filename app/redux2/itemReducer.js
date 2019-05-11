import { fromJS, List } from 'immutable';
import {
  GET_ITEMS,
  GET_DEPARTAMENTOS,
  GET_PROVINCIAS,
  GET_DISTRITOS,
  GET_CURSOS,
  GET_LICENCIAS,
  ADD_FICHA_INSCRIPCION,
  GET_ESTADO,
  CHANGE_STATE_TOAST,
  CHANGE_LIST_A,
  CHANGE_LIST_DE,
  GET_CURSOS_LICENCIAS
}  from '../actions2/types';

const initialState = {
  /* Settings for Themes and layout */
  items: List([]),
  loading:false,
  departamentos:List([]),
  provincias:List([]),
  distritos:List([]),
  cursos:List([]),
  licencias:List([]),
  cursos_licencias:List([]),
  numeracion:0,
  open:false,
  toast:fromJS('error'),
  de:List([]),
  a:List([]),
  toastMessage:fromJS('Ocurrió un error durante el registro!')
};


const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ITEMS:
      /*return state.withMutations((mutableState) => {
        const items = fromJS(action.payload);
        mutableState
          .set({'items': items,'loading':fromJS(false)});
      });*/
      return state.withMutations((mutableState) => {
        const items = fromJS(action.payload);
        mutableState
          .set('items',fromJS(items))
          .set('loading',fromJS(false));
      });
    case GET_DEPARTAMENTOS:
      return state.withMutations((mutableState) => {
        const departamentos = fromJS(action.payload);
        mutableState
          .set('departamentos',fromJS(departamentos))
          .set('loading',fromJS(false));
      });
    case GET_PROVINCIAS:
      return state.withMutations((mutableState) => {
        const provincias = fromJS(action.payload);
        mutableState
          .set('provincias',fromJS(provincias))
          .set('loading',fromJS(false));
      });
    case GET_DISTRITOS:
      return state.withMutations((mutableState) => {
        const distritos = fromJS(action.payload);
        mutableState
          .set('distritos',fromJS(distritos))
          .set('loading',fromJS(false));
      });
    case GET_CURSOS:
      return state.withMutations((mutableState) => {
        const cursos = fromJS(action.payload);
        mutableState
          .set('cursos',fromJS(cursos))
          .set('loading',fromJS(false));
      });
    case GET_LICENCIAS:
      return state.withMutations((mutableState) => {
        const licencias = fromJS(action.payload);
        mutableState
          .set('licencias',fromJS(licencias))
          .set('loading',fromJS(false));
      });
    case GET_CURSOS_LICENCIAS:
      return state.withMutations((mutableState) => {
        const cls = fromJS(action.payload);
        mutableState
          .set('cursos_licencias',fromJS(cls))
          .set('loading',fromJS(false));
      });
    case ADD_FICHA_INSCRIPCION:
      return state.withMutations((mutableState) => {
        if(action.payload){
          mutableState
          .set('toast',fromJS('success'))
          .set('toastMessage',fromJS('Se registró correctamento!'))
          .set('open',fromJS(true));
        }else{
          mutableState
          .set('toast',fromJS('error'))
          .set('toastMessage',fromJS('Ocurrió un error durante el registro!'))
          .set('open',fromJS(true));
        }
      });
    case GET_ESTADO:
      return state.withMutations((mutableState) => {
        const estado = action.payload;
        //console.log(estado)
        mutableState
          .set('numeracion',fromJS(estado.numeracion))
          .set('loading',fromJS(false));
      });
    case CHANGE_STATE_TOAST:
      return state.withMutations((mutableState) => {
        mutableState
          .set('open',fromJS(false));
      });
    case CHANGE_LIST_DE:
      return state.withMutations((mutableState) => {
        const cls = mutableState.get('cursos_licencias');
        //console.log("in change list de");

        var list = [];
       
        cls.forEach( function(valor, indice, array) {
          //console.log(action.payload.curso);
          //console.log(valor.get('licencia_actual').get(0).get('_id'));
          //console.log(find(list,valor.get('licencia_actual').get(0).get('_id')));
          if(action.payload.curso == valor.get('curso')){
            var temp = true;
            for (var i = 0;(i<list.length) && temp;i++){
              console.log(list[i]._id +" = "+ valor.get('licencia_actual').get(0).get('_id'));
              if(list[i]._id == valor.get('licencia_actual').get(0).get('_id')){
                temp = false;
              }
            }
            if(temp){
              list.push({
                "_id":valor.get('licencia_actual').get(0).get('_id') ,
                "nombre":valor.get('licencia_actual').get(0).get('nombre')});
            }
          }
          
        });
        console.log(list);
        mutableState
          .set('de',fromJS(list))
          .set('a',List([]));
      });
    case CHANGE_LIST_A:
      return state.withMutations((mutableState) => {

        const cls = mutableState.get('cursos_licencias');
        console.log("in change list a");
        console.log(action.payload);

        var list = [];
       
        cls.forEach( function(valor, indice, array) {
          //console.log(action.payload.curso);
          //console.log(valor.get('licencia_actual').get(0).get('_id'));
          //console.log(find(list,valor.get('licencia_actual').get(0).get('_id')));
          if(action.payload.curso == valor.get('curso') && 
              action.payload.de == valor.get('licencia_actual').get(0).get('_id')){
            var temp = true;
            for (var i = 0;(i<list.length) && temp;i++){
              console.log(list[i]._id +" = "+ valor.get('licencia_postula').get(0).get('_id'));
              if(list[i]._id == valor.get('licencia_postula').get(0).get('_id')){
                temp = false;
              }
            }
            if(temp){
              list.push({
                "_id":valor.get('licencia_postula').get(0).get('_id') ,
                "nombre":valor.get('licencia_postula').get(0).get('nombre')});
            }
          }
          
        });
        console.log(list);
        
        mutableState
          .set('a',fromJS(list));
      });
      /*return {...state,
        items: action.payload,
        loading: false};*/
    default:
      return state;
  }
}
