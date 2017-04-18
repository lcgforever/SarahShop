import { Map } from 'immutable';
import { LOAD_ALL_DATA_STARTED, LOAD_ALL_DATA_FINISHED } from '../actions/index';

const INITIAL_STATE = Map({
  productDataMap: {},
  loading: false
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ALL_DATA_STARTED:
    return state.set('loading', true);
    break;

    case LOAD_ALL_DATA_FINISHED:
    return state.set('loading', false)
    .set('productDataMap', action.data.products);

    default:
    return state;
  }
}
