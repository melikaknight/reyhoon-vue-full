<template>
  <div class="food-item-container">
    <div class="food-item-info">
      <h3> {{ name }} </h3>
      <h3 class="en-number"> {{ price | currency }} <span>تومان</span></h3>
    </div>
    <div class="food-item-details">
      <div class="food-item-actions">
        <p class="food-item-ingredients">
          {{ ingredients }}
        </p>
        <button class="food-item-add-to-cart">
          <span class="food-item-action-title">
            افزودن به سبد خرید
          </span>
        </button>
      </div>
      <div class="food-item-image-container">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "FoodItem",
    props: {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      ingredients: {
        type: String,
      },
    
    },
    /*computed: {
       imageUrl() {
        return this.image 
          ? this.image
          : '/assets/images/foods/food-outline.png';
      }
    },*/
  }
</script>

