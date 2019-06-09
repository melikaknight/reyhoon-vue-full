<template>
  <div id="app">
    <top-nav />
    <my-header />
    <my-footer />
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import TopNav from '@/components/layout/top-nav/TopNav.vue';
  import Header from '@/components/layout/header/Header.vue';
  import Footer from '@/components/layout/footer/Footer.vue';
  
  export default {
    name: 'app',
    components: {
      TopNav,
      'my-header': Header,
      'my-footer': Footer,
    },
    // mapState helper generates computed getter functions for us
    computed: mapState([
      'appName'
    ]),
  };
</script>