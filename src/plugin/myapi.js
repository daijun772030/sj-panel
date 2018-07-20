import axios from 'axios'
const baseURL = process.env.baseURL || "/api";
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
            // const FormData = new FormData()
            // Object.keys(config.data).forEach((key) => FormData.append(key, config.data[key]))
            // config.data = FormData
            config.data = JSON.stringify(config.data)
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
        if (response) {
            return response
        }
        const { data } = response
        if (data) {
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
const post = (url) => {
    return (data) => {
        return (config) => {
            return instance.post(url, data, config);
        }
    }
};

// 接口map 表
const apis = {
    //商户后台登录的接口
    login: post('/merchant/login'),
}
const request = function(name, data, config) {
    return apis[name](data)(config);
}
export default request;