const database = require('./database');
module.exports={
    getHomepage:getHomepage,
    getrecoverpage:getrecoverpage,
    registerUser:registerUser,
    loginUser:loginUser,
    recoverpassword:recoverpassword,
    getSignuppage:getSignuppage,
    getProfile:getProfile,
    getloginpage:getloginpage,
    getcategorypage:getcategorypage,
    getsinglepost:getsinglepost,
    post:post,
    postreply:postreply,
    changepassword:changepassword,
    deletereply:deletereply,
    signout:signout,
    deletepost:deletepost,
    getafterloginpage:getafterloginpage
    }

function getHomepage(req,reply){
     return reply.view('welcome')
}

function getafterloginpage(req,reply){
        return reply.view('page_template');
}

function getSignuppage(req,reply){
     return reply.view('signup')
}

function getloginpage(req,reply){const database = require('./database');
module.exports={
    getHomepage:getHomepage,
    getrecoverpage:getrecoverpage,
    registerUser:registerUser,
    loginUser:loginUser,
    recoverpassword:recoverpassword,
    getSignuppage:getSignuppage,
    getProfile:getProfile,
    getloginpage:getloginpage,
    getcategorypage:getcategorypage,
    getsinglepost:getsinglepost,
    post:post,
    postreply:postreply,
    changepassword:changepassword,
    deletereply:deletereply,
    signout:signout,
    deletepost:deletepost,
    getafterloginpage:getafterloginpage
    }

function getHomepage(req,reply){
     return reply.view('welcome')
}

function getafterloginpage(req,reply){
        return reply.view('page_template');
}

function getSignuppage(req,reply){
     return reply.view('signup')
}

function getloginpage(req,reply){
     return reply.view('login')
}

function getrecoverpage(req,reply){
     return reply.view('recover')
}
function getProfile(req,reply){
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let datamessage = {
        "data":"true",
        userid:userid,
        username:username
    }
    getuserposthelper(userid,datamessage,function(err,data){
       if(err){
           return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
    });
    
}

function changepassword(req,reply,source,error){
    let newPassword = req.payload.loginPass;
    let userid = req.payload.useruid;
    let username = req.payload.username;
     let dataMessage = {
        error:"true",
        data:"true",
        userid:userid,
        username:username
    };
     if(error){
        dataMessage.message = error.data.details[0].message;
        getuserposthelper(userid,dataMessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
        });
    }
database.adminauth.updateUser(userid,{
    password:newPassword
}).then(function(data) {
  dataMessage.message="password change successful";
  getuserposthelper(userid,dataMessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
        });
}).catch(function(error) {
  dataMessage.message = error.message;
  getuserposthelper(userid,dataMessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
        });
});
}

function postreply(req,reply){
    let postid = req.params.postid;
    let category = req.params.category;
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let replycontent = req.payload.message;
    let data = {
        "reply":replycontent,
        "postedby":userid,
        "displayname":username
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
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let category = req.params.category;
    let datamessage = {
        "data":"true",
        userid : userid,
        username : username
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
      
      let logindata={
          "email":email,
          "password":password,
          "username":username
          }
        let userid = data.uid;
           database.adminauth.updateUser(userid,{
    displayName:username
}).then(function(data) {
return reply.view('login',logindata);
}).catch(function(error) {
 console.log("user error")
});
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
           let userid = data.uid;
           let username = data.displayName;
           let userinfo ={
               userid : userid,
               username : username
           }
          return reply.view('page_template',userinfo);
})
.catch(function(error){
  errorMessage.message = error.message;
  console.log(errorMessage)
   return reply.view('login',errorMessage);
    })
}


