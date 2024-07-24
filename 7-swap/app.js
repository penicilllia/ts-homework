"use strict";
function swapKeysAndValues(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        result[value] = key;
    });
    return result;
}
function swapKeysAndValues2(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        // if (value) {
        result[String(value)] = key;
        // }
    });
    return result;
}
const obj1 = { A: 1, B: 2 };
const obj2 = { A: '1', B: '2' };
const obj3 = { 'A': '1', 'B': '2' };
const obj4 = { 'A': null, 'B': undefined };
console.log(swapKeysAndValues2(obj1));
console.log(swapKeysAndValues2(obj2));
console.log(swapKeysAndValues2(obj3));
console.log(swapKeysAndValues2(obj4));
