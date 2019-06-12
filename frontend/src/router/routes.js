import LandingPageView from '@/views/pages/landing-page/LandingPage.vue';
import RestaurantsSearch from '@/views/pages/restaurant-search/RestaurantSearch.vue';

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPageView
  },
  {
    path: '/restaurants',
    name: 'restaurantSearch',
    component: RestaurantsSearch
  }
];

export default routes;