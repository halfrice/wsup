// const css = require('./app.css');
import app from './app.scss';
import _ from 'lodash';

console.log('herro from app.js');
function wtf() {
  var e = document.createElement('div');
  e.innerHTML = _.join(['inside','wtf()'],'__');
  return e;
}
document.body.appendChild(wtf());