import myxios from './lib/myxios.js';

// This module is intended to unwrap default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const {
    Myxios,
} = myxios;

export {
    myxios as default,
    Myxios,
}