// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
export default createStore({
  state: {
    event: {},
    loading: {
      dropdown: true
    },
    views: {
      dropdown: false
    },
    selectedBooth: null
  },
  mutations: {
    setEvent(state, eventData) {
      state.event = eventData;
    },
    setLoading(state, isLoading) {
      state.loading.dropdown = isLoading;
    },
    setDropdownView(state, isDropdownVisible) {
      state.views.dropdown = isDropdownVisible;
    },
    setSelectedBooth(state, booth) {
      state.selectedBooth = booth;
    }
  },
  actions: {
    async fetchEvent({ commit }, eventParams) {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/getEvents?event=${eventParams}`
        );
        const eventData = response.data.data;
        commit('setEvent', eventData);
        commit('setDropdownView', true);
      } catch (error) {
        if (error.message === 'Network Error') {
          throw 'There was an error with your connection to the server. Please try again later.';
        } else if (error.response) {
          throw error.response.data.error;
        } else {
          throw error.message;
        }
      } finally {
        commit('setLoading', false);
      }
    }
  }
});
