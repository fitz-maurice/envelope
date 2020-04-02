<template>
  <div class="flex items-center h-full mx-auto w-1/4">
    <div class="flex flex-col items-center rounded p-5 border bg-white w-full">
      <!-- Logo -->
      <div
        v-if="$route.query.mode === 'passwordReset'"
        class="flex items-center mb-3"
      >
        <envelope class="h-16 w-16" />
        <h1 class="tracking-widest font-semibold text-lg ml-3">| Envelope</h1>
      </div>
      <!-- Form -->
      <password-reset v-if="$route.query.mode === 'passwordReset'" />
      <div v-else class="flex flex-col items-center">
        <span
          class="rounded bg-green-400 py-3 px-8 text-center text-green-900 text-sm font-semibold mt-5"
        >
          Email has been successfully verified
        </span>
        <router-link
          to="/"
          class="flex items-center fill-current text-gray-700 text-xs font-semibold mt-8 mb-3"
        >
          <arrow-left class="h-4 w-4 mr-2" />
          View account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import fire from '@/firebase';

export default {
  beforeRouteEnter(to, from, next) {
    if (to.query.mode === 'verifyEmail')
      fire.auth().applyActionCode(to.query.oobCode);
    next();
  },
};
</script>
