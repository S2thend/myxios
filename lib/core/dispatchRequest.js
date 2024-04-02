import paramCarryPromise from '../helpers/paramCarryPromise.js';

/**
 * Dispatch a request through a chain of interceptors
 *
 * @param {Promise} fetch_req e.g. dispatchRequest(fetch(url, options), response_interceptors)
 * @param {Array} interceptorfuncs
 *
 * @returns {Promise} The Promise to be fulfilled
 */
export default function dispatchRequest( fetch_req, interceptorfuncs ){

    interceptorfuncs.forEach((element) => Promise.resolve(element));

    return interceptorfuncs.reduce(
        (prev, cur)=>{
            return prev.then(
                data => {
                    if (Symbol.iterator in Object(data)) {
                        return paramCarryPromise(data, cur(data))
                    }else{
                        return paramCarryPromise([data], cur([data]))
                    }
                }
            )
        },
        fetch_req
    )
}