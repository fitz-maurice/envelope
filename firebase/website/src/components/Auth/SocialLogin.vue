<template>
  <div class="flex flex-col items-center mt-5">
    <button
      @click="apple"
      class="flex bg-white border border-gray-500 rounded-full font-semibold shadow-md outline-none text-sm px-4 py-2 my-2"
    >
      <apple class="h-5 mr-2" />
      Continue with Apple
    </button>
    <button
      @click="google"
      class="flex bg-white border border-gray-500 rounded-full font-semibold shadow-md outline-none text-sm px-3 py-2 my-2"
    >
      <google class="h-5 mr-2" />
      Continue with Google
    </button>
  </div>
</template>

<script>
import firebase from 'firebase';
import fire from '@/firebase';

export default {
  methods: {
    apple() {
      localStorage.setItem('social-login', true);
      const provider = new firebase.auth.OAuthProvider('apple.com');
      fire.auth().signInWithRedirect(provider);
    },
    google() {
      localStorage.setItem('social-login', true);
      const provider = new firebase.auth.GoogleAuthProvider();
      fire.auth().signInWithRedirect(provider);
    },
  },
};
</script>
