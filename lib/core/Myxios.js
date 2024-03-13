import dispatchRequest from "./dispatchRequest";

/**
 * Create a new instance of myxios
 *
 * @return {Axios} A new instance of myxios
 */
class myxios {
    /**
     * Constructor
     * 
     * @param {Array} response_interceptors An array of response interceptors
     */
    constructor(response_interceptors) {
      this.response_interceptors = [...response_interceptors]
    }
  
    /**
     * Dispatch a request
     *
     * @param {string | URL | globalThis.Request} url The URL to which the request is sent
     * @param {?RequestInit} [options]
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(url, options) {
        return dispatchRequest(fetch(url, options), this.response_interceptors)
    }

    /**
     * Dispatch a request with one-time interceptors
     *
     * @param {string | URL | globalThis.Request} url The URL to which the request is sent
     * @param {?RequestInit} [options]
     * @param {Array} interceptors An array of interceptors
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    requestOneTimeIntercepts(url, options, interceptors) {
        return dispatchRequest(fetch(url, options), interceptors)
    }

    /**
     * Add a response interceptor
     *
     * @param {Function} interceptor The interceptor to be added
     */
    addResponseInterceptor(interceptor) {
      this.response_interceptors.push(interceptor)
    }

    /**
     * Remove a response interceptor
     *
     * @param {Function} interceptor The interceptor to be removed
     */
    removeResponseInterceptor(interceptor) {
        const index = this.response_interceptors.indexOf(interceptor)
        if (index >= 0) {
            this.response_interceptors.splice(index, 1)
        }
    }
}
  
export default myxios