const database = require('./database');
module.exports={
    getHomepage:getHomepage,
    registerUser:registerUser,
    loginUser:loginUser,
    getSignuppage:getSignuppage,
    getProfile:getProfile,
    getloginpage:getloginpage,
    getcategorypage:getcategorypage,
    getsinglepost:getsinglepost,
    post:post,
    postreply:postreply,
    deletereply:deletereply,
    testing:testing
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

function postreply(req,reply){
    let postid = req.params.postid;
    let category = req.params.category;
    let userid = getuserid();
    let replycontent = req.payload.message;
    let data = {
        "reply":replycontent,
        "postedby":userid
    }
    savetoreplies(data,category,postid,function(err){
        if(err){
            return reply.view('post_template');
        }
        else{
            getsingleposthelper(req,reply);
        }
    });
            
}

function getcategorypage(req,reply){
    let category = req.params.category;
    let datamessage = {
        "data":"true"
    }
    getcontent(category,function(err,data){
        if(err){
               return reply.view(category,datamessage);
           }
           else{
               datamessage.posts = data;
               return reply.view(category,datamessage);
           }
    });
}

function getsinglepost(req,reply){
    getsingleposthelper(req,reply);
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
          "password":password,
          "username":username
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


function deletereply(req,reply){
    let commentid = req.params.commentid;
    let postid = req.params.postid;
    let category = req.params.category;
    database.replies.child(postid).child(commentid).remove(function(err){
        if(err){
            
        }
        else{
            getsingleposthelper(req,reply);
        }
    });
 }


function post(req,reply){
    let databasename;
    let category = req.params.category;
    let todaydate = getcurrentdate();
    let todaytime = getcurrenttime();
    let title = req.payload.healthpost_title;
    let content = req.payload.newhealthpost;
    let uid = getuserid();
    let data={
        "title":title,
        "content":content,
        "postedby":uid
    }

databasename= getdatabasename(category);

posttodatabase(databasename,data,function(err,data){
    if(err){
        console.log(err);
    }
    else{
        savetouserposts(data,uid,function(err,data){
            if(err){
                console.log(err);
            }
            else{
                let datamessage = {
        "data":"true"
    }
    getcontent(category,function(err,data){
        if(err){
               return reply.view(category,datamessage);
           }
           else{
               datamessage.posts = data;
               return reply.view(category,datamessage);
           }
    });
            }
        });
    }
});
    
}

//unexported functions

function checkuser(){
  let user = database.firebaseauth.currentUser;
  return user
}

function getuserid(){
     let user = database.firebaseauth.currentUser;
  return user.uid;
}

function getcurrentdate(){
    let date = new Date();
    let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    let weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    let curMonth = months[date.getMonth()];
    let dayOfWeek = weekday[date.getDay()];
	let curYear = date.getFullYear();
	let currdate = date.getDate();
	let today=currdate+"/"+curMonth+"/"+curYear+"/"+dayOfWeek;
	return today;
}
function getcurrenttime(){
    let date = new Date();
      let hours = (date.getHours()<10?'0':'') + date.getHours();
      let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
      let time = hours+":"+minutes;
      return time;
}

database.firebaseauth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("auth state triggered");
  }
});

function getsingleposthelper(req,reply){
    let category = req.params.category;
    let postid = req.params.postid;
    let datamessage = {
        "data":"true",
        "category":category
    }
    getpostfromdb(category,postid,function(err,data){
        if(err){
            return reply.view('post_template',datamessage);
        }
        else{
            datamessage.post = data;
            getrepliesfromdb(postid,function(err,data){
                if(err){
                    return reply.view('post_template',datamessage);
                }
                else{
                    datamessage.replies = data;
                    return reply.view('post_template',datamessage);
                }
                
            });
            
        }
    });
}

function testing(req,reply){
    let uid = getuserid();
    database.userposts.child(uid).orderByKey().limitToFirst(5).once("value", function(data) {
  if(data.val()){
     let contacts = data.val();
   if(contacts!=null){
		let keys = Object.keys(contacts);
	for(let i=0;i<keys.length;i++){
    let key= keys[i];
    console.log(contacts[key].postid);
  }
   }
  }
  else{
      console.log("error");
  }
});
}

function getcontent(category,callback){
    let databasename = getdatabasename(category);
    databasename.orderByKey().limitToFirst(5).once("value", function(data) {
  if(data.val()){
      callback(null,data.val());
  }
  else{
     callback("error");
  }
});
}

function getpostfromdb(category,postid,callback){
    let databasename = category+"/"+postid;
    database.posts.child(databasename).once("value", function(data) {
   if(data.val()){
      callback(null,data.val());
   }
   else{
       callback("error");
   }
});
}

function getrepliesfromdb(postid,callback){
    database.replies.child(postid).once("value", function(data) {
   if(data.val()){
       console.log(data.val());
      callback(null,data.val());
   }
   else{
       callback("error");
   }
});
}




function posttodatabase(databasename,data,callback){
     let newPostRef = databasename.push();
    let postid = newPostRef.key;
    data.postid=postid;
    databasename.child(postid).set(data, function(error) {
  if (error) {
     callback(error);
  } else {
      let data={
          "postid":"health/"+postid,
      }
      callback(null,data);
}
});
}

function savetouserposts(data,uid,callback){
    database.userposts.child(uid).push(data,function(error){
      if(error){
            callback(error);
      }  
      else{
           callback(null);
      }
    });
}

function savetoreplies(data,category,postid,callback){
     let newPostRef = database.replies.child(postid).push();
    let commentid = newPostRef.key;
    data.commentid=commentid;
    data.category=category;
    data.postid=postid;
    database.replies.child(postid).child(commentid).set(data,function(error){
      if(error){
            callback(error);
      }  
      else{
           callback(null);
      }
    });
}

function getdatabasename(category){
     if(category=="health"){
    return database.healthposts
}
else if(category=="work"){
    return database.workposts
}
else if(category=="social"){
    return database.socialposts
}

else if(category=="school"){
    return database.schoolposts
}
}



