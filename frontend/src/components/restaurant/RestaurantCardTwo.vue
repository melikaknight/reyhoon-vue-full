<template>
  <router-link :to="`/restaurants/${slug}`">
    <div 
      class="restaurant-card-two-container" 
      :class="closedRestaurantClass"
    >
      <div class="restaurant-card-two-header">
        <img 
          :src="logo" 
          :alt="name"
          class="restaurant-card-two-logo"
        >
        <div class="restaurant-card-two-info">
          <h3 class="section-title">{{ name }}</h3>
          <div class="restaurant-card-two-rating">
            <span>{{averageRating}}</span>
            <div class="star-rating">
              <star-rating 
                :rating="averageRating" 
                :read-only="true"
                :star-size="14" 
                :increment="0.01"
                :show-rating="false"
                :border-width="4" 
                border-color="#d8d8d8" 
                :rounded-corners="true" 
                :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
              >
              </star-rating>
            </div>
            <div class="best-restaurants-services">
              <span 
                v-for="(foodType,index) in foodTypesDisplay"
                :key="index"
              >
                {{ foodType }}
              </span>
            </div>
            <p>{{ address }}</p>
          </div>
        </div>
      </div>
      <div 
        class="restaurant-card-two-footer"
      >
        <button v-if="!isClosed" >شروع سفارش</button>
        <button disabled v-else>شروع سفارش از ساعت {{ openingTime }}</button>
      </div>
    </div>
  </router-link>
</template>
<script>
  export default {
    name: "RestaurantCardTwo",
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
      },
      foodTypes: {
        type: Array,
        required: true,
      },
      commentsCount: {
        type: Number,
        default: 0,
      },
      averageRating: {
        type: Number,
        default:0,
      },
      address: {
        type: String,
        default: "",
      },
      isClosed: {
        type: Boolean,
        default: false,
      },
      openingTime: {
        type: String,
      },
    },
    computed: {
      foodTypesDisplay(){
        if (this.foodTypes.length) {
          const foodTypesReducer = (
              foodTypes, currentMenuItem
            ) => ([
              ...foodTypes,
              currentMenuItem.foodType
            ]);
          return this.foodTypes.reduce(foodTypesReducer, []);
        }
        return [];
      },
      closedRestaurantClass(){
        return (this.closed)? 'closed': '';
      },
      closed(){
        return (this.isClosed == true)? true : false;
      }
    }
  }
</script>
