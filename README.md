# myxios
[![npm badge](https://img.shields.io/badge/npm-0.0.1-blue.svg)](https://www.npmjs.com/package/myxios)
[![compatibility badge](https://img.shields.io/badge/compatibility->=ES6-blue.svg)](https://shields.io/)
[![install_size badge](https://img.shields.io/badge/install_size-7.18_kB-blue.svg)](https://shields.io/)
[![License badge](https://img.shields.io/badge/License-Apache2.0-<COLOR>.svg)](https://shields.io/)

A modern, fetch based, axios inspired light-weight javascript request library

## demo
```js
const notAuthorizedInterceptor = (res) => {

    res = res[0]

    const dispatch = store.dispatch

    let refresh = localStorage.getItem("refresh")

    if (res.status === 401) {
        if(refresh!==undefined){
            return fetch(
                SERVER_URL + "/user/refresh",
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('refresh')
                    }
                }
            ).then(
                res => {
                    if (res.status === 200) {
                        return res.json()
                    }else{
                        logoutAndClean()(dispatch)
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
            logoutAndClean()(dispatch)
            alert("Session expired. Please login again.")
            navigate("/login")
        }
    }

    return Promise.resolve(res)

}
```