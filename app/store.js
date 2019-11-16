import createHistory from 'history/createBrowserHistory';
import configureStore from './redux/configureStore';
const history = createHistory();
//export default history;

const initialState = {};
const store = configureStore(
  initialState,
  history
);

export default store;
