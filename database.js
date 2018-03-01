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
const userposts=  firebase.database().ref('userposts');
const healthposts = firebase.database().ref('posts/health');
const workposts = firebase.database().ref('posts/work');
const schoolposts = firebase.database().ref('posts/school');
const socialposts = firebase.database().ref('posts/social');
const posts = firebase.database().ref('posts');
const replies = firebase.database().ref('replies');
const firebaseauth=firebase.auth()


module.exports={
   firebaseauth:firebaseauth,
   users:users,
   posts:posts,
   healthposts:healthposts,
   workposts:workposts,
   socialposts:socialposts,
   replies:replies,
   schoolposts:schoolposts,
   userposts:userposts
}