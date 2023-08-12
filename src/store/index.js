import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    event: {},
    loading: {
      dropdown: true,
      eventNameError: false // Add eventNameError state
    },
    views: {
      dropdown: false
    },
    selectedBooth: null,
    imageUrl: '' // Add imageUrl state
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
    },
    setImageUrl(state, imageUrl) {
      state.imageUrl = imageUrl;
    },
    setEventNameError(state, hasError) {
      state.loading.eventNameError = hasError;
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

        // Determine which background image to use based on the device
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const imageFileName = isMobile
          ? eventData.event_background.mobile
          : eventData.event_background.desktop;

        const imageUrl = require(`@/assets/${imageFileName}`);
        commit('setImageUrl', imageUrl);
        commit('setEventNameError', false);
      } catch (error) {
        commit('setEventNameError', true);
        // Handle other errors...
      } finally {
        commit('setLoading', false);
      }
    },
    onBoothChange({ commit }, booth) {
      commit('setSelectedBooth', booth);
    },
    clearSelectedBooth({ commit }) {
      commit('setSelectedBooth', null);
    }
  },
  getters: {
    isBoothSelected: state => state.selectedBooth !== null
  }
});
