<template>
  <div
    v-if="!loading.dropdown && views.dropdown"
    :style="{ backgroundImage: `url(${imageUrl})` }"
    class="is-tablet"
  >
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
                    <router-link
                      :is="
                        $store.state.selectedBooth === null
                          ? 'span'
                          : 'router-link'
                      "
                      :to="`/checker/${event.event_name}/${$store.state.selectedBooth}`"
                      style="color: white"
                    >
                      <button
                        class="button is-primary is-small"
                        :disabled="$store.state.selectedBooth === null"
                      >
                        Go to Booth
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['event', 'loading', 'views']),
    imageUrl() {
      return this.$store.state.imageUrl;
    }
  },
  methods: {
    ...mapActions(['fetchEvent']),
    ...mapMutations(['setSelectedBooth']),
    async onBoothChange() {
      let boothSelector = document.getElementById('booth-selector');
      if (boothSelector.value !== 'Select a booth') {
        this.$store.dispatch('onBoothChange', boothSelector.value);
      } else {
        this.$store.dispatch('clearSelectedBooth');
      }
    }
  },
  async mounted() {
    this.fetchEvent('Event A');
    try {
      await this.fetchEvent('Event A');
    } catch (error) {
      let errorHandler = document.getElementById('error-handler');
      errorHandler.innerText =
        'An error occurred while loading the event data.';
    }
  }
};
</script>
