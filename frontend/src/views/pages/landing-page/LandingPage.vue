<template>
  <fragment>
    <default-header />
    <show-case-section />
    <top-restaurants-section />
    <best-restaurants-section />
    <food-selection-section />
    <reyhoon-app-section />
  </fragment>
</template>
<script>
  import DefaultHeader from '@/components/layout/header/Header.vue';
  import ShowCaseSection from '@/views/sections/showcase/ShowCaseSection.vue';
  import TopRestaurantsSection from '@/views/sections/top-restaurants/TopRestaurantsSection.vue';
  import BestRestaurantsSection from '@/views/sections/best-restaurants/BestRestaurantsSection.vue';
  import ReyhoonAppSection from '@/views/sections/reyhoon-app/ReyhoonAppSection.vue';
  import FoodSelectionSection from '@/views/sections/food-selection/FoodSelectionSection.vue';

  export default {
    name: "LandingPage",
    components: {
      DefaultHeader,
      ShowCaseSection,
      TopRestaurantsSection,
      BestRestaurantsSection,
      ReyhoonAppSection,
      FoodSelectionSection,
    },
  }
</script>

