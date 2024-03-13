import dispatchRequest from './dispatchRequest.js'
import test from 'node:test';

test('dispatchRequest.js test ', () => {

    const fetch = (code,data) => Promise.resolve({ status: code, body:data })

    const notAuthorizedInterceptor = (res) => {
    
        if (res.status === 401) {
                return fetch(200, "refresh").then(
                    res => {
                        if (res.status === 200) {
                            return res
                        }
                    }
                )
        }
        return Promise.resolve(res)
    }


    dispatchRequest(fetch(401,"not auth"), [notAuthorizedInterceptor]).then(
        res => {
            assert.deepStrictEqual(res, { status: 200, body: "refresh" })
        }
    )

    dispatchRequest(fetch(200,"success"),  [notAuthorizedInterceptor]).then(
        res => {
            assert.deepStrictEqual(res, { status: 200, body: "success" })
        }
    )

})