import request from './request';

const get = function (url,params){
    return request({ method: 'GET', url, params });
}

const post = function (url,data){
    return request({ method: 'POST', url, data });
}

const register = function (url,data){
    return request({ method: 'POST', url, data , headers: { "Content-Type": "multipart/form-data" } });
}

export default {
    get,
    post,
    register
}
