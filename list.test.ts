const assert = require('assert').strict
const { duplicatedArray } = require('./js/utils')

const arr = ['1', '2', '3', '4', '5']
const expected = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5']

const action = duplicatedArray(arr)

assert.equal(action, expected)
