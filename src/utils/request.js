import axios from 'axios';
import cookie from 'vue-cookie';
import { Message } from 'element-ui';
import loading from '@/utils/loading';
import qs from 'qs';

const config = process.env;
// 创建axios实例
const instance = axios.create({
    baseURL: config.VUE_APP_BASE_URL,
    timeout: 8000,
})


// 请求拦截器
instance.interceptors.request.use(async config => {
    let token = cookie.get('token');
    if (token) {
        config.headers = {
            'Authorization': token
        }
    }
    // 开启loading
    loading('start');
    return config;
}, async err => {
    return Promise.reject(err);
})

// 响应拦截器
/**
   -1：服务器错误
    0：操作成功，添加修改操作返回
    -2：token过期
    1：options请求,什么都不用做
    2：获取成功，查询操作返回
 */
instance.interceptors.response.use(async res => {
    let data = res.data;
    setTimeout(() => {
        switch (data.status) {
            case -2:
                Message.error(data.msg);
                break;
            case -1:
                Message.error(data.msg);
                break;
            case 0:
                Message.success(data.msg);
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
        // 关闭loading
        loading('close');
    }, 400);
    return res;
}, async err => {
    loading('close');
    Message.error(err);
    return Promise.reject(err);
})

export default instance;