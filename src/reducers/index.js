import { combineReducers } from 'redux-immutable';

import loadDataState from './reducer_load_all_data';
import messageState from './reducer_update_message';

const rootReducer = combineReducers({
  loadDataState,
  messageState
});

export default rootReducer;
