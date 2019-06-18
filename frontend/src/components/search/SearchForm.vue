<template>
  <div class="search-state-form mb-5">
    <form>
      <row>
        <column width="20">
          <select v-model="selectedCity">
            <option disabled value="">
              {{citiesCount}}
            </option>
            <option 
              v-for="(option, index) in cityOptions" 
              :value="option.value"
              :key="index"
            >
              {{ option.text }}
            </option>
          </select>
        </column>
        <column width="80">
          <v-autocomplete 
            :items="searchInput.items" 
            v-model="selectedArea" 
            :component-item='searchInput.template' 
            :input-attrs="searchInput.attributes"
            :get-label='getLabel'
            :auto-select-one-item="false"
            :min-len='0'
            @item-selected="itemSelected"
            @update-items='update'
          />
          <button
            :disabled="searchHistory.length === 0"
            type="submit" 
            @click.prevent="searchButtonClickHandler"
          >
            <i class="fa fa-search"></i>
          </button>
        </column>
      </row>
    </form>
    <div class="last-search" v-show="searchHistoryShow">
      <i class="fa fa-clock-o"></i>
      {{ lastSearchText }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SearchSuggestionTemplate from './SearchSuggestion.vue';
  export default {
    name: "SearchForm",
    created(){
      this.filterCityAreas();
    },
    data: () => ({
      selectedCity: "tehran",
      selectedArea: null,
      searchHistory: [],
      searchInput: {
        items: [],
        searchTerm: "",
        attributes: {
          placeholder: "مثلا سعادت آباد",
        },
        template: SearchSuggestionTemplate,
      },
      
    }),
    components: {
    },
    watch: {
      'searchInput.searchTerm': function(newValue){
        this.filterCityAreas(newValue);
      },
      selectedCity(newValue){
        this.selectedArea = null;
        this.filterCityAreas();
        this.$store.commit('SET_SELECTED_CITY', {
          selectedCity: newValue
        });
        this.$store.dispatch('getCityRestaurants', newValue);
      },
      cityAreas(){
        this.filterCityAreas();
      }
    },
    computed: {
      ...mapGetters({
        cities: 'citiesGetter',
        cityBySlugGetter: 'cityBySlugGetter',
      }),
      defaultSelectedCity(){
        return (this.cities.length)
          ? this.cities[0].name
          : "";
      },
      cityOptions() {
        return this.cities.map(({city, slug}) => ({
          text: city,
          value: slug,
        }));
      },
      citiesCount(){
        return `(${this.cityOptions.length}) شهر تحت پوشش`;
      },
      cityAreas(){
        const selectedCity = this.cityBySlugGetter(this.selectedCity);
        if (selectedCity) {
          const {
          areas
        } = selectedCity;
        return areas;
        }
        return [];
      },
      searchHistoryShow(){
        return (this.searchHistory.length === 2)? true : false;
      },
      lastSearchText(){
        return (this.searchHistoryShow)
          ? `آخرین جستجو: ${this.searchHistory[0].city}, ${this.searchHistory[0].area}`
          : '';
      }
    },
    methods: {
      getLabel (area) {
        if (area) {
          return area.area
        }
        return '';
      },
      filterCityAreas(areaFilter){
        if (this.cityAreas) {
          if (this.cityAreas.length && areaFilter) {
            const filteredCityAreas = 
              this.cityAreas.filter(
                area => (new RegExp(areaFilter.toLowerCase())).test(area.area.toLowerCase())
              );
            if (filteredCityAreas.length === 0) {
              this.$store.commit('SET_ERROR', {
                error: 'نیجه ای پیدا نشد',
              });
            }
            this.searchInput.items = filteredCityAreas;
          }else{
            this.searchInput.items = this.cityAreas;
          }
        }
      },
      update (searchTerm) {
        this.searchInput.searchTerm = searchTerm;
      },
      itemSelected({area, slug}){
        this.searchHistory.push({
            city: this.cityOptions.find(
              ({value}) => value === this.selectedCity
            ).text,
            citySlug: this.selectedCity,
            area,
            areaSlug: slug,
          },
        );
        if (this.searchHistory.length >= 3) {
          this.searchHistory.shift();
        }
      },
      searchButtonClickHandler(){
        const searchHistoryLength = this.searchHistory.length;
        this.$router.push({ 
          name: 'restaurantSearch', 
          params: { 
            citySlug: this.searchHistory[searchHistoryLength - 1].citySlug,
            areaSlug: this.searchHistory[searchHistoryLength - 1].areaSlug,
          },
        });
      }
    }
  }
</script>

