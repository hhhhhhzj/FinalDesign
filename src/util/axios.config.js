import axios from 'axios';
import createStore from '@/store/index'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //TODO:axios拦截器注释
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response.headers);
    const {authorization} = response.headers;
    authorization && localStorage.setItem('token', authorization);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {status} = error.response;
    if (status === 401) {
        localStorage.removeItem('token');
        createStore.commit('clearUserInfo')
        window.location.href = '/home';
    }
    return Promise.reject(error);
  });