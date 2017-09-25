'use strict';

let a = Promise.resolve('a')
let b = Promise.resolve('b')

if (false) {
    a.then(console.log)
} else {
    b.then(console.log)
    console.log('1')
}