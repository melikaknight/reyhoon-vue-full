<template>
  <router-link :to="foodTypeUrl" class="food-tags">
    {{ foodType }}
  </router-link>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    name: "FoodTypeTag",
    props: {
      foodType: String,
      slug: String,
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

