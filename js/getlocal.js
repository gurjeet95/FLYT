const ls = localStorage;
const userid = ls.getItem("id");
$('.local').each(function(){
  $(this).val(userid);
})
