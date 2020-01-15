<template>
  <div
    id="app"
    class="h-full font-body"
    :class="{ bg: !loggedIn, 'stop-scroll': modalOpen }"
  >
    <navigation v-if="user" :user="user" />
    <router-view :user="user" :logged-in="loggedIn" class="container pt-24" />
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
