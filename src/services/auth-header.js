import router from "../router/index";


export default function authHeader() {

    let user = JSON.parse(localStorage.getItem('user'));
    let date = new Date().toISOString();
    if (user && user.token) {
        if (user.apiCallJwtExpire >= date) {
            return {

                Authorization: 'Bearer ' + user.token
            }
        } else {
            router.push('/login')
        }
    } else {
        router.push('/login')
    }

}