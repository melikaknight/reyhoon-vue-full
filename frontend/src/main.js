// importing libraries
import Vue from 'vue';

// Importing our router object
import router from './router';

// importing our global store object
import store from './store';

// importing our global components defenition
import '@/components/globalComponents';

// importing our toast message handler
import '@/services/toastHandler';

// importing our parent component to all other children
import App from './App.vue';

// setting vue configs
Vue.config.productionTip = false;

// Vue.component(globalComponents);

new Vue({
  // Hooking up our router
  router,
  // Hooking up our global store
  // provide the store using the "store" option.
  // this will inject the store instance to all child components
  // and can be accessed with this.$store
  store,
  // Automatic Global Registration of Base Components
  render: h => h(App),
}).$mount('#app');
