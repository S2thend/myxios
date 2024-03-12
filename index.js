function paramCarryPromise (param, promise){
    return promise.then( res => Promise.resolve([ ...param, ...res ]) )
}

function HttpHandlerTest( fetch_req, url, options, interceptorfuncs ){

    interceptorfuncs.forEach((element) => Promise.resolve(element));

    return interceptorfuncs.reduce(
        (prev, cur)=>{
            return prev.then(
                data => {
                    return paramCarryPromise(data, cur)
                }
            )
        },
        fetch_req
    )
}

module.exports= {
    HttpHandlerTest
}