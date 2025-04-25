# myxios
[![npm badge](https://img.shields.io/badge/npm-0.8.1-blue.svg)](https://www.npmjs.com/package/myxios)
[![compatibility badge](https://img.shields.io/badge/compatibility->=ES6-blue.svg)](https://shields.io/)
[![gzipped_size badge](https://img.shields.io/badge/gzipped_size-1.2_kB-red.svg)](https://shields.io/)
[![License badge](https://img.shields.io/badge/License-Apache2.0-<COLOR>.svg)](https://shields.io/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

A modern, fetch based, axios inspired light-weight javascript request library

It makes handling requests easy with the same api as fetch. It is super easy with those who are familiar with fetch.

## Quick Examples

### use a one time interceptor
to refresh token is a common scene in frontend dev, 
here we will use a jwt token refresh example for demo:
```js
//import the module
import myxios from "myxios"

/**
 * create a interceptor
 * NOTE: return value of the interceptor must be thenable, 
 * The fetch function is thenable
 * For non-fetch return, here we will use Promise.resolve() to wrap our return value to make it thenable 
 * res = res[0] is because by default myxios will keep all of the interceptors' response in sequence, here the 401 error will only come from first request 
 */
const notAuthorizedInterceptor = (res) => {
    res = res[0]
    let refreshToken = localStorage.getItem("refresh")
    if (res.status === 401) {
        if(refreshToken!==undefined){
            return fetch(
                SERVER_URL + "/user/refresh",
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + refreshToken
                    }
                }
            ).then(
                res => {
                    if (res.status === 200) {
                        return res.json()
                    }else{
                        logout()
                        alert("Session expired. Please login again.")
                        navigate("/login")
                    }
                }
            ).then(
                data => {
                    console.log("refresh:",data)
                    if (data) {
                        localStorage.setItem("token", data.token)
                        return fetch(
                            SERVER_URL + "/user/articles",
                            {
                                method: 'GET',
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }
                        )             
                    }
                }
            )
        }else{
            logout()
            alert("Session expired. Please login again.")
            navigate("/login")
        }
    }
    return Promise.resolve(res)
}

//only difference from fetch is a 3rd parameter for interceptors
myxios.requestOneTimeIntercepts(
    SERVER_URL + "/user/articles",
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    },
    [notAuthorizedInterceptor]
).then(
    res => {
        res = res[1]
        return res.json()
    }
).then(
    json => {
        if(json.articles){
            setArticles(json.articles)
        }
    }
).catch(
    (e) => console.log(e) 
)
```

## How to contribute
Issues and PRs are welcomed.

Please read the [contributing document](https://github.com/S2thend/myxios/blob/main/CONTRIBUTING.md).