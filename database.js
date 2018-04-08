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
  "project_id": "fir-authtest-f924b",
  "private_key_id": "21127aacb14e3c33531fb2bcadc98f9f18ddb859",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7bTxGbS/2BL4O\nEDWZZGW3sbceOHU2FgALERe1n6vMJY7Peuta4itLRJDY3urcWvito0dI9/MJKenU\nyKssYB+A/f1oWTuIBhv22sDIGGNejfR0QEMiTR4ZfGsJf2H8dpq8SGuDj/fKGlGf\nu6dIGaSQqm7vD4xd5FGL1jhyk+60axIJmO1jrOKhUkBa/3muBWziLzXnA/WHEfkp\nnuTMPFYO8TGEa47u7ONFMsMsUJlYr4XluU2Jamk1yVGA0g6YhfysToHKRttf+7N7\njNmzZNqonlkshVt8gyHGKb4DijpNT679gK28ksPUYOQtr9UtooI0oD9q7f6nOPN6\nw6KkdTM7AgMBAAECggEAAOCSCDLUM2A4cwa8D/bBWwbpphgDgZI6XFj+ofYnnhjS\nzzhQ8UGxHoQjSC3nrmiuTpHvhZjKKWQUhR6CFUH36qLzaEa94Ts48iQw97QeeHf9\nqyzEA6yJofrbW/dIWp+93kff02yxSpzLu28oxLqxbKegs1cfN9nCRGz5nAqIyEQy\nDj5aOe8Kf/jbjHv1OfE+8YXJ9E7wdzJMclR9UHwc6sRxEQNdUMzhQ/ScsuVnWJnp\n8DAlMH1/Gzpt6l/0xyYg0vHg74kRZA4APwpkJYvJmL0QOrnGTf7J7nK/BkWpiBwU\nIK7242sp5o3jq6W8cxpZWXKPfZ0tbGVN9okPXKCBAQKBgQD2SWSypo/cr0o0e12X\nCsZFOVWXDUcjRbjI1WfB+1e+ArQFwkYt1PugH0FEub2EoL8yePmtKeoguD0bCOwI\nZS+AlR9W/FRrNGv8t/ycd6tCaoN+2E+4qu7Gc5zKuSr2YyftT7wl9SsT2vqH5H+y\nSQmdC6FalpY2vz0y+8VeO8SjAQKBgQDC0ZGRyzeldcbfGMa1rEqYvaPeUTtpCx47\nHGkwqvCoe1ZT0Qwge13NoOOTFjosijeH8E4qQ904Kt+w0ciRIaGo9VBK8r7QmhNe\nEG320pUDFoHaFnJWP5uIIf8Ik71R+Z9SZnPprq6ABaglJww/XRCyxxspmNPdZ8Nq\nd+ZeV/2iOwKBgQDAoGKr/+4hEtCc/6gRjJHKbq9styvegJeoLJE8fRMBQCgBIRO2\noRA1Cn0H/aYm53rjRQ8yysed07unO3Ewl8NxdDDQ3gZA2v1i6Zwf3NEL3zb9rL2d\nl8OtX5tQS0c48hC2YVis73ZDz0+HncXqcYmdVQ1cRs8x/p0lFRonO+PuAQKBgQCr\nMSa+u5lxbvZLkuUCPZzrbTFzKWSQYLG29bdFieCh3Ie2bWs/m8iI6gkwdga2nto/\nPR4iq7HYKmyYXy/kwG3jH3Xn9jlQ6yN7s+o9SzygEwYWE0Vznr9YN6945QIm57hl\n2xueS96RJudjhlWP1ILY5ndq7R23X/frNeMcIiwBgwKBgQDitowAQGh/Ebhz5qX8\ndrNtavBr9Xgnj06eXT8rPepHlc0moCTaFKg4CZWz1fmefBeNiLC4G7Bw0Dbp2usk\ni17ouW8E7fbneitsuqXuO573PZEyUCxN8+gs3EzrSt4/RmgFMlCyDfp5lTi2bU61\nD8srDzh6YdpNr5dJU+n/dpBJ1Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-uh4e5@fir-authtest-f924b.iam.gserviceaccount.com",
  "client_id": "116463075878806123458",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uh4e5%40fir-authtest-f924b.iam.gserviceaccount.com"
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-authtest-f924b.firebaseio.com"
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


