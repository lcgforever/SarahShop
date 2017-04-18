import * as Firebase from 'firebase';

export const LOAD_ALL_DATA_STARTED = 'LOAD_ALL_DATA_STARTED';
export const LOAD_ALL_DATA_FINISHED = 'LOAD_ALL_DATA_FINISHED';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

// Initialize firebase
const config = {
  apiKey: "AIzaSyClNrsEbCrjTCFXPPYYB5boO6IzPypS-fw",
  authDomain: "sarahshop-c1d30.firebaseapp.com",
  databaseURL: "https://sarahshop-c1d30.firebaseio.com",
  storageBucket: "sarahshop-c1d30.appspot.com",
  messagingSenderId: "639121355006"
};
Firebase.initializeApp(config);
const fDatabase = Firebase.database();

export function loadAllData() {
  return (dispatch) => {
    dispatch({
      type: LOAD_ALL_DATA_STARTED
    });
    fDatabase.ref('data').once('value')
    .then((snapshot) => {
      dispatch({
        type: LOAD_ALL_DATA_FINISHED,
        data: snapshot.val()
      });
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ALL_DATA_FINISHED,
        data: {}
      });
      dispatch(showMessage(error.message));
    })
  };
}

export function showMessage(message) {
  return {
    type: SHOW_MESSAGE,
    data: message
  }
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  }
}
