// import pcp from './paramCarryPromise';
const test = require('node:test');
const { paramCarryPromise } = require('./paramCarryPromise.js')

test('paramCarryPromise test', (t) => {
    paramCarryPromise("hello", Promise.resolve("world")).then( 
        res => assert.strictEqual(res, ["hello", "world"])
    )
});
