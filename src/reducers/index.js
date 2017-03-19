import { combineReducers } from 'redux-immutable';

import appBarState from './reducer_update_app_bar';
import loadDataState from './reducer_load_all_data';
import messageState from './reducer_update_message';
import orderItemState from './reducer_update_order_item';

const rootReducer = combineReducers({
  appBarState,
  loadDataState,
  messageState,
  orderItemState
});

export default rootReducer;
