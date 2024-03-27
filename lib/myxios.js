import Myxios from './core/Myxios.js';

/**
 * Create an instance of Axios
 *
 * @param {Array} response_interceptors An array of response interceptors
 * 
 * @returns {Myxios} A new instance of Myxios
 */
function createInstance(response_interceptors) {
    const context = new Myxios(response_interceptors);
    Myxios.prototype.request.bind(context);
    return context
}

// Create the default instance to be exported
const myxios = createInstance([])

// Expose Myxios class to allow class inheritance
myxios.Myxios = Myxios

// this module should only have a default export
export default myxios