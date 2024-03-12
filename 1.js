import { logoutAndClean } from '../stores/userSlice'
import store from '../stores/store'
import NavigateSingleton from '../utils/NavigateSingleton'
import { SERVER_URL } from "../app.config"


export default function HttpHandlerExperiment( url, options, interceptorfuncs=[notAuthorizedInterceptor] ){
    
    const fetch_req = fetch(
        url,
        options
    )

    // interceptorfuncs.forEach((element) => Promise.resolve(element));
    console.log ("interceptorfuncs:",interceptorfuncs[0])

    return interceptorfuncs.reduce(
        (prev, cur)=>{
            return prev.then(
                data => {
                    return cur(data)
                }
            )
        },
        fetch_req
    )
}


const paramCarryPromise = (param, promise) => promise.then( res => new Promise( (resolve, _) => resolve([ ...param, ...res ])) )

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
                        let navigate = NavigateSingleton.getInstance().getNavigate()
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
            let navigate = NavigateSingleton.getInstance().getNavigate()
            navigate("/login")
        }
    }

    return Promise.resolve(res)

}

const fetchArticles = new Request(
    SERVER_URL + "/user/articles",
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
)