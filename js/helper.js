const Handlebars =require('handlebars');
Handlebars.registerHelper('substr', function(length, context, options) {
 if ( context.length > length ) {
  return context.substring(0, length) + "...";
 } else {
  return context;
 }
});