import * as Firebase from 'firebase';
import { MENU_TITLE } from '../constants';

// Action type constants
export const UPDATE_APP_BAR = 'UPDATE_APP_BAR';
export const LOAD_ALL_DATA_STARTED = 'LOAD_ALL_DATA_STARTED';
export const LOAD_ALL_DATA_FINISHED = 'LOAD_ALL_DATA_FINISHED';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export const UPDATE_ORDER_ITEM = 'UPDATE_ORDER_ITEM';
export const DELETE_ORDER_ITEM = 'DELETE_ORDER_ITEM';

// Initialize firebase
const config = {
  apiKey: "AIzaSyADLW0M50VtCnnpLiC2GV4MZpEIQeitJSc",
  authDomain: "mojotea-a28a6.firebaseapp.com",
  databaseURL: "https://mojotea-a28a6.firebaseio.com",
  storageBucket: "mojotea-a28a6.appspot.com",
  messagingSenderId: "331300490064"
};
Firebase.initializeApp(config);
const fDatabase = Firebase.database();

export function signInWithFacebook() {
  return (dispatch) => {
    const provider = new Firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    Firebase.auth().getRedirectResult()
    .then((result) => {
      console.log('result: ' + JSON.stringify(result));
      const user = result.user;
      console.log('user: ' + JSON.stringify(user));
      localStorage.signedIn = 'true';
      localStorage.userEmail = user.email;
    })
    .catch((error) => {
      console.log('login failure: ' + error.code + '   ' + error.message);
      dispatch({
        type: SHOW_MESSAGE,
        payload: error.message
      });
    });
    Firebase.auth().signInWithRedirect(provider);
  };
}

export function updateAppBar(newButtonType, newTitle = MENU_TITLE) {
  return {
    type: UPDATE_APP_BAR,
    payload: {
      newButtonType: newButtonType,
      newTitle: newTitle
    }
  }
}

export function loadAllData() {
  return (dispatch) => {
    dispatch({
      type: LOAD_ALL_DATA_STARTED
    });
    fDatabase.ref('data').once('value')
    .then((snapshot) => {
      dispatch({
        type: LOAD_ALL_DATA_FINISHED,
        payload: snapshot.val()
      });
    })
    .catch((error) => {
      showMessage(error.message);
    });
  };
}

export function showMessage(message) {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  }
}

export function updateOrderItem(newOrderItem) {
  return {
    type: UPDATE_ORDER_ITEM,
    payload: newOrderItem
  }
}

export function deleteOrderItem(orderItemIdToBeDeleted) {
  return {
    type: DELETE_ORDER_ITEM,
    payload: orderItemIdToBeDeleted
  }
}
