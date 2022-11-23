import { getApps, initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCPDhLubxVgDpHBuo5KGgX_wbEse-crAJI",
  authDomain: "todoproject-d56c8.firebaseapp.com",
  databaseURL: "https://todoproject-d56c8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoproject-d56c8",
  storageBucket: "todoproject-d56c8.appspot.com",
  messagingSenderId: "625888359993",
  appId: "1:625888359993:web:b141d7dfdf18acb5c8ffe8"

}


export const initMyFirebase = () => {

  if (!getApps().length) {
    const app = initializeApp(firebaseConfig)
    console.log('initialized firebase')
    const auth = getAuth(app)
    return auth
  } else {
    console.log('firebase is already initialized')
  }
}
export const auth = () => {
  const app = initializeApp(firebaseConfig)
  console.log('initialized firebase')
  const auth = getAuth(app)
  return auth
}
