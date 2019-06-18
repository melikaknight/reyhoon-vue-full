/*
import { httpClient } from '@/services/httpClient';
  Actions are similar to mutations, the differences being that:
  . Instead of mutating the state, actions commit mutations.
  . Actions can contain arbitrary asynchronous operations.
*/
import qs from 'qs';

const actions = {
  /*
  Action handlers receive a context object which exposes the same set of methods/properties on the store instance, so you can call context.commit to commit a mutation, or access the state and getters via context.state and context.getters. We can even call other actions with context.dispatch
  In practice, we often use ES2015 argument destructuring to simplify the code a bit (especially when we need to call commit multiple times
  */
  async callAPI({ state, commit }, request) {
    try {
      const response = await state.httpClient({
        url: request.url,
        method: request.method || 'get',
        data: request.data || {},
        params: request.params || {},
        timeout: 5000,
        paramsSerializer: (params) => qs.stringify(
          params, {
            arrayFormat: 'comma',
            indices: false,
          },
        ),
      });
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    } catch (error) {
      commit('SET_ERROR', {
        error: error.response.data.message,
        },
      );
      return Promise.reject(error.response.data);
    }
  },
  async getCities ({ dispatch, commit }) {
    const cities = await dispatch('callAPI', {
      url: '/cities',
    });
    commit('SET_CITIES', {
      cities,
    });
  },
  async getCityRestaurants ({ state, dispatch, commit }, citySlug = state.selectedCity) {
    const cityRestaurants = await dispatch('callAPI', {
      url: `/cities/${citySlug}`,
    });
    commit('SET_CITY_RESTAURANTS', {
      cityRestaurants,
    });
  },
  async getAreaRestaurants ({ dispatch, commit }, areaSlug) {
    const areaRestaurants = await dispatch('callAPI', {
      url: `/areas/${areaSlug}`,
    });
    commit('SET_AREA_RESTAURANTS', {
      areaRestaurants,
    });
  },
  async getFilteredAreaRestaurants ({ dispatch, commit }, params) {
    const filteredAreaRestaurants = await dispatch('callAPI', {
      url: `/restaurants`,
      params,
    });
    commit('SET_FILTERED_AREA_RESTAURANTS', {
      filteredAreaRestaurants,
    });
  },
  async getFoodTypes ({ dispatch, commit }, citySlug) {
    const foodTypes = await dispatch('callAPI', {
      url: `/foodTypes`,
      params: {
        citySlug,
      },
    });
    commit('SET_FOOD_TYPES', {
      foodTypes,
    });
  },
  async getFoodTypesByCityArea ({ dispatch, commit }, payload) {
    const {
      citySlug,
      areaSlug,
      countsOnly = true
    } = payload;

    const foodTypes = await dispatch('callAPI', {
      url: `/foodTypes`,
      params: {
        citySlug,
        areaSlug,
        countsOnly,
      },
    });
    commit('SET_FOOD_TYPES_BY_AREA', {
      foodTypes,
    });
  },
};

export default actions;