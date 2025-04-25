# myxios
[![npm badge](https://img.shields.io/badge/npm-0.8.1-blue.svg)](https://www.npmjs.com/package/myxios)
[![compatibility badge](https://img.shields.io/badge/compatibility->=ES6-blue.svg)](https://shields.io/)
[![gzipped_size badge](https://img.shields.io/badge/gzipped_size-1.2_kB-red.svg)](https://shields.io/)
[![License badge](https://img.shields.io/badge/License-Apache2.0-<COLOR>.svg)](https://shields.io/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

A modern, fetch based, axios inspired light-weight javascript request library

It makes handling requests easy with the same api as fetch. It is super easy with those who are familiar with fetch.

## Quick Start Examples
### Configure a myxios instance and use
1. Create a file to configure the myxios instance
    ```js
    // utils/HttpHandler.js

    // Create a shared instance in a separate file (e.g., api.js)
    import myxios from "myxios"

    // Create a single shared instance
    export const myxiosInstance = myxios;

    // Add your interceptor function
    const notAuthorizedInterceptor = (res) => {
        // ommited for brevity
    }

    // Add the interceptor to the shared instance
    myxiosInstance.addResponseInterceptor(notAuthorizedInterceptor);

    // Export the instance to use in all components
    export default myxiosInstance;
    ```
2. Then import the instance in your component
    ```js
    import { myxiosInstance } from './utils/HttpHandler'

    let response = await myxiosInstance.request(`http://example.com/api/data`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    //handle the case that the response is an array
    if (Array.isArray(response)) {
        response = response[response.length - 1];
    }
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    ```

### Migrate from fetch to myxios
```js
    const response = await fetch(`http://example.com/api/data`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
```
You only need to change the fetch to myxiosInstance.request,
and add a handling logic for the case that the response is an array.
```js
    //import the module
    import { myxios } from 'myxios'

    let response = await myxios.request(`http://example.com/api/data`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    //handle the case that the response is an array
    if (Array.isArray(response)) {
        response = response[response.length - 1];
    }
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
```
### access the original request parameters
for use in retrying requests with same parameters
```js
function customInterceptor(res){
    // omit details for brevity

    // get the original request parameters from the first response
    const originalRequset = res[0].request;
    console.log("originalRequset:", originalRequset);

    return fetch(
        // omit details for brevity
    ).then(
        data => {
            console.log("refresh:", data);
                //
                return fetch(
                    originalRequest.url,
                    {
                        method: originalRequest.method,
                        headers: {
                            ...originalRequest.headers,
                        },
                        body: originalRequest.body
                    }
                );
            }
    );
}
```


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