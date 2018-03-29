const validation = require('./validation')
const datahandling = require('./datahandling')
let Path = require('path'); 
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler:datahandling.getHomepage
  },
   {
    method: 'GET',
    path: '/join',
    handler:datahandling.getSignuppage
  },
   {
    method: 'GET',
    path: '/homepage',
    handler:datahandling.getafterloginpage
  },
  {
    method: 'GET',
    path: '/signout',
    handler:datahandling.signout
  },
  {
    method: 'GET',
    path: '/loginpage',
    handler:datahandling.getloginpage
  },
  {
    method: 'GET',
    path: '/recoverpage',
    handler:datahandling.getrecoverpage
  },
   {
    method: 'POST',
    path: '/recover',
    handler:datahandling.recoverpassword
  },
  {
    method: 'POST',
    path: '/changepassword',
    handler:datahandling.changepassword,
     config:{
      validate: {
      payload:validation.passSchema,
       failAction:datahandling.changepassword 
      }
      }
  },
  {
    method: 'GET',
    path: '/category/{category}',
    handler:datahandling.getcategorypage
  },
  {
    method: 'GET',
    path: '/get/{category}/{postid}',
    handler:datahandling.getsinglepost
  },
  {
    method: 'POST',
    path: '/category/{category}',
    handler:datahandling.post
  },
  {
    method: 'POST',
    path: '/reply/{category}/{postid}',
    handler:datahandling.postreply
  },
  {
    method: 'GET',
    path: '/delete/{category}/{postid}/{commentid}',
    handler:datahandling.deletereply
  },
   {
    method: 'GET',
    path: '/del/{postedby}/{category}/{postid}',
    handler:datahandling.deletepost
  },
  {
    method: 'POST',
    path: '/signup',
    handler:datahandling.registerUser,
    config:{
      validate: {
      payload:validation.userSchema,
       failAction:datahandling.registerUser 
      }
      }
  },
  {
    method: 'GET',
    path: '/profile',
    handler:datahandling.getProfile
  },
  {
    method: 'POST',
    path: '/login',
    handler:datahandling.loginUser
  },
  {
    method: 'GET',
    path: '/css/{filename}',
   handler: {
        directory: { path: Path.join(__dirname, '/css') }
        }
    },
    {
    method: 'GET',
    path: '/images/{imagename}',
   handler: {
        directory: { path: Path.join(__dirname, '/images') }
        }
    },
    {
    method: 'GET',
    path: '/js/{filename}',
   handler: {
        directory: { path: Path.join(__dirname, '/js') }
        }
    }
]
