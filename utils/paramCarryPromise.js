function paramCarryPromise (param, promise){
    return promise.then( res => Promise.resolve([ ...param, ...res ]) )
}
module.exports= {
    paramCarryPromise
}