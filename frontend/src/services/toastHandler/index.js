import Vue from 'vue';
// register the plugin on vue
import Toasted from 'vue-toasted';

// you can also pass options, check options reference below
Vue.use(Toasted, {
  type : 'error',
  iconPack : 'fontawesome',
  icon : 'warning',
  duration : 5000,
  className: 'dir-ltr',
});