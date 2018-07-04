import Vue from 'vue';
import Router from 'vue-router';
import Index from '~/pages/index';

Vue.use(Router);

export default Router({
    mode: 'history',
    routes: [
        { name: 'index', path: '/', component: Index }
    ]
})