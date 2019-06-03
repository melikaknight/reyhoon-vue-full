<template>
  <div id="app">
    <router-link to="/">
      <img alt="Vue logo" src="./assets/logo.png">
    </router-link>
    <HelloWorld :msg="appName"/>
    <router-link to="/contact">contact</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import HelloWorld from './components/HelloWorld.vue';
  
  export default {
    name: 'app',
    components: {
      HelloWorld
    },
    // mapState helper generates computed getter functions for us
    computed: mapState([
      'appName'
    ]),
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
