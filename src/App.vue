<template>
    <div id="app">
        <Menu />
        <div class="wrapper">
            <Header />
            <div class="pages">
              <router-view></router-view>
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
}
</style>
