<template>
  <section class="hero is-fullheight is-white-1">
    <div class="about">Event Name: {{ $store.state.eventName }} <br /></div>
  </section>
</template>

<style>
.is-white-1 {
  background-color: rgb(245, 245, 245);
}
</style>

<script setup>
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();

axios
  .get('http://localhost:8081/api/getEvents')
  .then(response => {
    const data = response.data.data;
    store.commit('setEventName', data.event_name);
    console.log('Event Name from Vuex:', store.state.eventName); // Use Vuex
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
</script>
