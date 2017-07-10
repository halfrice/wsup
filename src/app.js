const css = require('./app.scss');

function testLodash() {
  var e = document.createElement('div');
  e.innerHTML = _.join(['lodash','working'],'__');
  return e;
}
document.body.appendChild(testLodash());

function testJquery(){
  var $input = $('<input type="button" value="jquery" />');
  $input.appendTo($("body"));
}
testJquery();
