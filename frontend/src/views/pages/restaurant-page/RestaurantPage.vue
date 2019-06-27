<template>
  <fragment>
    <section class="restaurant-header">
      <div class="restaurant-cover">
        <img 
          v-show="restaurant"
          :src="restaurant.coverImage" 
          :alt="restaurant.name" 
          class="restaurant-cover-image"
        >
        <nav class="restaurant-top-navigation-container">
          <div class="restaurant-top-navigation">
            <bread-crumb 
              :cityAreaPath="backButtonPath"
              :cityAreaLabel="cityAreaLabel"
              :restaurantName="restaurant.name"
            />
            <back-button 
              :path="backButtonPath"
              label="رستوران ها"
            />
          </div>
        </nav>
      </div>
      <div class="restaurant-card">
        <restaurant-card-primary
          v-show="restaurant"
          :name="restaurant.name"
          :slug="restaurant.slug"
          :logo="restaurant.logo"
          :foodTypes="restaurant.foodTypes"
          :averageRating="restaurant.totalRating.averageRating"
          :comments="restaurant.comments"
          :address="restaurant.address"
        />
      </div>
    </section>
    <div sticky-container>
      <div class="restaurant-menu-sticky-container">
        <div 
          class="restaurant-navigation-container" 
          v-sticky sticky-offset="offset" 
          sticky-side="top" 
          sticky-z-index="200"
        >
          <scrollactive 
            class="restaurant-navigation" 
            :offset="100"
          >
            <li
              v-for="(section, index) in pageContent.restaurantSections"
              :key="index"
              class="restaurant-navigation-item"
            >
              <a 
                class="restaurant-navigation-link scrollactive-item" 
                :href="section.sectionHref"
              >
                {{ section.sectionTitle }}
              </a>
            </li>
          </scrollactive>
        </div>
      </div>
      <section 
        id="restaurant-menu" 
        class="restaurant-menu-container" 
        sticky-container
      >
        <div class="restaurant-menu-search-container">
          <md-field md-inline md-clearable>
            <label>{{ searchInputLabel }}</label>
            <md-input v-model="searchInput" @focus="handleFocus" @focusout="handleFocusOut"></md-input>
          </md-field>
        </div>
        <div class="restaurant-food-type-container">
          <div 
            v-sticky  
            sticky-side="top" 
            sticky-z-index="200" 
            class="restaurant-food-type-navigation" 
            :sticky-offset="{top:'100px'}"
          >
            <scrollactive  
              :offset="100" 
              :highlightFirstItem="true"
            >
              <li 
                class="restaurant-food-type-navigation-item"
                v-for="(foodType, index) in menuGroupByFoodType"
                :key="index"
              >
                <a 
                  :href="`#${foodType._id}`" 
                  class="scrollactive-item"
                >
                  {{ foodType.foodType }}
                </a>
              </li>
            </scrollactive>
          </div>
        </div>
        <div class="restaurant-food-type-menu-container">
          <row
            v-for="(foodType, index) in menuGroupByFoodType"
            :key="index"  
          >
            <column 
              width="100" 
              :id="foodType._id"
            >
              <h1 class="restaurant-menu-food-type"> {{ foodType.foodType }} </h1>
            </column>
            <fragment
              v-if="foodType.foods.length"
              >
              <column 
                width="50"
                v-for="(foodItem, index) in foodType.foods"
                :key="index"
              >
                <food-item 
                  :name="foodItem.name"
                  :price="foodItem.price"
                  :ingredients="foodItem.ingredients"
                />
              </column>
            </fragment>
            <column 
              width="100"
              v-else
            >
              <p>آیتم مورد نظر شما در این قسمت یافت نشد.</p>
            </column>
          </row>
        </div>
      </section>
      <section id="restaurant-info" class="restaurant-info-container">
        <row>
          <column width="100">
            <div class="restaurant-section-title">
              <h1>اطلاعات رستوران</h1>
            </div>
          </column>
        </row>
        <row>
          <column width="100">
            <restaurant-info-card
              :name="restaurant.name"
              :address="restaurant.address.address"
              :openingTime="restaurant.openingTime"
              :closingTime="restaurant.closingTime"
            />
          </column>
        </row>
      </section>
      <section id="restaurant-comments" class="restaurant-comments-container">
        <row>
          <column width="100">
            <div class="restaurant-section-title">
              <h1>نظرات کاربران</h1>
            </div>
            <p>شما هم می‌توانید بعد از سفارش از این رستوران، نظر خود را درباره‌ی این رستوران ثبت کنید.</p>
          </column>
        </row>
        <row>
          <column width="100">
            <restaurant-rating-card
              :averageRating="restaurant.totalRating.averageRating"
              :averageQualityRating="restaurant.totalRating.averageQualityRating"
              :averageDeliveryRating="restaurant.totalRating.averageDeliveryRating"
              :averagePackagingRating="restaurant.totalRating.averagePackagingRating"
              :commentsCount="restaurant.comments.length"
            />
          </column>
          <column 
            width="100"
            v-for="(comment, index) in restaurant.comments"
            :key="index"
          >
            <comment-card
              :averageRating="comment.rating"
              :author="comment.author.fullname"
              :comment="comment.comment"
              :createdAt="comment.createdAt"
            />
          </column>
        </row>
      </section>
    </div>
  </fragment>
