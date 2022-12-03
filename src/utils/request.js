import axios from 'axios';
import cookie from 'vue-cookie';
import _that from '@/main'

const config = process.env;
// 创建axios实例
const instance = axios.create({
    baseURL: config.VUE_APP_BASE_URL,
    timeout: 8000,
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    let token = cookie.get('access_token');
    if(token){
        config.headers = {
            'Authorization': token
        }
    }
    _that.$store.state.loading = true;
    return config;
},err=>{
    return Promise.reject(err);
})

// 响应拦截器
instance.interceptors.response.use(res=>{
    let data = res.data;
    _that.$tip(data);
    return res;
},err=>{
    return Promise.reject(err);
})

export default instance;