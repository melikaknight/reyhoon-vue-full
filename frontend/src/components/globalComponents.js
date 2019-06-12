import Vue from 'vue';
import Autocomplete from 'v-autocomplete'
import { Plugin } from 'vue-fragment';
import StarRating from 'vue-star-rating';

// importing component CSS
import 'v-autocomplete/dist/v-autocomplete.css';

// Our custom components
import Row from '@/components/elements/Row.vue';
import Column from '@/components/elements/Column.vue';
import Icon from '@/components/elements/Icon.vue';

Vue.use(Autocomplete);
Vue.use(Plugin);
Vue.component('star-rating', StarRating);
Vue.component('row', Row);
Vue.component('column', Column);
Vue.component('icon', Icon);