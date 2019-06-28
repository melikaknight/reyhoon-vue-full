<template>
  <section class="restaurant-header">
    <div class="restaurant-search-cover">
      <img 
        src="/assets/images/restaurant-search-banner-2x.jpg" 
        alt="جستجوی رستوران ها" 
        class="restaurant-cover-image"
      >
    </div>
    <div class="restaurant-search-title">
      <row>
        <column width="100">
          <span>
            <h3> 
              {{ this.openRestaurantsCount }}
              عدد رستوران امکان سرویس دهی به
            </h3>
          </span>
          <span>
            <h1>{{ ` ${this.locationData.city}، ${this.locationData.area} ` }}</h1>
          </span>
          <span>
            <h3> 
              را دارند.
            </h3>
          </span>
        </column>
      </row>
    </div>
    <div class="restaurant-search-filters-container">
      <row>
        <column width="50">
          <div class="restaurant-search-input-container">
            <input 
              type="text" 
              name="s" 
              placeholder="جستجوی رستوران در این محدوده"
              v-model="searchInput"
              class="restaurant-search-input"
            >
          </div>
        </column>
      </row>
    </div>
    <div class="restaurant-search-resault-container">
      <div class="restaurant-search-result-filters-container">
        <div class="restaurant-search-filters">
          <p class="restaurant-search-filters-header">
            فیلتر بر اساس نوع غذا
          </p>
          <input 
            type="text"
            placeholder="جستجوی دسته بندی غذا"
            v-model="filterInput"
            class="restaurant-search-filters-input"
          >
          <fragment v-if="filteredFoodTypes.length">
            <div 
              class="restaurant-search-filters-checkbox p-check"
              v-for="(foodType, index) in filteredFoodTypes"
              :key="index" :class="{'selected' : index+1==selectedFoodTypes.length}"
            >
              
              <p-check 
                :name="`check-${foodType.slug}`" 
                color="danger" 
                v-model="selectedFoodTypes"
                class="p-svg p-curve p-smooth"
                :value="foodType.slug"
                :key="`check-${foodType.slug}-${foodType.selected}`"
                
              >
                {{ `${foodType.foodType} (${foodType.restaurantsCount})` }}
                <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                  <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                      style="stroke: white;fill:white">
                  </path>
                </svg>
              </p-check>
              
            </div>
          </fragment>
          <fragment v-else>
            <p class="restaurant-search-filters-input">
              نوع غذا مورد نظر شما یافت نشد.
            </p>
          </fragment>
        </div>
      </div>
      <div class="restaurant-search-results-container">
        <fragment v-if="restaurantsCount">
          <row v-show="openRestaurantsCount">
            <column
              width="50"
              v-for="(restaurant, index) in openRestaurants"
              :key="index"
            >
              <restaurant-card-two
                :name="restaurant.name"
                :slug="restaurant.slug"
                :logo="restaurant.logo"
                :foodTypes="restaurant.foodTypes"
                :averageRating="restaurant.totalRating.averageRating"
                :commentsCount="restaurant.comments.length"
                :address="restaurant.address.address"
              />
            </column>
          </row>
          <row v-show="closedRestaurantsCount">
            <column width="100">
              <h3> رستوران های بسته </h3>
            </column>
            <column
              width="50"
              v-for="(restaurant, index) in closedRestaurants"
              :key="index"
            >
              <restaurant-card-two
                :name="restaurant.name"
                :slug="restaurant.slug"
                :logo="restaurant.logo"
                :foodTypes="restaurant.foodTypes"
                :averageRating="restaurant.totalRating.averageRating"
                :commentsCount="restaurant.comments.length"
                :address="restaurant.address.address"
                :isClosed="restaurant.isClosed"
                :openingTime="restaurant.openingTime"
              />
            </column>
          </row>
        </fragment>
        <row 
          v-else
        >
          <column width="100" class="text-center">
            <div class="restaurant-search-results-empty">
              <img src="/assets/images/empty-results-1x.png">
              <p>
                رستورانی با این مشخصات یافت نشد. برای دیدن نتایج، محدوده یا فیلتر های خود را تغییر دهید.
              </p>
              <button
                @click.prevent="clearFilters()"
              >
                حذف فیلتر ها
              </button>
            </div>
          </column>
        </row>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapGetters } from 'vuex';
  import RestaurantCardTwo from '@/components/restaurant/RestaurantCardTwo.vue';
  import $ from 'jquery';
  export default {
    name: "RestaurantSearch",
    data: () => ({
      searchInput: '',
      filterInput: '',
      selectedFoodTypes: [],
    }),
    created(){
      this.$store.dispatch(
        'getAreaRestaurants', 
        this.$route.params.areaSlug
      );
      this.$store.dispatch('getFoodTypesByCityArea', {
        areaSlug: this.$route.params.areaSlug,
        citySlug: this.$route.params.citySlug,
        countsOnly: true,
      });
      this.getFilteredAreaRestaurants();
    },
    components: {
      RestaurantCardTwo,
    },
    watch: {
      
      selectedFoodTypes(newValue){
      
        /*let num = this.selectedFoodTypes.length;
        $(".restaurant-search-filters-checkbox").removeClass('selected')
        $($(".restaurant-search-filters-checkbox").get(num-1)).addClass('selected')*/
      
        this.$store.commit(
          'TOGGLE_FOOD_TYPES_SELECTION',
          newValue
        );
        this.getFilteredAreaRestaurants();
      },
    },

    computed: {
      ...mapGetters([
        'areaRestaurantsGetter',
        'filteredAreaRestaurantsGetter',
        'foodTypesByAreaGetter',
      ]),
      areaRestaurants() {
        if (this.areaRestaurantsGetter.length) {
          return this.areaRestaurantsGetter[0];
        }
        return undefined;
      },
      filteredAreaRestaurants() {
        return this.filteredAreaRestaurantsGetter(this.searchInput);
      },
      locationData() {
        if (this.areaRestaurants) {
          return {
            city: this.areaRestaurants.city.city,
            citySlug: this.$route.params.citySlug,
            area: this.areaRestaurants.area,
            areaSlug: this.$route.params.areaSlug,
          };
        }
        return {};
      },
      restaurantsCount(){
        return this.filteredAreaRestaurants.length;
      },
      openRestaurants() {
        return this.filteredAreaRestaurants.filter(
          restaurant => restaurant.isClosed === false
        );
      },
      openRestaurantsCount() {
        return this.openRestaurants.length;
      },
      closedRestaurants() {
        return this.filteredAreaRestaurants.filter(
          restaurant => restaurant.isClosed
        );
      },
      closedRestaurantsCount() {
        return this.closedRestaurants.length;
      },
      headerText() {
        return `${this.restaurantsCount} عدد رستوران امکان سرویس دهی به ${this.locationData.city}، ${this.locationData.area} را دارند.`
      },
      filteredFoodTypes(){
        return this.foodTypesByAreaGetter(this.filterInput);
      }
    },
    methods : {
      getFilteredAreaRestaurants(){
        this.$store.dispatch('getFilteredAreaRestaurants', {
          area: this.$route.params.areaSlug,
          category: this.selectedFoodTypes,
        });
      },
      clearFilters(){
        this.searchInput = "";
        this.filterInput = "";
        this.selectedFoodTypes = [];
      },
    },
  }
</script>
