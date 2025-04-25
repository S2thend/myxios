/**
 * 
 * @param {*} param 
 * @param {Promise} promise 
 * @returns {Promise} promise 
 */
export default function paramCarryPromise (param, promise){
    console.log("param:", param)
    console.log("promise:", promise)
    return promise.then( res => {
            if(Array.isArray(res)){
                return Promise.resolve([ ...param, ...res ])
            }else{
                return Promise.resolve([ ...param, res ])
            }
        }
    )
}