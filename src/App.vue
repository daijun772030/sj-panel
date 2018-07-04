<template>
    <div id="app">
        <Menu />
        <div class="wrapper">
            <Header />
            <div class="pages">
                <div class="pages-inner">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/Menu';
import Header from '@/components/Header';
export default {
    name: 'App',
    components: {
      Menu,
      Header
    }
}
</script>

<style lang="less" scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    position: relative;
    .wrapper{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 200px;
        .pages{
            width: 100%;
            box-sizing: border-box;
            height: calc(100% - 50px);
            padding: 10px 10px 0;
            &-inner{
                width: 100%;
                height: 100%;
                border-radius: 6px;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                box-shadow: 0 0 10px -2px #ccc;
            }
        }
    }
}
</style>
