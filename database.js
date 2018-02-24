const firebase = require('firebase');
firebase.initializeApp({
  apiKey: "AIzaSyATpP3h5gD-X7HYESxNIh_HU6XJ8ut_90k",
    authDomain: "fir-authtest-f924b.firebaseapp.com",
    databaseURL: "https://fir-authtest-f924b.firebaseio.com",
    projectId: "fir-authtest-f924b",
    storageBucket: "fir-authtest-f924b.appspot.com",
    messagingSenderId: "1077121774829"
})
const users=  firebase.database().ref('users');
const firebaseauth=firebase.auth()


module.exports={
   firebaseauth:firebaseauth,
   users:users
}