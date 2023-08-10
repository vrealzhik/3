const assert = require("assert").strict;
const { duplicatedArray } = require("../js/utils");
// import { suite, test } from '@testdeck/mocha';
// import * as _chai from 'chai';
// import { expect } from 'chai';

// _chai.should();
// _chai.expect;   

// @suite duplicatedArray {
//     private arr: string[];

//     before() {
//         this.arr = ['1', '2', '3', '4', '5']
//     }


    
// }



const arr = ['1', '2', '3', '4', '5'];
const expected = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];

const action = duplicatedArray(arr);

assert.equal(action, expected);