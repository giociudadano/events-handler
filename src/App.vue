<template>
  <navigation-bar />
  <router-view />
</template>

<style lang="scss">
@import 'bulma/css/bulma.css';
</style>

<script>
import navigationBar from './components/navigation-bar.vue';

export default {
  name: 'App',
  components: {
    navigationBar
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
