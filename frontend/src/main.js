// importing libraries
import Vue from 'vue';

// Importing our router object
import router from './router';

// importing our global store object
import store from './store';

// importing our parent component to all other children
import App from './App.vue';

// setting vue configs
Vue.config.productionTip = false;

new Vue({
  // Hooking up our router
  router,
  // Hooking up our global store
  // provide the store using the "store" option.
  // this will inject the store instance to all child components
  // and can be accessed with this.$store
  store,
  render: h => h(App),
}).$mount('#app');
