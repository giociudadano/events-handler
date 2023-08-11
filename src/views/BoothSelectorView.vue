<template>
  <div class="container">
    <div class="about">
      <br /><br /><br />
      <div class="box">
        Event Name: {{ eventName }} <br />
        <label for="boothSelector">Select Booth:</label>
        <div class="dropdown is-active">
          <div class="dropdown-trigger">
            <div class="select">
              <select v-model="selectedBooth" id="boothSelector">
                <option v-for="booth in booths" :value="booth" :key="booth">
                  {{ booth }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button class="button is-primary">
          <router-link :to="`/checker/${eventName}/${selectedBooth}`"
            >Go to Booth</router-link
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const eventName = ref('');
const booths = ref([]);
const selectedBooth = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(
      'http://localhost:8081/api/getEvents?event=Event%20A'
    ); // Replace with the actual API URL
    const data = response.data.data;
    eventName.value = data.event_name;
    booths.value = data.booths;
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
</script>
