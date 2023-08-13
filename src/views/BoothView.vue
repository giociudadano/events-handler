<template>
  <!-- Bind the background image based on imageUrl -->
  <div class="is-tablet background-image">
    <img :src="imageUrl" alt="Event Background" />
  </div>
  <div class="hero is-fullheight is-white-1">
    <div class="hero-body hero-body-padding-small">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-3">
            <div class="box">
              <div v-show="loading.information">
                <div class="loader is-loading"></div>
              </div>
              <div v-show="!loading.information && !views.information">
                <p id="error-handler" class="error-handler"></p>
              </div>
              <div v-if="views.information">
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
                  <label class="label is-small">Booth Name</label>
                  <input
                    class="input is-small is-link"
                    type="text"
                    :value="booth.booth_name"
                    disabled
                  />
                </div>
                <!-- <p>{{ error }}</p>
                <p>{{ decodedString }}</p> -->
                <div class="field">
                  <label class="label is-small">Manual Input</label>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="manualInput"
                  />
                </div>

                <button
                  @click="submitManualInput"
                  class="button is-link is-small"
                >
                  Submit ID
                </button>
                <br /><br />
                <button
                  @click="startQRScanner"
                  v-if="!qrScannerActive"
                  class="button is-link is-small"
                >
                  Start QR Scanner
                </button>
                <button
                  @click="stopQRScanner"
                  v-if="qrScannerActive"
                  class="button is-link is-small"
                >
                  Stop QR Scanner
                </button>
              </div>
            </div>
          </div>
          <div class="column is-6" v-if="qrScannerActive">
            <div class="box">
              <div v-if="loading.camera">
                <div class="loader is-loading"></div>
              </div>
              <div v-show="!loading.camera">
                <p>{{ error }}</p>
                <qrcode-stream
                  @init="onInit"
                  @decode="onDecode"
                ></qrcode-stream>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--
  <div class="container">
    
  </div>
--></template>

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
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Place the background image behind other content */
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script>
import axios from 'axios';
import { QrcodeStream } from 'vue3-qrcode-reader';

export default {
  data() {
    return {
      params: {
        event: null,
        booth: null
      },
      views: {
        information: false
      },
      loading: {
        information: true,
        camera: true
      },
      event: {},
      booth: {},
      qrScannerActive: false,
      error: '',
      decodedString: '',
      torch: false,
      imageUrl: '',
      manualInput: '' // New imageUrl property
    };
  },
  components: {
    QrcodeStream
  },
  methods: {
    async fetchEventAndSetImageUrl(eventParams) {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/getEvents?event=${eventParams}`
        );
        const eventData = response.data.data;

        // Set the event data directly in the component
        this.event = eventData;

        // Determine which background image to use based on the device
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const imageFileName = isMobile
          ? eventData.event_background.mobile
          : eventData.event_background.desktop;

        const imageUrl = require(`@/assets/${imageFileName}`);
        this.imageUrl = imageUrl; // Set the imageUrl directly in the component data
        this.$store.commit('setEventNameError', false);
      } catch (error) {
        this.$store.commit('setEventNameError', true);
        // Handle other errors...
      } finally {
        this.loading.information = false;
      }
    },
    async getBooths() {
      this.booth = await new Promise((resolve, reject) => {
        axios
          .get(
            `http://localhost:8081/api/getBooths?event=${this.params.event}&booth=${this.params.booth}`
          )
          .then(response => {
            this.views.information = true;
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
            this.loading.information = false;
          });
      }).catch(error => {
        let errorHandler = document.getElementById('error-handler');
        errorHandler.innerText = error;
      });
    },
    // startQRScanner() {
    //   this.loading.camera = true;
    //   this.qrScannerActive = true;
    // },
    // stopQRScanner() {
    //   this.qrScannerActive = false;
    //   this.decodedString = ''; // Clear decoded string when stopping
    // },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'user denied camera access permission';
        } else if (error.name === 'NotFoundError') {
          this.error = 'no suitable camera device installed';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'page is not served over HTTPS (or localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'maybe camera is already in use';
        } else if (error.name === 'OverconstrainedError') {
          this.error =
            ' did you requested the front camera although there is none?';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'browser seems to be lacking features';
        }
      } finally {
        this.loading.camera = false;
      }
    },
    // onDecode(decodedString) {
    //   this.decodedString = decodedString;
    //   //window.location.replace(decodedString)
    // },
    // async checkInGuest() {
    //   try {
    //     const requestData = {
    //       user_id: this.manualInput, // Assuming manualInput contains the user ID
    //       event_name: this.event.event_name,
    //       booth_name: this.booth.booth_name,
    //       timestamp: new Date().toISOString()
    //     };

    //     const response = await axios.post(
    //       'http://localhost:8081/api/checkInBooth',
    //       requestData
    //     );

    //     // Handle the response data (show guest/voucher details, etc.)
    //     console.log('Check-in response:', response.data);
    //   } catch (error) {
    //     // Handle errors...
    //     console.error('Check-in error:', error);
    //   }
    // },

    async startQRScanner() {
      // Request camera permission here
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error('Camera access denied:', error);
        return;
      }

      this.loading.camera = true;
      this.qrScannerActive = true;
    },

    async onDecode(decodedString) {
      // Assuming decodedString contains the user ID
      this.decodedString = decodedString;
      this.manualInput = decodedString; // Populate the manualInput field
    },

    async submitManualInput() {
      if (this.manualInput) {
        await this.checkInGuest(this.manualInput);

        // Close the QR scanner camera
        this.qrScannerActive = false;
      }
    },

    async checkInGuest(userId) {
      try {
        const requestData = {
          user_id: userId,
          event_name: this.event.event_name,
          booth_name: this.booth.booth_name,
          timestamp: new Date().toISOString()
        };

        const response = await axios.post(
          'http://localhost:8081/api/checkInBooth',
          requestData
        );

        // Handle the response data (show guest/voucher details, etc.)
        console.log('Check-in response:', response.data);
      } catch (error) {
        // Handle errors...
        console.error('Check-in error:', error);
      }
    }
  },
  mounted() {
    this.params.event = this.$route.params.event;
    this.params.booth = this.$route.params.booth;
    this.fetchEventAndSetImageUrl(this.params.event); // Change this line
    this.getBooths();
  }
};
</script>
