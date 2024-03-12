export default function paramCarryPromise (param, promise){
    return promise.then( res => Promise.resolve([ ...param, ...res ]) )
}