/**
 * ex)
 * 31/12/2020 => new Date(2020/12/31)
 * 18 day 03 month 2020 year => new Date(2020/03/18)
 */

import { isNaN } from "../Number/isNaN";

// format 
const formatStr = ["Y", "M", "D"];
const format = 'DD/MM/YYYY';
const formatSplitted = format.split(new RegExp('[^' + formatStr.join('') + ']+','g')); // ['DD', 'MM', 'YYYY']
const dateLimitCount = formatSplitted.join('').length; // DD/MM/YYYY => 8

const formatInfo = formatSplitted.map((val, i) => ({
  letter: val, // 'DD' | 'MM' | 'YYYY'
  count: val.length,
  order: val.includes('Y') ? 1 : val.includes('M') ? 2 : 3,
  captureOrder: '$' + (i + 1)
}));


let regExp = '/';
formatInfo.forEach(val => {
  regExp += `(\\d{${val.count}})/`
});
regExp = regExp.replace(/\//g, '.*'); // .*(\d{2}).*(\d{2}).*(\d{4}).*


const ymdSorted = formatInfo.sort((a,b) => a.order - b.order) // Y, M, D order
const order = ymdSorted.map(val => `${val.captureOrder}`).join('/') // $3/$2/$1

const isOver = (value) => dateLimitCount < value.match(/[0-9]/g).length;
const isLess = (value) => value.match(/[0-9]/g).length < dateLimitCount;

let oldValue = ''
const input = document.getElementById('foo') // <input id='foo' />
input.addEventListener('input', (e) => {
  const targetValue = e.target.value

  if(e.data === null || isLess(targetValue)) {
    oldValue = targetValue
    return
  }
  
  if(isOver(targetValue)) {
    input.value = oldValue
    return
  }
  
  // targetValue.replace(/.*(\d{2}).*(\d{2}).*(\d{4}).*/, "$3/$2/$1")
  var date = new Date(targetValue.replace(new RegExp(regExp), order))
  if(isNaN(date)){ console.log('Invalid date!!!!!!!!!') }
  
  oldValue = targetValue
})