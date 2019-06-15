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
      </div>
      <div class="restaurant-card">
        <restaurant-card-primary
          v-show="restaurant"
          :name="restaurant.name"
          :slug="restaurant.slug"
          :logo="restaurant.logo"
          :foodTypes="restaurant.foodTypes"
          :averageRating="restaurant.averageRating"
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
                v-for="(foodType, index) in restaurant.foodTypes"
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
        <div class="restaurant-menu-search-container">
          <input type="text" name="s" placeholder="مثلا چلوکباب">
          <button type="submit"><i class="fa fa-search"></i></button>
        </div>
        <div class="restaurant-food-type-menu-container">
          <row
            v-for="(menuItem, index) in restaurant.menu"
            :key="index"  
          >
            <column 
              width="100" 
              :id="menuItem.foodType._id"
            >
              <h1> {{ menuItem.foodType.foodType }} </h1>
            </column>
            <column width="50">
              <food-item 
                :name="menuItem.name"
                :price="menuItem.price"
                :ingredients="menuItem.ingredients"
                :image="menuItem.image_url"
              />
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
              :averageRating="restaurant.averageRating"
              :averageQualityRating="3.2"
              :averageDeliveryRating="4.7"
              :averagePackagingRating="5"
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

  export default {
    name: "RestaurantPage",
    data: () => ({
      pageContent,
    }),
    components: {
      RestaurantCardPrimary,
      FoodItem,
      RestaurantInfoCard,
      RestaurantRatingCard,
      CommentCard,
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
    }
  }
</script>


