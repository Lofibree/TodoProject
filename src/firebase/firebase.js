import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCPDhLubxVgDpHBuo5KGgX_wbEse-crAJI",
  authDomain: "todoproject-d56c8.firebaseapp.com",
  databaseURL: "https://todoproject-d56c8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoproject-d56c8",
  storageBucket: "todoproject-d56c8.appspot.com",
  messagingSenderId: "625888359993",
  appId: "1:625888359993:web:b141d7dfdf18acb5c8ffe8"

}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)