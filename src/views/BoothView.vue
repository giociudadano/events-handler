<template>
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
                <p>{{ error }}</p>
                <p>{{ decodedString }}</p>

                <div class="field">
                  <label class="label is-small">Manually Input ID Number</label>
                  <input
                    class="input is-small"
                    type="text"
                    v-model="manualInput"
                  />
                </div>

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
      torch: false
    };
  },
  components: {
    QrcodeStream
  },
  methods: {
    async getEvents() {
      this.event = await new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:8081/api/getEvents?event=${this.params.event}`)
          .then(response => {
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
          .finally(() => {});
      }).catch(error => {
        let errorHandler = document.getElementById('error-handler');
        errorHandler.innerText = error;
      });
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
    startQRScanner() {
      this.loading.camera = true;
      this.qrScannerActive = true;
    },
    stopQRScanner() {
      this.qrScannerActive = false;
      this.decodedString = ''; // Clear decoded string when stopping
    },
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
    onDecode(decodedString) {
      this.decodedString = decodedString;
      //window.location.replace(decodedString)
    }
  },
  mounted() {
    this.params.event = this.$route.params.event;
    this.params.booth = this.$route.params.booth;
    this.getEvents();
    this.getBooths();
  }
};
</script>
