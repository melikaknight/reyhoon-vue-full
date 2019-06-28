<template>
  <div class="restaurant-rating-card-container">
    <div class="restaurant-rating-card-total en-number">
      <span>({{commentsCount}})</span>
      <div class="star-rating">
        <star-rating 
          :rating="averageRating" 
          :read-only="true"
          :star-size="24" 
          :increment="0.01"
          :show-rating="false"
          :border-width="4" 
          border-color="#d8d8d8" 
          :rounded-corners="true" 
          :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
        >
        </star-rating>
      </div>
      <h3>{{averageRating}}</h3>
    </div>
    <div class="restaurant-rating-card-detail">
      <div 
        v-for="(section, index) in display"
        :key="index"
        class="restaurant-rating-average-container"
      >
        <p>{{ section.title }}</p>
        <span class="en-number"> {{ section.value }} </span>
        <vue-slide-bar
          v-model="section.value"
          :min="0"
          :max="5"
          :processStyle="{ 'backgroundColor': '#ffd055' }"
          :showTooltip="false"
          :lineHeight="20"
          :isDisabled="true"
          :paddingless="true"
          class="vue-slide-bar-test"
        />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "RestaurantRatingCard",
    props: {
      averageRating: {
        type: Number,
        required: true,
        default: 0,
      },
      averageQualityRating: {
        type: Number,
        required: true,
        default: 0,
      },
      averageDeliveryRating: {
        type: Number,
        required: true,
        default: 0,
      },
      averagePackagingRating: {
        type: Number,
        required: true,
        default: 0,
      },
      commentsCount: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    computed : {
      display(){
        return [
          {
            title: 'کیفیت غذا',
            value: parseFloat(this.averageQualityRating),
          },
          {
            title: 'کیفیت بسته بندی',
            value: parseFloat(this.averagePackagingRating),
          },
          {
            title: 'کیفیت ارسال پیک',
            value: parseFloat(this.averageDeliveryRating),
          },
        ]
      }
    },
    
  }
</script>
