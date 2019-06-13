<template>
  <router-link :to="foodTypeUrl">
    <div class="what-food-box">
      <img 
        :src="cardImageUrl" 
        :alt="foodType"
      >
      <div class="food-desc">
        <h2>{{ foodType }}</h2>
        <h4>
          <span class="en-number">{{ restaurantsCount }}</span> رستوران فعال
        </h4>
      </div>
    </div>
  </router-link>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    name: "FoodTypeCard",
    props: {
      foodType: String,
      slug: String,
      restaurantsCount: Number,
      cardImageUrl: String,
    },
    computed: {
      ...mapState([
        'selectedCity',
      ]),
      foodTypeUrl(){
        return `/${this.selectedCity}/${this.slug}`;
      }
    },
  }
</script>

