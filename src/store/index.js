import { createStore } from 'vuex';

export default createStore({
  state: {
    eventName: '' // Initialize with an empty value
  },
  mutations: {
    setEventName(state, eventName) {
      state.eventName = eventName;
    }
  },
  actions: {},
  modules: {},
  getters: {}
});
