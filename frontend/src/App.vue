<template>
  <div id="app">
    <top-nav />
    <router-view></router-view>
    <my-footer />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import TopNav from '@/components/layout/top-nav/TopNav.vue';
  import Footer from '@/components/layout/footer/Footer.vue';
  
  export default {
    name: 'app',
    created: function(){
      this.$store.dispatch('getCities');
    },
    components: {
      TopNav,
      'my-footer': Footer,
    },
    // mapState helper generates computed getter functions for us
    computed: {
      ...mapGetters({
        errorMessage: 'errorMessageGetter',
        cityRestaurants: 'cityRestaurantsGetter',
      }),
    },
    watch: {
      errorMessage: function(newValue){
        if (newValue) {
          this.renderToastError();
        }
      }
    },
    methods: {
      renderToastError: function(){
        this.$toasted.show(this.errorMessage, {
          onComplete: () => this.clearError(),
        });
      },
      clearError: function(){
        this.$store.commit('SET_ERROR', { error: "" });
      }
    }
  };
</script>