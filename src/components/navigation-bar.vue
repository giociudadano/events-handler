<template>
  <nav
    class="navbar is-fixed-top is-white"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" :href="links.home">
        <img class="website-icon" height="32" :src="images.icon" />
        <p class="website-name">
          EVENTS<span class="text-green">.HANDLER</span>
        </p>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" :href="links.home">Home</a>
        <a class="navbar-item" :href="links.registration">Registration</a>
        <a class="navbar-item" :href="links.search">Search</a>
        <a class="navbar-item" :href="links.booths">Booths</a>
        <a class="navbar-item" :href="links.souvenir">Souvenirs</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" :href="links.donation">
              <span class="icon">
                <i class="fas fa-heart"></i>
              </span>
              <span><strong>Make a donation</strong></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.text-green {
  color: rgb(68, 187, 136);
}

.website-name {
  margin-left: 1.5rem;
  text-transform: uppercase;
  font-family: 'Bahnschrift Semicondensed';
  font-weight: 800;
  font-size: 1.5rem;
  color: rgb(80, 80, 80);
}

.navbar {
  padding: 0rem 2rem;
}

.navbar-item {
  font-family: 'Bahnschrift';
  font-weight: 400;
  font-size: 16px;
  color: rgb(225, 225, 225);
  letter-spacing: -0.5px;
  cursor: pointer;
}

.navbar-start > .navbar-item {
  margin-left: 1.5rem;
}

.button.is-primary {
  background-color: rgb(68, 187, 136) !important;
}
</style>

<script>
export default {
  data() {
    return {
      images: {
        icon: require('@/assets/icon.png')
      },
      links: {
        home: '/',
        registration: '/register',
        search: '/search',
        booths: '/checker',
        souvenir: '/souvenir',
        donation: 'https://www.buymeacoffee.com'
      }
    };
  }
};
</script>
