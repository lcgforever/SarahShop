import { Map } from 'immutable';
import { SHOW_MESSAGE, HIDE_MESSAGE } from '../actions/index';

const INITIAL_STATE = Map({
  showMessage: false,
  message: ''
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
    return state.set('showMessage', true).set('message', action.payload);

    case HIDE_MESSAGE:
    return state.set('showMessage', false).set('message', '');

    default:
    return state;
  }
}
