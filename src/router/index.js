import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index';

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

const router = new Router({
    mode: 'history',
    base: '/sangjie/panel/', //项目的根名称 如：localhost:3000/sangjie/panel/index
    linkActiveClass: 'b-link-active',
    linkExactActiveClass: 'b-c-link-active',
    scrollBehavior,
    routes: [
        { name: 'index', path: '/', component: Index }
    ]
});

/**
 * 路由守卫，用于拦截路由跳转
 * to   从哪儿来
 * from 到哪儿去
 * next 必须执行才能路由过去
 */ 
router.beforeEach((to, from, next) => {
    next();
});
export default router;