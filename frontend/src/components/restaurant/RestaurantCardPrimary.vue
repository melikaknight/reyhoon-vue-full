<template>
  <div class="restaurant-card-primary">
    <div class="restaurant-card-primary-img mb-2">
      <img 
        :src="logo" 
        :alt="name"
      >
    </div>
    <router-link :to="`/restaurants/${slug}`">
      <h3 class="section-title mb-2">{{ name }}</h3>
    </router-link>
    <div class="restaurant-card-primary-rating">
      
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
            :rtl="true"
        >
        </star-rating>
      </div>
      <span>({{ comments.length }})</span>
    </div>
    <div class="restaurant-card-primary-services mb-2 mt-2">
      <span 
        v-for="(foodType,index) in foodTypesDisplay"
        :key="index"
      >
        {{ foodType }}
      </span>
    </div>
    <p class="mb-2" v-show="address">{{ address.address }}</p>
  </div>
</template>
<script>
  export default {
    name: "RestaurantCardPrimary",
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
      comments: {
        type: Array,
        default: [],
      },
      averageRating: {
        type: Number,
        default:0,
      },
      address: {
        type: Object,
        default: {},
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
      }
    }
  }
</script>
