const { HttpHandlerTest } = require('./index.js')
const assert = require('node:assert')
const { mock, test } = require('node:test')


test('HttpHandlerTest', () => {

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


    HttpHandlerTest(fetch(401,"not auth"), "url", "options", [notAuthorizedInterceptor]).then(
        res => {
            assert.deepStrictEqual(res, { status: 200, body: "refresh" })
        }
    )

    HttpHandlerTest(fetch(200,"success"), "url", "options", [notAuthorizedInterceptor]).then(
        res => {
            assert.deepStrictEqual(res, { status: 200, body: "success" })
        }
    )

})

