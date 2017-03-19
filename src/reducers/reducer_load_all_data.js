import { Map } from 'immutable';
import { LOAD_ALL_DATA_STARTED, LOAD_ALL_DATA_FINISHED } from '../actions/index';

const INITIAL_STATE = Map({
  menuDataMap: {},
  toppingDataMap: {},
  zipDataList: [],
  loading: false
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ALL_DATA_STARTED:
    return state.set('loading', true);

    case LOAD_ALL_DATA_FINISHED:
    const data = action.payload;
    return state.set('loading', false)
    .set('menuDataMap', data.menu)
    .set('toppingDataMap', data.topping)
    .set('zipDataList', data.zip);

    default:
    return state;
  }
}
