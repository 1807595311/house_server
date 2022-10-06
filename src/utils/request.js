import axios from 'axios';
import cookie from 'vue-cookie'

const config = process.env;
// 创建axios实例
const instance = axios.create({
    baseURL: config.VUE_APP_BASE_URL,
    timeout: 8000,
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    let token = cookie.get('token');
    if(token){
        config.headers = {
            'Authorization': token
        }
    }
    return config;
},err=>{
    return Promise.reject(err);
})

// 响应拦截器
instance.interceptors.request.use(res=>{
    return res;
},err=>{
    return Promise.reject(err);
})

export default instance;