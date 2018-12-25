import create from '../plugin/myapi';
import store from './store.js'

function orderAll() {
    // var music = 'music';
    create('orderAll', {
        params: {
            pageNum: "1",
            pageSize: "10",
            type: "0"
        }
    }).then((res) => {
        console.log(res)
        var newTotalCount = {
            newTotalCount: res.data.data.total,
            id: store.state.id
        };
        store.commit('increment', newTotalCount);
        console.log("订单数量" + store.state.newTotalCount);
        console.log(store.state.id)
        if (newTotalCount.newTotalCount > 0) {
            var audio = document.getElementById('music');
            console.log(audio);
            audio.play();
        } else {
            console.log("没有订单")
        }
    })
}
const timer = setInterval(() => {
    orderAll();
}, 60000)
export default timer;