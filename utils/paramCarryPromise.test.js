// import pcp from './paramCarryPromise';
const test = require('node:test');
const { paramCarryPromise } = require('./paramCarryPromise.js')

test('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    paramCarryPromise("hello", Promise.resolve("world")).then( 
        res => assert.strictEqual(res, ["hello", "world"])
    )
});
