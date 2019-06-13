<template>
  <section class="what-food container">
    <h2 class="main-title mb-2 text-center">
      {{ content.sectionTitle }}
    </h2>
    <div class="main-subtitle mb-3 text-center">
      {{ content.sectionSubTitle }}
    </div>
      <row>
        <column 
          width="25" 
          class="mb-2"
          v-for="(featuredFoodType, index) in featuredFoodTypes"
          :key="index"
        >
          <food-type-card 
            :foodType="featuredFoodType.foodType"
            :slug="featuredFoodType.slug"
            :restaurantsCount="featuredFoodType.restaurantsCount"
            :cardImageUrl="featuredFoodType.cardImageUrl"
          />
        </column>
      </row>
    <div class="main-subtitle mb-3 text-center">
      {{ content.sectionSubTitle2 }}
    </div>
    <div class="text-center">
      <food-type-tag
        v-for="(regularFoodType, index) in regularFoodTypes"
        :key="index" 
        :foodType="regularFoodType.foodType"
        :slug="regularFoodType.slug"
      />
    </div>
  </section>
</template>
<script>
  import { mapState, mapGetters } from 'vuex';
  import FoodTypeCard from '@/components/food-type/FoodTypeCard.vue';
  import FoodTypeTag from '@/components/food-type/FoodTypeTag.vue';
  import sectionContent from './sectionContent.json';
  export default {
    name: "ReyhoonAppSection",
    data: () => ({
      content: sectionContent,
      foodTypes: [],
    }),
    mounted() {
      this.getFoodTypesByCity();
    },
    components: {
      FoodTypeCard,
      FoodTypeTag,
    },
    watch: {
      selectedCity(newValue){
        if (newValue) {
          this.getFoodTypesByCity();
        }
      },
    },
    computed: {
      ...mapState([
        'selectedCity',
      ]),
      ...mapGetters({
        featuredFoodTypes: 'featuredFoodTypesGetter',
        regularFoodTypes: 'regularFoodTypesGetter',
      }),
    },
    methods: {
      getFoodTypesByCity(){
        this.$store.dispatch(
          'getFoodTypes',
          this.selectedCity,
        );
      },
    }
  }
</script>

