import Vue from 'vue';
import Autocomplete from 'v-autocomplete'
import { Plugin } from 'vue-fragment';
import StarRating from 'vue-star-rating';
import VueScrollactive from 'vue-scrollactive';
import Sticky from 'vue-sticky-directive';
import VueSlideBar from 'vue-slide-bar';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/fa';
import VueCurrencyFilter from 'vue-currency-filter'
import PrettyCheck from 'pretty-checkbox-vue/check';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import { MdField, MdButton } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default-dark.css'
require('@/assets/theme.scss');
// importing component CSS
import 'v-autocomplete/dist/v-autocomplete.css';

// Our custom components
import Row from '@/components/elements/Row.vue';
import Column from '@/components/elements/Column.vue';
import Icon from '@/components/elements/Icon.vue';

Vue.use(Sticky)
Vue.use(Plugin);
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(VueMoment, {
  moment,
});
Vue.use(VueCurrencyFilter, {
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'back',
  symbolSpacing: true
});
Vue.use(Autocomplete);
Vue.use(VueScrollactive);
Vue.component('row', Row);
Vue.component('icon', Icon);
Vue.component('column', Column);
Vue.component('p-check', PrettyCheck);
Vue.component('star-rating', StarRating);
Vue.component('vue-slide-bar', VueSlideBar);