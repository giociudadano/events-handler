<template>
  <div class="hero is-fullheight is-white-1">
    <div class="hero-body hero-body-padding-small">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-3">
            <div class="box">
              <div v-show="!views.dropdown">
                <div class="loader is-loading"></div>
              </div>
              <div v-show="views.dropdown">
                <label class="label is-small">Event Name</label>
                <p>{{ event.event_name }}</p>
              </div>
              <!--
              <br />
              <label for="boothSelector">Select Booth:</label>
              <div class="dropdown is-active">
                <div class="dropdown-trigger">
                  <div class="select">
                    <select v-model="selectedBooth" id="boothSelector">
                      <option
                        v-for="booth in booths"
                        :value="booth"
                        :key="booth"
                      >
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
              -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.is-white-1 {
  background-color: rgb(235, 235, 235);
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      params: {
        event: null
      },
      event: {
        event_name: null
      },
      views: {
        dropdown: false
      }
    };
  },
  async mounted() {
    this.params.event = this.$route.params.event;
    this.event = await new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:8081/api/getEvents?event=${this.params.event}`)
        .then(response => {
          this.views.dropdown = true;
          resolve(response.data.data);
        })
        .catch(reject);
    });
  }
};
</script>

<!--
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const eventName = ref('');
const booths = ref([]);
const selectedBooth = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/getEvents?event=Event%20A`
    ); // Replace with the actual API URL
    const data = response.data.data;
    eventName.value = data.event_name;
    booths.value = data.booths;
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
</script>
-->
