import axios from 'axios'
// import store from '@/store'
const baseURL = process.env.NODE_ENV === 'production' ? 'https://pps-api.vercel.app' : 'http://192.168.10.7:5000'
const myAxios = axios.create({
    baseURL
})

// 请求拦截器
// myAxios.interceptors.request.use(function (config) {
//     if (store.state.token) {
//       config.headers.Authorization = store.state.token
//     }
//     return config
//   })

// myAxios.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     (error) => {
//         const baseURL = 'http://192.168.10.7:5000'
//         const url = error.config.url
//         const params = error.config.params
//         const delay = new Promise(function (resolve) {
//             resolve();
//         });
//         return delay.then(() => {
//             return myAxios({ baseURL: baseURL + url, params });
//         });

//     })


export default myAxios