import { Map } from 'immutable';
import { MENU_TITLE, AppBarLeftButtonType } from '../constants';
import { UPDATE_APP_BAR } from '../actions/index';

const INITIAL_STATE = Map({
  appBarLeftButtonType: AppBarLeftButtonType.DRAWER,
  appBarTitle: MENU_TITLE
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_APP_BAR:
    const data = action.payload;
    return state.set('appBarLeftButtonType', data.newButtonType).set('appBarTitle', data.newTitle);

    default:
    return state;
  }
}
