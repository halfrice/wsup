const css = require('./app.scss');
// const css = require('./app.css');
// import css from './app.scss';
// import _ from 'lodash';

console.log('hola from app.js');
function wtf() {
  var e = document.createElement('div');
  e.innerHTML = _.join(['lodash','working'],'__');
  return e;
}
document.body.appendChild(wtf());

function createInput(){
  var $input = $('<input type="button" value="jquery" />');
  $input.appendTo($("body"));
}
createInput();

// window.onload = function() {
//   if (window.jQuery) {  
//     // jQuery is loaded  
//     alert("Yeah!");
//   } else {
//     // jQuery is not loaded
//     alert("Doesn't Work");
//   }
// }