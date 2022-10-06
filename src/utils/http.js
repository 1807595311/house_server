import request from './request';

const get = function (url,params){
    return request({ method: 'GET', url, params });
}

const post = function (url,data){
    return request({ method: 'POST', url, data });
}

const upload_img = function (url,data){
    return request({ method: 'POST', url, data , headers: { "Content-Type": "multipart/form-data" } });
}

export default {
    get,
    post,
    upload_img
}
