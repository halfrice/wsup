// const css = require('./app.css');
// import css from './app.scss';
const css = require('./app.scss');
import _ from 'lodash';

console.log('yooo ayyy from app.js');
function wtf() {
  var e = document.createElement('div');
  e.innerHTML = _.join(['inside','wtf()'],'__');
  return e;
}
document.body.appendChild(wtf());