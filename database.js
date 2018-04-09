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
let serviceAccount={
  "type": "service_account",
  "project_id": "fir-authtest-f924b",
  "private_key_id": "76859993afe4bf11df73409c57c1d80e8cc5ffca",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVXA/LWSLl/hHa\naRgsiX7WEOOuTJzzIMS1FC92esKHYFpf+EvQDOEMVeMadhR7Hq+DzkuxG1x41Yvw\n7G4NnGl7bPZY0icLHkstLYsnCcrFBFhaW25BfYkE5gzJnceAr19A39myEXJt+6Vv\nQoayr4cqbfEZnf1JWG3QI9wJBZZLvYV3IIqKihO4Yj9528ubILMaliedLdH2Ri9M\nfhlyLTNYii66sT+FMgY5EUAZlShcjl52JSB9DAodaePa8iFkH9NopFwSJVd2YwW0\nSLu67NdTFb+JWLuxq9eQLdy6pRJVHtLL7Rp/K/RGTkZnxzrRgjEiN/4TS4BZzTzW\nBiKI+iJTAgMBAAECggEAV12/SfFSDQOgo+Ls9y/GNDnuQW01x4jfg5akaMuT5INb\n/nhZ8vOTI833lNpNQK0sCbjr3bXqg8BN8XWfCwvFVbkklvJW8oKRHgrMNEwaL9q7\noyRVXZPeC5d4HQbyroshYhtHtVbXmJm3AHwpU/n0SzeBxo+fK+196gEFFNyo0pIl\nAAddlvsCs1l/agTNjRv3WHmzF7ALUercgdrHddvDj+e8ne4mQSvG0CaCew/q0Yh6\nfrWqQS0aS0WWueNpEoRYsulTW8NOT8cpfO5s1SnzJ+QPrO7D67soozu1LounLvbx\n/HSgYr0AKVlnKhkpXD/QO3v33aSuNwUScq8PcefnoQKBgQD0haIT1nOQVNuppCg+\nzIV3mr4L3T2NZdM5w1WmfT9SoETNVvDreTWxix7XpXrWxCZiT7spkRgRaFizNQin\nntpf+ylHtJuWbKNdIO5B1jZ2Vwj+QY0TZ664Yzc0OD33fMmD2V+WeCRg7Qsph3Ja\nFMXp/T35N2qCJy/MAA76gnSbTwKBgQDfX/UBFD1XfCKzQkvNqCrG/+36FNkASAsI\nVzdk8mFKkoosfLfbBF928h9BodS9QzTuAFS9Wk+rZW7i4z/MXRZVZ5XOczlzUdCD\nGpXLZvTNQjDuwUQwfPnpu2ckpy3Gh5wBaq+8M59qYg/JKb5tX4FIESH57jB6D3qD\nMSXhFMK3vQKBgQCDvV+2SmsWzvFOM5hPRUd/SgqsP7WC8eJck6YYvhAYxypqazX/\n190a27ZxPsGw5hs8CnLvETIjZtGrM56HGKnU3m++J0tQPxXA/hX/uJa9KWU5/z0v\nwEO9Kg86/jY8manEdJ/wZKhM5EmIRWZRrDF5QKxcEgQ7PTueMEXhp9mFNwKBgDES\nBmOXS6Z1WbYhgT+LiuIuhNvkSot6SBor9rpRWLgmGv6M42LUwhgCNoWXhIGTSwRh\nxDvYpBnV7ZcgLvq5FFfsqocw3tULiw/R/kgxtOOGf/NjN5SjT89d4Nm3dCHh1o6l\nHjfs6z9WjXs2lWO3kFIBmYIrJjEaR2KcoGKiyefNAoGAOquV2fm59njtT+9NxPN9\nJPxlxR/vJ4MsE5uRERhVr3Mnp7TTVa1RyjCXVbt7J0rKegVybLX+REH3w7vv86dZ\nQYQDNYmstMHN4AeKxAgq3rCGKUzzZSVMnipVnFUa12tGetyFwZTrI1b2LtEfkBkc\nRSP0LkCY9YKvoJ+JV4LCI5s=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-uh4e5@fir-authtest-f924b.iam.gserviceaccount.com",
  "client_id": "116463075878806123458",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uh4e5%40fir-authtest-f924b.iam.gserviceaccount.com"
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


