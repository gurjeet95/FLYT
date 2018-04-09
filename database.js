const firebase = require('firebase');
firebase.initializeApp({
  apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
})

let admin = require("firebase-admin");
let serviceAccount= {
  "type": "service_account",
  "project_id": process.env.projectId,
  "private_key_id": process.env.privatekeyid,
  "private_key": process.env.privatekey,
  "client_email": process.env.clientemail,
  "client_id": process.env.clientid,
  "auth_uri": process.env.authuri,
  "token_uri": process.env.tokenuri,
  "auth_provider_x509_cert_url": process.env.authprovider,
  "client_x509_cert_url": process.env.clienturl
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL
});

const users=  firebase.database().ref('users');
const userposts=  firebase.database().ref('userposts');
const healthposts = firebase.database().ref('posts/health');
const workposts = firebase.database().ref('posts/work');
const schoolposts = firebase.database().ref('posts/school');
const socialposts = firebase.database().ref('posts/social');
const posts = firebase.database().ref('posts');
const replies = firebase.database().ref('replies');
const firebaseauth=firebase.auth();
const adminauth = admin.auth();

module.exports={
    adminauth:adminauth,
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


