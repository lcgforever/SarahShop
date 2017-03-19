import Store from '../store.js';
import { signInWithFacebook, loadAllData } from '../actions/index';

export function checkSignInState() {
  if (localStorage.signedIn == 'true') {
    Store.dispatch(loadAllData());
  } else {
    Store.dispatch(signInWithFacebook());
  }
}

export function loadData() {
  Store.dispatch(loadAllData());
}
