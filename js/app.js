$(function(){
$("#settings").click(function(){
    var selector=$(this).data("target");
    var list=$('#options li');
    var link=$('#options li a');
    $(selector).toggleClass('in');
    $(list).toggleClass('fade');
    // $(link).toggleClass('in');
    
}) 

});