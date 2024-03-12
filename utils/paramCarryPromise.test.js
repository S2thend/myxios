import paramCarryPromise from './paramCarryPromise.js';
import test from 'node:test';

test('paramCarryPromise test', (t) => {
    paramCarryPromise("hello", Promise.resolve("world")).then( 
        res => assert.strictEqual(res, ["hello", "world"])
    )
});
