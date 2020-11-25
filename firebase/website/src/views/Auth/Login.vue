<template>
  <div class="flex items-center h-full mx-auto w-1/4">
    <div class="flex flex-col items-center rounded p-5 border bg-white w-full">
      <!-- Logo -->
      <div class="flex items-center mb-3">
        <envelope class="h-16 w-16" />
        <h1 class="tracking-widest font-semibold text-lg ml-3">| Envelope</h1>
      </div>
      <!-- Form -->
      <log-in-form v-if="!passwordReset" @forgot="passwordReset = true" />
      <!-- Password Reset -->
      <request-password-reset v-else @back="passwordReset = false" />
      <!-- App Stores -->
      <div v-if="!passwordReset" class="flex flex-col items-center">
        <div class="flex w-2/3 items-center my-3">
          <span class="w-full border-b-2 border-gray-400" />
          <span class="mx-2">or</span>
          <span class="w-full border-b-2 border-gray-400" />
        </div>
        <router-link to="/" class="text-sm">Create new account</router-link>
        <p class="font-semibold mt-10 mb-3">Download the app</p>
        <div class="flex justify-center">
          <a class="w-1/3 mr-2" href="#">
            <img
              alt="Available on the App Store"
              src="../../assets/app-store.png"
            />
          </a>
          <a class="w-1/3" href="#">
            <img
              alt="Available on Google Play"
              src="../../assets/play-store.png"
            />
          </a>
        </div>
      </div>
    </div>
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
      passwordReset: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.loggedIn) next({ name: 'home' });
    });
  },
};
</script>
