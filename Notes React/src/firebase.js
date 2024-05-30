import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAwHXJLCs-FZ_PhC7V_UTeu8BqQyT-QrdI",
    authDomain: "notes-with-react.firebaseapp.com",
    projectId: "notes-with-react",
    storageBucket: "notes-with-react.appspot.com",
    messagingSenderId: "203667992422",
    appId: "1:203667992422:web:d1443c76032eedd20a22a7",
    databaseURL : "https://notes-with-react-default-rtdb.firebaseio.com",
  };

  export const app = initializeApp(firebaseConfig);