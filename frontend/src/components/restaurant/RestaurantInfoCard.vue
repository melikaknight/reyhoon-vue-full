<template>
  <div class="restaurant-info-card-container">
    <div class="restaurant-info-card-address">
      <h3> {{ name }} </h3>
      <p>
        <span>
          <i class="fa fa-map-pin"></i>
          {{ address }}
        </span>
      </p>
      <p>
        <span>
          <i class="fa fa-clock-o"></i>
          ساعات سفارش گیری
        </span>
      </p>
      <div class="restaurant-info-card-working-hours">
        <p>همه روزه</p>
        <p> از ساعت {{ openingTime }} الی {{ closingTime }} </p>
      </div>
    </div>
    <div class="restaurant-info-card-location">
      <img src="/assets/images/restaurant-location-on-map.png" >
    </div>
  </div>
</template>
<script>
  export default {
    name: "RestaurantInfoCard",
    props: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      openingTime: {
        type: String,
        required: true,
      },
      closingTime: {
        type: String,
        required: true,
      }
    }
  }
</script>

