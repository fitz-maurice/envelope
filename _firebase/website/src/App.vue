<template>
  <div id="app" class="h-full font-body" :class="{ bg: !loggedIn }">
    <navigation v-if="user" :user="user" />
    <router-view :user="user" :logged-in="loggedIn" class="container" />
    <portal-target name="modal" />
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    loggedIn: Boolean,
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
</style>
