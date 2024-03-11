export default function HttpHandlerTest( fecthFunctionOptions, interceptorfuncs ){
    
    const fetch_req = fetch(fecthFunctionOptions)

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


const paramCarryPromise = (param, promise) => promise.then( res => new Promise( (resolve, _) => resolve([ ...param, ...res ])) )
