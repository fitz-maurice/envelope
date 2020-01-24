<template>
  <div id="app" class="h-full font-body" :class="{ 'stop-scroll': modalOpen }">
    <navigation v-if="showNav" :user="user" />
    <!-- Transition -->
    <fade>
      <router-view :user="user" :logged-in="loggedIn" class="container pt-24" />
    </fade>

    <!-- Modal Portal Target -->
    <portal-target
      @change="modalOpen = !modalOpen"
      name="modal"
      class="z-30"
      slim
    />
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    loggedIn: Boolean,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  computed: {
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
