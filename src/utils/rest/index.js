
import axios from "axios";

const AXIOS = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 100000
});
// let token =localStorage.getItem('authToken');
// AXIOS.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const get = function (url, params) {
    return AXIOS.get(url, {params})
        .then(response => {
            return response.data;
        });
};

export const post = function (url, payload, params) {
    return AXIOS.post(url, payload, {params});
};

export const put = function (url, payload, params) {
    return AXIOS.put(url, payload, {params});
};

export const remove = function (url, params) {
    return AXIOS.delete(url, {params});
};

AXIOS.interceptors.request.use(function (config) {
    let contentId =  document.getElementById("content");
    if(contentId){
        contentId.classList.add('loading-indicator');
    }
    return config
}, function (error) {
    return Promise.reject(error);
});
AXIOS.interceptors.response.use(function (response) {
    let contentId =  document.getElementById("content");
    if(contentId){
        contentId.classList.remove('loading-indicator');
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
