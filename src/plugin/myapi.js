// import qs from 'qs'
import axios from 'axios'
// axios.interceptors.request.use(config => {
//         return config
//     },
//     function(error) {
//         return Promise.reject(error)
//     });
// axios.interceptors.response.use(response => {
//     return response
// }, function(error) {
//     return Promise.reject(error)
// })

// export default {
//     create() {
//         let http = axios.create({
//             baseURL: " https://www.easy-mock.com/mock/5b3cb20beaf38c457dee359c/example"
//         })
//         http.interceptors.request.use(config => {

//             if (config.method === 'post') {
//                 const FormData = new FormData()
//                 Object.keys(config.data).forEach((key) => FormData.append(key, config.data[key]))
//                 config.data = FormData
//             }
//             config.headers = {
//                 'content-type': 'application/x-www-form-urlencoded'
//             }
//             return config
//         }, error => {
//             return Promise.reject(error)
//         })

//         http.interceptors.response.use(response => {
//             const { data } = response
//             if (data && data != "") {
//                 return data
//             } else {
//                 console.log("没有任何东西")
//             }
//         }, error => {
//             return Promise.reject(error)
//         })

//         return http
//     }
// }

const server = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5b3cb20beaf38c457dee359c/example/',
    timeout: 3000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
server.interceptors.request.use(config => {
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

server.interceptors.response.use(response => {
    return response
}, error => {
    Promise.reject(error)
})

export default server

// const api = function(entry, data, param) {
//     axios.create({
//         baseURL: 'https://www.easy-mock.com/mock/5b3cb20beaf38c457dee359c/example/',
//         timeout: 3000,
//         withCredentials: true,
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8'
//         },
//         url: entry,
//         params: param
//     })
// }