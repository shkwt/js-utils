/**
 * always false: NaN === NaN
 * 
 * Number(3) === Number(3) is true
 * Number('a') === Number('a') is not true always
 * @param {*} value is any
 * @returns Boolean
 */
export const isNaN = (value) => {
  if(value === null || value === undefined || value === ' ') return true;
  const n = Number(value);
  return n !== n;
};