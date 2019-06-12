<template>
  <router-link :to="`/restaurants/${slug}`">
    <div class="top-restaurants-box">
      <div class="top-restaurant-img">
        <img 
          :src="logo" 
          :alt="name"
        >
      </div>
      <span>{{ name }}</span>
    </div>
  </router-link>
</template>
<script>
  export default {
    name: "RestaurantMinimal",
    props: {
      logo: {
        type: String,
        default: '/assets/images/logos/default.jpeg',
      },
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      }
    },
  }
</script>
