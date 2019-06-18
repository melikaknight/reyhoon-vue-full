import LandingPageView from '@/views/pages/landing-page/LandingPage.vue';
import RestaurantPageView from '@/views/pages/restaurant-page/RestaurantPage.vue';
import RestaurantsSearch from '@/views/pages/restaurant-search/RestaurantSearch.vue';

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPageView,
    meta: {
      topNavPosition: 'fixed',
    },
  },
  {
    path: '/restaurants/:restaurantSlug',
    name: 'RestaurantPage',
    component: RestaurantPageView,
    meta: {
      topNavPosition: 'absolute',
    },
  },
  {
    path: '/:citySlug/:areaSlug',
    name: 'restaurantSearch',
    component: RestaurantsSearch,
    meta: {
      topNavPosition: 'fixed',
    },
  }
];

export default routes;