/**
 * 
 * @param {*} param 
 * @param {Promise} promise 
 * @returns {Promise} promise 
 */
export default function paramCarryPromise (param, promise){
    return promise.then( res => Promise.resolve([ ...param, ...res ]) )
}