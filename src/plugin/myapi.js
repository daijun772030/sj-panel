import axios from 'axios'
// import Vue from 'vue';
const baseURL = process.env.baseURL || "/api";
// console.log(process.env.baseURL);

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
        // debugger;
        // if (config.method === 'post') {
        //     config.data = JSON.stringify(config.data)
        // }
        // const token = localStorage.getItem('token');
        // if(token){
        //     config.headers = {
        //         cookie: `token=${token}`
        //     }
        // }

        return config
    }, error => {
        return Promise.reject(error)
    })

    // 响应拦截器
    http.interceptors.response.use(response => {
        // debugger;
        return response
            // 响应状态统一处理
            // const { data } = response;
            // if (data.data.retCode == 200) {
            //     return data;
            // } else if (data.retCode == -200) {
            //     window.location.replace('/sangjie/panel/login');
            //     // Vue.prototype.$router.replace('/login');
            // } else {
            //     Vue.prototype.$message.error(data.message);
            //     return Promise.reject(data);
            // }
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
    //发送验证码
    sendSms: get('/user/sendSms'),
    status: get('/shoppingCar/findByShoppingCarStatus'),
    //商户后台登录的接口
    login: post('/merchant/login'),
    shop: post('/shoppingCar/shoppingCarByNumberAndRemark'),
    shopping: get('/shoppingCar/findByShoppingCarStatus'),
    //商品接口
    myshop: get('/commodity/all')
}
const request = function(name, data, config) {
    return apis[name](data)(config);
}
export default request;