
import { logoutAndClean } from '../stores/userSlice'
import store from '../stores/store'
import NavigateSingleton from '../utils/NavigateSingleton'
import { SERVER_URL } from "../app.config"


export default function HttpHandler( fecthFunction ){
    
    const dispatch = store.dispatch

    let refresh = localStorage.getItem("refresh")

    console.log("fecthFunction:",fecthFunction)

    return fecthFunction.then(
        res => {
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
                                return new Promise(
                                    (resolve, _) => {
                                        fetch(
                                            SERVER_URL + "/user/articles",
                                            {
                                                method: 'GET',
                                                headers: {
                                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                                }
                                            }
                                        ).then(res => resolve(res))
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

            return res
        }
    )
}