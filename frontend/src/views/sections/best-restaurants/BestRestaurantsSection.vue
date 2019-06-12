<template>
  <section class="best-restaurants container text-center">
    <h3 class="section-title mb-4">{{ sectionTitle }}</h3>
    <row>
      <column 
        width="33" 
        class="mb-4"
        v-for="(restaurant,index) in bestCityRestaurants"
        :key="index"
      >
        <restaurant-card-one
          :name="restaurant.name"
          :slug="restaurant.slug"
          :logo="restaurant.logo"
          :menu="restaurant.menu"
          :averageRating="restaurant.averageRating"
          :commentsCount="restaurant.comments.length"
          :address="restaurant.address.address"
        />
      </column>
    </row>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex';
  import RestaurantCardOne from '@/components/restaurant/RestaurantCardOne.vue';
  export default {
    name: "BestRestaurantsSection",
    created() {
      this.$store.dispatch('getCityRestaurants', 'tehran');
    },
    data: () => ({
      
    }),
    computed: {
      ...mapGetters({
        bestCityRestaurants: 'bestCityRestaurantsGetter',
        selectedCityFa: 'selectedCityFaGetter',
      }),
      sectionTitle(){
        return `رستوران ها و فست فود های برتر بر اساس امتیازدهی کاربران در ${this.selectedCityFa}`;
      },
    },
    components: {
      RestaurantCardOne,
    },
  }
</script>

