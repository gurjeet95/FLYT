const database = require('./database');
module.exports={
    getHomepage:getHomepage,
    registerUser:registerUser,
    loginUser:loginUser,
    getSignuppage:getSignuppage,
    getProfile:getProfile,
    getloginpage:getloginpage,
    getSchoolpage:getSchoolpage,
    getHealthpage:getHealthpage,
    getWorkpage:getWorkpage,
    getSocialpage:getSocialpage
    }






 function getHomepage(req,reply){
     return reply.view('welcome')
}

function getSignuppage(req,reply){
     return reply.view('signup')
}

function getloginpage(req,reply){
     return reply.view('login')
}
function getProfile(req,reply){
     return reply.view('profile')
}
function getSchoolpage(req,reply){
     return reply.view('school')
}
function getWorkpage(req,reply){
     return reply.view('work')
}
function getHealthpage(req,reply){
     return reply.view('health')
}
function getSocialpage(req,reply){
     return reply.view('social')
}
function registerUser(req,reply,source,error){
     let errorMessage = {
        error:"true"
    };
    if(error){
        errorMessage.message = error.data.details[0].message;
        return reply.view('signup',errorMessage);
    }
    let username = req.payload.loginUsername;
    let email = req.payload.loginEmail;
    let password = req.payload.loginPass;
    let user;
   
    database.firebaseauth.createUserWithEmailAndPassword(email, password).then(function(data) {
      console.log("user registered")
      user = database.firebaseauth.currentUser;
      console.log(user.uid)
      let logindata={
          "email":email,
          "password":password
          }
          database.users.child(user.uid).set(logindata,function(error){
       if(error){
            return reply("Data could not be saved");
       }
       else{
           user.updateProfile({
  displayName: username
}).then(function() {
    console.log(user.displayName)
  return reply.view('login',logindata);
}).catch(function(error) {
 console.log("user error")
});

            
       }
    })
    })
    .catch(function(error){
      errorMessage.message = error.message;
      console.log(errorMessage)
      return reply.view('signup',errorMessage);
    })
    }

function loginUser(req,reply){
     let errorMessage = {
        error:"true"
    };
     let email = req.payload.loginEmail;
     let password = req.payload.loginPass;
        database.firebaseauth.signInWithEmailAndPassword(email, password).then(function(data) {
          let user = checkuser();
          let username = user.displayName
          let userinfo ={
              name:username
          }
          return reply.view('page_template');
})
.catch(function(error){
  errorMessage.message = error.message;
  console.log(errorMessage)
   return reply.view('login',errorMessage);
    })
}




//unexported functions

function checkuser(){
  let user = database.firebaseauth.currentUser;
  return user
}

database.firebaseauth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("auth state triggered");
  }
});