</template>
<script>
  import { mapGetters } from 'vuex';
  import pageContent from './pageContent.json';
  import RestaurantCardPrimary from '@/components/restaurant/RestaurantCardPrimary';
  import FoodItem from '@/components/food-item/FoodItem.vue';
  import RestaurantInfoCard from '@/components/restaurant/RestaurantInfoCard.vue';
  import RestaurantRatingCard from '@/components/restaurant/RestaurantRatingCard.vue';
  import CommentCard from '@/components/comment/CommentCard.vue';
  import BackButton from '@/components/navigations/BackButton.vue';
  import BreadCrumb from '@/components/navigations/BreadCrumb.vue';

  export default {
    name: "RestaurantPage",
    data: () => ({
      pageContent,
      searchInput: "",
      searchInputLabel: "جستجو در منوی این رستوران",
    }),
    components: {
      RestaurantCardPrimary,
      FoodItem,
      RestaurantInfoCard,
      RestaurantRatingCard,
      CommentCard,
      BackButton,
      BreadCrumb,
    },
    computed: {
      ...mapGetters({
        restaurantGetter: 'cityRestaurantGetter',
      }),
      restaurantSlug() {
        return this.$route.params.restaurantSlug;
      },
      restaurant(){
        return this.restaurantGetter(this.restaurantSlug);
      },
      menuGroupByFoodType(){
        if (this.restaurant) {
          const searchInput = this.searchInput;
          return this.restaurant.foodTypes.map((foodType) => {
            const foods = this.restaurant.menu.filter(menuItem => {
              if (menuItem.foodType._id === foodType._id 
              && (new RegExp(searchInput.toLowerCase())).test(menuItem.name.toLowerCase()) ) {
                return true;
              }
              return false;
            }); 
            return {
              foodType: foodType.foodType,
              _id: foodType._id,
              foods,
            };
          });
        }
        return [];
      },
      backButtonPath() {
        if (this.restaurant) {
          const citySlug = this.restaurant.address.area.city.slug;
          const areaSlug = this.restaurant.address.area.slug;
          return `/${citySlug}/${areaSlug}`;
        }
        return '/';
      },
      cityAreaLabel() {
        if (this.restaurant) {
          const city = this.restaurant.address.area.city.city;
          const area = this.restaurant.address.area.area;
          return `${city}، ${area}`;
        }
        return '';
      },
    },
    methods: {
      handleFocus() {
        this.searchInputLabel = "مثلا چلو کباب";
      },
      handleFocusOut() {
        this.searchInputLabel = "جستجو در منوی این رستوران"
      }
    }
  }
</script>


