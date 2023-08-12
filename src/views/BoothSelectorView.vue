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
                      :to="`/checker/${event.event_name}/${$store.state.selectedBooth}`"
                      style="color: white"
                    >
                      Go to Booth
                    </router-link>
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
// import axios from 'axios';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['event', 'loading', 'views'])
  },
  methods: {
    ...mapActions(['fetchEvent']),
    ...mapMutations(['setSelectedBooth']),
    async onBoothChange() {
      let boothSelector = document.getElementById('booth-selector');
      if (boothSelector.value !== 'Select a booth') {
        this.$store.commit('setSelectedBooth', boothSelector.value);
      }
    }
  },
  async mounted() {
    this.fetchEvent(this.$route.params.event);
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
