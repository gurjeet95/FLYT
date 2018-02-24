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
    path: '/loginpage',
    handler:datahandling.getloginpage
  },
  {
    method: 'GET',
    path: '/school',
    handler:datahandling.getSchoolpage
  },
  {
    method: 'GET',
    path: '/work',
    handler:datahandling.getWorkpage
  },
  {
    method: 'GET',
    path: '/social',
    handler:datahandling.getSocialpage
  },
  {
    method: 'GET',
    path: '/health',
    handler:datahandling.getHealthpage
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