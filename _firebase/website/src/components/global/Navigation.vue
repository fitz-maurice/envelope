<template>
  <nav class="p-3 mb-10 border-b shadow-md bg-white">
    <div class="container flex justify-between">
      <!-- Logo -->
      <router-link to="/" class="mr-3 flex flex-row items-center">
        <envelope class="w-12 h-12" />
        <span class="ml-3 tracking-widest font-semibold text-xl">
          | Envelope
        </span>
      </router-link>

      <!-- Right Side -->
      <div class="flex items-center font-semibold">
        <search class="mr-5 cursor-pointer fill-current hover:text-blue-800" />
        <router-link to="/settings" class="mr-5 cursor-pointer">
          <cog class="fill-current hover:text-blue-800" />
        </router-link>
        {{ user.displayName }}
        <button
          @click.prevent="logout"
          class="cursor-pointer fill-current hover:text-blue-800 ml-5 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase';

export default {
  props: {
    user: Object,
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>
