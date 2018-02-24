const joi= require('joi');
const userSchema = {
  loginUsername:joi.string().alphanum().min(6).max(30).required(),
  loginEmail:joi.string().required().email(),
  loginPass:joi.string().min(6).max(20).required()
}
module.exports={
    userSchema:userSchema
}