import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = domain;
//解决跨域
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/haiot-zuul' : '/api';
axios.defaults.withCredentials = true;

axios.defaults.crossDomain = true;

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

export default axios;