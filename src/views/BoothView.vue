<template>
  <br /><br /><br /><br /><br /><br />
  <div class="container">
    <div class="box">
      <div class="about">Event Name: {{ eventName }}</div>
      <div class="about">Booth Id: {{ $route.params.boothId }}</div>
      <p>{{ error }}</p>
      <p>{{ decodedString }}</p>
    </div>
    <div class="box">
      <p>{{ error }}</p>
      <qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader';
export default {
  data() {
    return {
      error: '',
      decodedString: '',
      torch: false
    };
  },

  components: {
    QrcodeStream
  },
  methods: {
    async onInit() {
      try {
        // Do not await the promise here to ask for camera access permission every time
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
        // hide loading indicator
      }
    },
    onDecode(decodedString) {
      this.decodedString = decodedString;
      //window.location.replace(decodedString)
    }
  }
};
</script>
