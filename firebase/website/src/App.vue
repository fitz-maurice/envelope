<template>
  <!-- <div id="app" class="h-full font-body" :class="{ 'stop-scroll': modalOpen }"> -->
  <!-- <navigation v-if="showNav" :user="user" /> -->
  <!-- Transition -->
  <!-- <fade> -->
  <!-- <router-view :user="user" :logged-in="loggedIn" class="container pt-24" /> -->
  <!-- </fade> -->

  <!-- Modal Portal Target -->
  <!-- <portal-target -->
  <!-- @change="modalOpen = !modalOpen" -->
  <!-- name="modal" -->
  <!-- class="z-30" -->
  <!-- slim -->
  <!-- /> -->
  <!-- </div> -->
  <div class="flex flex-col justify-between h-screen">
    <nav class="w-full p-5 border-b shadow-md bg-white">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="mr-3 flex flex-row items-center">
          <envelope class="w-12 h-12" />
          <span class="ml-3 tracking-widest font-semibold text-xl">
            | Envelope
          </span>
        </router-link>
        <div class="">
          <a class="mr-4" href="/help-center">FAQ</a>
          <a href="mailto:admin@envelope.app?Subject=Support%20contact">
            Contact
          </a>
        </div>
      </div>
    </nav>

    <router-view />

    <footer
      class=" bg-white w-full text-gray-600 py-2 md:py-8 px-4 md:px-16 text-sm md:text-base"
    >
      <div class="flex justify-between">
        <div class="flex flex-col md:flex-row">
          <a class="mr-4" href="/terms">Terms</a>
          <a href="/privacy">Privacy policy</a>
        </div>
        <div class="flex flex-col md:flex-row">
          <span class="mr-4">&copy; Envelope App {{ year }}</span>
          <span>Developed by Fitz Creative</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    // user: Object,
    // loggedIn: Boolean,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    showNav() {
      return this.$route.query.m
        ? false
        : this.$route.name === 'home'
        ? this.user
          ? true
          : false
        : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-image: url('./assets/bg.jpg');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 0 800px black;
}

body.stop-scroll {
  overflow: hidden;
}
</style>
