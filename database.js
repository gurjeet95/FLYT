const firebase = require('firebase');
firebase.initializeApp({
  apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
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
