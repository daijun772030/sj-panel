import Vue from 'vue';
import Router from 'vue-router';
// import { resolve } from 'upath';

// 按需加载组件，在需要的时候才加载组件
import App from '@/App';
const Manager = () =>
    import ('@/pages/manager' /* webpackChunkName: "pages/manager" */ ).then(m => m.default || m)
const Login = () =>
    import ('@/pages/login' /* webpackChunkName: "pages/login" */ ).then(m => m.default || m)
    // const Order = () =>
    //     import ('@/pages/order' /* webpackChunkName: "pages/order" */ ).then(m => m.default || m)
const BusinessList = () =>
    import ('@/pages/business/list' /* webpackChunkName: "pages/business/list" */ ).then(m => m.default || m)
const BusinessOrder = () =>
    import ('@/pages/business/order' /* webpackChunkName: "pages/business/order" */ ).then(m => m.default || m)
const Goods = () =>
    import ('@/pages/goods/goods' /* webpackChunkName: "pages/goods" */ ).then(m => m.default || m)
const Activity = () =>
    import ('@/pages/activity/activity' /* webpackChunkName: "pages/activity" */ ).then(m => m.default || m)
const Finance = () =>
    import ('@/pages/finance/finance' /* webpackChunkName: "pages/finance" */ ).then(m => m.default || m)
const Index = () =>
    import ('@/pages/order/index' /* webpackChunkName: "pages/order/index" */ ).then(m => m.default || m)
const Generalize = () =>
    import ('@/pages/generalize/generalize' /* webpackChunkName: "pages/generalize" */ ).then(m => m.default || m)
const Accomplish = () =>
    import ('@/pages/order/Accomplish' /* webpackChunkName: "/pages/order/Accomplish" */ ).then(m => m.default || m)
const Evaluate = () =>
    import ('@/pages/order/evaluate' /* webpackChunkName: "/pages/order/evaluate" */ ).then(m => m.default || m)
const Make = () =>
    import ('@/pages/order/make' /* webpackChunkName: "/pages/order/make" */ ).then(m => m.default || m)
const Send = () =>
    import ('@/pages/order/send' /* webpackChunkName: "/pages/order/send" */ ).then(m => m.default || m)
Vue.use(Router);

// 路由后记住滚动条的位置
const scrollBehavior = (to, from, savedPosition) => {
        // SavedPosition is only available for popstate navigations.
        if (savedPosition) {
            return savedPosition
        } else {
            let position = {}
                // If no children detected
            if (to.matched.length < 2) {
                // Scroll to the top of the page
                position = { x: 0, y: 0 }
            } else if (to.matched.some((r) => r.components.default.scrollToTop)) {
                // If one of the children has scrollToTop option set to true
                position = { x: 0, y: 0 }
            }
            // If link has anchor, scroll to anchor by returning the selector
            if (to.hash) {
                position = { selector: to.hash }
            }
            return position
        }
    }
    // 注册路由
const router = new Router({
    mode: 'history',
    base: '/sangjie/panel/', //项目的根名称 如：localhost:3000/sangjie/panel/index
    linkActiveClass: 'b-link-active',
    linkExactActiveClass: 'b-c-link-active',
    scrollBehavior,
    routes: [{
        name: '/',
        path: '/',
        component: App,
        children: [
            { name: 'login', path: 'login', component: Login },
            {
                name: 'manager',
                path: 'manager',
                component: Manager,
                children: [
                    { name: "order", path: 'order', component: Index },
                    { name: "order-index", path: 'index', component: Index },
                    { name: "order-accomplish", path: 'accomplish', component: Accomplish },
                    { name: "order-evaluate", path: 'evaluate', component: Evaluate },
                    { name: "order-make", path: 'make', component: Make },
                    { name: "order-send", path: 'send', component: Send },
                    { name: 'business', path: 'business', component: BusinessList },
                    { name: 'business-list', path: 'list', component: BusinessList },
                    { name: 'business-order', path: 'order', component: BusinessOrder },
                    { name: 'goods', path: 'goods', component: Goods },
                    { name: 'activity', path: 'activity', component: Activity },
                    { name: 'finance', path: 'finance', component: Finance },
                    { name: 'generalize', path: 'generalize', component: Generalize }
                ]
            }
        ]
    }]
});

/**
 * 路由守卫，用于拦截路由跳转
 * to   从哪儿来
 * from 到哪儿去
 * next 必须执行才能路由过去
 */
router.beforeEach((to, from, next) => {
    // debugger;
    // if (to.path === '/login') {
    //     next();
    // } else {
    //     if (sessionStorage.username) {
    //         next();
    //     } else {
    //         next({ path: 'login' })
    //     }
    // }
    next()
});
export default router