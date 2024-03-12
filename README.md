# myxios


## demo
```js
const notAuthorizedInterceptor = (res) => {

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