function recoverpassword(req,reply){
     let errorMessage = {
        error:"true"
    };
     let emailAddress = req.payload.loginEmail;
     database.firebaseauth.sendPasswordResetEmail(emailAddress).then(function() {
       errorMessage.data = "true"
    return reply.view('recover',errorMessage);
}).catch(function(error) {
  errorMessage.message = error.message;
   return reply.view('recover',errorMessage);
});

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
    let username = req.payload.username;
    let todaydate = getcurrentdate();
    let todaytime = getcurrenttime();
    let title = req.payload.healthpost_title;
    let content = req.payload.newhealthpost;
    let uid = req.payload.useruid;
    console.log("userid on post "+uid);
    let data={
        "title":title,
        "content":content,
        "postedby":uid,
        "displayname":username,
        "date":todaydate
     }

databasename= getdatabasename(category);

posttodatabase(databasename,data,category,function(err,data1){
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
        "data":"true",
         userid : uid,
        username : username
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


function getcurrentdate(){
    let date = new Date();
    let months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec');
    let weekday = new Array('Sun', 'Mond', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    let curMonth = months[date.getMonth()];
    let dayOfWeek = weekday[date.getDay()];
	let curYear = date.getFullYear();
	let currdate = date.getDate();
	let today=dayOfWeek+" "+currdate+"/"+curMonth+"/"+curYear;
	return today;
}
function getcurrenttime(){
    let date = new Date();
      let hours = (date.getHours()<10?'0':'') + date.getHours();
      let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
      let time = hours+":"+minutes;
      return time;
}


function getsingleposthelper(req,reply){
    let category = req.params.category;
    let postid = req.params.postid;
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let datamessage = {
        "data":"true",
        "category":category,
        userid:userid,
        username:username
    }
    getpostfromdb(category,postid,function(err,data){
        if(err){
            console.log(err);
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

function getcontent(category,callback){
    let databasename = getdatabasename(category);
    databasename.orderByKey().once("value", function(data) {
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
      callback(null,data.val());
   }
   else{
       callback("error");
   }
});
}




function posttodatabase(databasename,data,category,callback){
     let newPostRef = databasename.push();
    let postid = newPostRef.key;
    data.postid=postid;
    data.category=category;
    databasename.child(postid).set(data, function(error) {
  if (error) {
     callback(error);
  } else {
      callback(null,data);
}
});
}

function savetouserposts(data,uid,callback){
    let postkey = data.postid;
    database.userposts.child(uid).child(postkey).set(data,function(error){
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


function getuserposthelper(userid,datamessage,callback){
    database.userposts.child(userid).orderByKey().once("value", function(data) {
     if(data.val()){
         datamessage.posts = data.val();
         callback(null,datamessage);
     }  
     else{
          callback(null,datamessage);
     }
       
    })
}

function deletepost(req,reply){
     let postedby = req.params.postedby;
    let postid = req.params.postid;
    let category = req.params.category;
    let userid = req.payload.useruid;
    let username = req.payload.username;
     database.posts.child(category).child(postid).remove(function(err){
        if(err){
            
        }
        else{
            database.userposts.child(postedby).child(postid).remove(function(err){
               if(err){
                   
               } 
               else{
                   database.replies.child(postid).remove(function(err){
                       if(err){
                           
                       }
                       else{
                            let datamessage = {
        "data":"true",
       userid:userid,
        username:username
    }
    getuserposthelper(userid,datamessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
    });
                       }
                   });
               }
            });
        }
    });
}
function signout(req,reply){
    return reply.view('welcome')
}
     return reply.view('login')
}

function getrecoverpage(req,reply){
     return reply.view('recover')
}
function getProfile(req,reply){
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let datamessage = {
        "data":"true",
        userid:userid,
        username:username
    }
    getuserposthelper(userid,datamessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
    });
    
}

function changepassword(req,reply,source,error){
    let newPassword = req.payload.loginPass;
    let userid = req.payload.useruid;
    let username = req.payload.username;
     let dataMessage = {
        error:"true",
        data:"true",
        userid:userid,
        username:username
    };
     if(error){
        dataMessage.message = error.data.details[0].message;
        getuserposthelper(userid,dataMessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
        });
    }
database.adminauth.updateUser(userid,{
    password:newPassword
}).then(function(data) {
  dataMessage.message="password change successful";
  getuserposthelper(userid,dataMessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
        });
}).catch(function(error) {
  dataMessage.message = error.message;
  getuserposthelper(userid,dataMessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
        });
});
}

function postreply(req,reply){
    let postid = req.params.postid;
    let category = req.params.category;
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let replycontent = req.payload.message;
    let data = {
        "reply":replycontent,
        "postedby":userid,
        "displayname":username
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
    let userid = req.payload.useruid;
    let username = req.payload.username;
    console.log(username);
    let category = req.params.category;
    let datamessage = {
        "data":"true",
        userid : userid,
        username : username
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
      
      let logindata={
          "email":email,
          "password":password,
          "username":username
          }
        let userid = data.uid;
           database.adminauth.updateUser(userid,{
    displayName:username
}).then(function(data) {
return reply.view('login',logindata);
}).catch(function(error) {
 console.log("user error")
});
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
           let userid = data.uid;
           let username = data.displayName;
           let userinfo ={
               userid : userid,
               username : username
           }
          return reply.view('page_template',userinfo);
})
.catch(function(error){
  errorMessage.message = error.message;
  console.log(errorMessage)
   return reply.view('login',errorMessage);
    })
}


function recoverpassword(req,reply){
     let errorMessage = {
        error:"true"
    };
     let emailAddress = req.payload.loginEmail;
     database.firebaseauth.sendPasswordResetEmail(emailAddress).then(function() {
       errorMessage.data = "true"
    return reply.view('recover',errorMessage);
}).catch(function(error) {
  errorMessage.message = error.message;
   return reply.view('recover',errorMessage);
});

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
    let username = req.payload.username;
    let todaydate = getcurrentdate();
    let todaytime = getcurrenttime();
    let title = req.payload.healthpost_title;
    let content = req.payload.newhealthpost;
    let uid = req.payload.useruid;
    console.log("userid on post "+uid);
    let data={
        "title":title,
        "content":content,
        "postedby":uid,
        "displayname":username,
        "date":todaydate
     }

databasename= getdatabasename(category);

posttodatabase(databasename,data,category,function(err,data1){
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
        "data":"true",
         userid : uid,
        username : username
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


function getcurrentdate(){
    let date = new Date();
    let months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec');
    let weekday = new Array('Sun', 'Mond', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    let curMonth = months[date.getMonth()];
    let dayOfWeek = weekday[date.getDay()];
	let curYear = date.getFullYear();
	let currdate = date.getDate();
	let today=dayOfWeek+" "+currdate+"/"+curMonth+"/"+curYear;
	return today;
}
function getcurrenttime(){
    let date = new Date();
      let hours = (date.getHours()<10?'0':'') + date.getHours();
      let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
      let time = hours+":"+minutes;
      return time;
}


function getsingleposthelper(req,reply){
    let category = req.params.category;
    let postid = req.params.postid;
    let userid = req.payload.useruid;
    let username = req.payload.username;
    let datamessage = {
        "data":"true",
        "category":category,
        userid:userid,
        username:username
    }
    getpostfromdb(category,postid,function(err,data){
        if(err){
            console.log(err);
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

function getcontent(category,callback){
    let databasename = getdatabasename(category);
    databasename.orderByKey().once("value", function(data) {
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
      callback(null,data.val());
   }
   else{
       callback("error");
   }
});
}




function posttodatabase(databasename,data,category,callback){
     let newPostRef = databasename.push();
    let postid = newPostRef.key;
    data.postid=postid;
    data.category=category;
    databasename.child(postid).set(data, function(error) {
  if (error) {
     callback(error);
  } else {
      callback(null,data);
}
});
}

function savetouserposts(data,uid,callback){
    let postkey = data.postid;
    database.userposts.child(uid).child(postkey).set(data,function(error){
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


function getuserposthelper(userid,datamessage,callback){
    database.userposts.child(userid).orderByKey().once("value", function(data) {
     if(data.val()){
         datamessage.posts = data.val();
         callback(null,datamessage);
     }  
     else{
          callback("error");
     }
       
    })
}

function deletepost(req,reply){
     let postedby = req.params.postedby;
    let postid = req.params.postid;
    let category = req.params.category;
    let userid = req.payload.useruid;
    let username = req.payload.username;
     database.posts.child(category).child(postid).remove(function(err){
        if(err){
            
        }
        else{
            database.userposts.child(postedby).child(postid).remove(function(err){
               if(err){
                   
               } 
               else{
                   database.replies.child(postid).remove(function(err){
                       if(err){
                           
                       }
                       else{
                            let datamessage = {
        "data":"true",
       userid:userid,
        username:username
    }
    getuserposthelper(userid,datamessage,function(err,data){
       if(err){
            return reply.view('profile',data)
       } 
       else{
           return reply.view('profile',data)
       }
    });
                       }
                   });
               }
            });
        }
    });
}
function signout(req,reply){
    return reply.view('welcome')
}
