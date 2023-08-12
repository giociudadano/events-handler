<template>
  <div class="hero is-fullheight is-white-1">
    <div class="hero-body hero-body-padding-small">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-3">
            <div class="box">
              <div v-show="loading.dropdown">
                <div class="loader is-loading"></div>
              </div>
              <div v-show="!loading.dropdown && !views.dropdown">
                <p id="error-handler" class="error-handler"></p>
              </div>
              <div v-if="views.dropdown">
                <div class="field">
                  <label class="label is-small">Event Name</label>
                  <input
                    class="input is-small is-primary"
                    type="text"
                    :value="event.event_name"
                    disabled
                  />
                </div>
                <div class="field">
                  <label class="label is-small">Select Booth</label>
                  <div class="control is-expanded">
                    <div class="select is-link is-small is-fullwidth">
                      <select id="booth-selector" @change="onBoothChange">
                        <option>Select a booth</option>
                        <option
                          v-for="booth in event.booths"
                          :value="booth"
                          :key="booth"
                        >
                          {{ booth }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-primary is-small">
                    <router-link
                      :to="`/checker/${this.event.event_name}/${this.input.selectedBooth}`"
                      style="color: white"
                      >Go to Booth</router-link
                    >
                  </button>
                </div>
              </div>
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

.error-handler {
  font-size: 12px;
  font-weight: 700;
  color: #f14668;
  line-height: 1rem;
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
      input: {
        selectedBooth: null
      },
      event: {},
      views: {
        dropdown: false
      },
      loading: {
        dropdown: true
      }
    };
  },
  methods: {
    async getEvents() {
      this.event = await new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:8081/api/getEvents?event=${this.params.event}`)
          .then(response => {
            console.log('this should run if success');
            this.views.dropdown = true;
            resolve(response.data.data);
          })
          .catch(error => {
            if (error.message == 'Network Error') {
              reject(
                'There was an error with your connection to the server. Please try again later.'
              );
            } else if (error.response) {
              reject(error.response.data.error);
            } else {
              reject(error.message);
            }
          })
          .finally(() => {
            this.loading.dropdown = false;
          });
      }).catch(error => {
        let errorHandler = document.getElementById('error-handler');
        errorHandler.innerText = error;
      });
    },
    async onBoothChange() {
      let boothSelector = document.getElementById('booth-selector');
      if (boothSelector != 'Select a booth') {
        this.input.selectedBooth = boothSelector.value;
      }
    }
  },
  mounted() {
    this.params.event = this.$route.params.event;
    this.getEvents();
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
