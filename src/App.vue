<template>
  <navigation-bar />
  <router-view />
  <!-- <homeView />
  <boothSelector />
  <boothView /> -->
</template>

<style lang="scss">
@import 'bulma/css/bulma.css';
</style>

<script>
import navigationBar from './components/navigation-bar.vue';
// import boothSelector from './views/BoothSelectorView.vue';
// import boothView from './views/BoothView.vue';
// import homeView from './views/HomeView.vue';

export default {
  name: 'App',
  components: {
    navigationBar
    // homeView,
    // boothSelector,
    // boothView
  },
  mounted() {
    const plugin = document.createElement('script');
    plugin.setAttribute(
      'src',
      'https://use.fontawesome.com/releases/v5.4.0/js/all.js'
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
