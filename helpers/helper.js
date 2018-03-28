module.exports = function(options,context) {
    let postedby = options;
    let userid = context.data.root.userid;
    if(postedby == userid){
        return true;
    }
    else{
    return null;
    }
}