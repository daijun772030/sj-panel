// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '~/static/reset.less'
import '~/static/style.less'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from '../src/plugin/myapi'
import axios from 'axios'
// import api from '~/static/api';
// import axios from 'axios'
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });
Vue.config.productionTip = false
    // Vue.propotype.$api = api;
    /* eslint-disable no-new */
Vue.prototype.$api = api
Vue.prototype.$axios = axios;
// Vue.prototype.$axios = axios
// Vue.prototype.$api = create()
// Vue.prototype.$axios = axios
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})