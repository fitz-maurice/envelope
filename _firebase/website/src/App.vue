<template>
  <div id="app" class="h-full font-body" :class="{ bg: !loggedIn }">
    <navigation v-if="user" :user="user" />
    <router-view :user="user" :logged-in="loggedIn" class="container pt-24" />
    <portal-target name="modal" :transition="fade" slim />
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    loggedIn: Boolean,
  },
  computed: {
    fade() {
      return {
        functional: true,
        render(h, context) {
          const data = {
            props: {
              name: 'fade',
              mode: 'out-in',
              duration: 200,
            },
            on: {
              beforeEnter: el => {
                el.style.opacity = 0;
              },
              afterEnter: el => {
                el.style.opacity = 1;
                el.style.transition = 'all 0.2s';
              },
              beforeLeave: el => {
                el.style.opacity = 0;
                el.style.transition = 'all 0.2s';
              },
            },
          };
          return h('transition', data, context.children);
        },
      };
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
</style>
