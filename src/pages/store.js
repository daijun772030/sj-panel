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
            state.newTotalCount = value.newTotalCount;
            state.id = value.id
        }
    }
})
export default store;