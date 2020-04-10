import * as firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"
var firebaseConfig = {
  apiKey: "AIzaSyBAiWMB9Zqwh6eZSNG4wJjLATIxLuBMNdc",
  authDomain: "awesome-todo-a2848.firebaseapp.com",
  databaseURL: "https://awesome-todo-a2848.firebaseio.com",
  projectId: "awesome-todo-a2848",
  storageBucket: "awesome-todo-a2848.appspot.com",
  messagingSenderId: "826569914022",
  appId: "1:826569914022:web:6b7af89cba5b05a028a667"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()

let firebaseDb = firebaseApp.database()

export {firebaseAuth, firebaseDb}