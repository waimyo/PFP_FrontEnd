import axios from 'axios';
import authHeader from '../services/auth-header';
const API_URL=process.env.VUE_APP_API_ENDPOINT;
class AuthService{

login(user){
return axios.post(API_URL+'/user/authenticate',{name:user.name,
    password:user.password},{ headers: authHeader()}
    ).then(
    response=>{
        if(response.data.token){
            localStorage.setItem('user',JSON.stringify(response.data));
        }
        return response.data;
    });
}

logout()
{
    return axios.post(API_URL+'/user/LogOut/',{},{headers:authHeader()});
}

register(user)
{
    return axios.post(API_URL+'signup',{
        username:user.username,
        email:user.email,
        password:user.password
    });
}

}
export default new AuthService();