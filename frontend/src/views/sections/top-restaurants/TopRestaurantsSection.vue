<template>
  <section class="top-restaurants container">
    <h3 class="section-title mb-5">{{ sectionTitle }}</h3>
    <div class="top-restaurants-boxes">
      <row class="text-center" id="top-restaurants">
        <column 
          width="25" 
          class="mb-5"
          v-for="restaurant in cityRestaurants"
          :key="restaurant.name"
        >
          <restaurant-minimal
            :name="restaurant.name"
            :slug="restaurant.slug"
            :logo="restaurant.logo"
          />
        </column>
      </row>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex';
  import RestaurantMinimal from '@/components/restaurant/RestaurantMinimal.vue';
  export default {
    name: "TopRestaurantsSection",
    created() {
      // this.$store.dispatch('getCityRestaurants', 'tehran');
    },
    data: () => ({

    }),
    computed: {
      ...mapGetters({
        cityRestaurants: 'cityRestaurantsGetter',
        selectedCityFa: 'selectedCityFaGetter',
      }),
      sectionTitle(){
        return `رستوران های خوب ${this.selectedCityFa} در ریحون`;
      }
    },
    components: {
      RestaurantMinimal,
    },
  }
</script>

