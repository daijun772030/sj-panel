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

const baseURL = process.env.baseURL || "https://www.easy-mock.com/mock/5b3cb20beaf38c457dee359c";
console.log(process.env.baseURL);

// 请求对象实例，具体的方法
const create = function() {
    let http = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    // 请求拦截器
    http.interceptors.request.use(config => {

        if (config.method === 'post') {
            const FormData = new FormData()
            Object.keys(config.data).forEach((key) => FormData.append(key, config.data[key]))
            config.data = FormData
        }
        config.headers = {
            'content-type': 'application/x-www-form-urlencoded'
        }
        return config
    }, error => {
        return Promise.reject(error)
    })

    // 响应拦截器
    http.interceptors.response.use(response => {
        const { data } = response
        if (data && data != "") {
            return data
        } else {
            console.log("没有任何东西")
        }
    }, error => {
        return Promise.reject(error)
    })

    return http
}
const instance = create();

// 柯理化

// const ['get', 'post'] = ['get', 'post'].map(item => {
//     return (url) => {
//         return (data) => {
//             return (config) => {
//                 instance[item](url, data, config);
//             }
//         };
//     };
// });
const get = (url) => {
    return (data) => {
        return (config) => {
            return instance.get(url, data, config);
        }
    }
};
// const post = (url) => {
//     return (data) => {
//         return (config) => {
//             return instance.post(url, data, config);
//         }
//     }
// };

// 接口map 表
const apis = {
    query: get('/example/query')
}
// 
const request = function(name, data, config) {
    return apis[name](data)(config);
}
export default  request;
// const server = axios.create({
//     timeout: 3000,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         'Accept': 'application/json'
//     }
// })
// server.interceptors.request.use(config => {
//     console.log(config)
//     return config
// }, error => {
//     return Promise.reject(error)
// })

// server.interceptors.response.use(response => {
//     return response
// }, error => {
//     Promise.reject(error)
// })

// export default server

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