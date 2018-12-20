import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        newTotalCount: null,
        id: null
    },
    mutations: {
        increment(state, value) {
            state.newTotalCount = value;
            state.id = value;
        }
    }
})
export default store;