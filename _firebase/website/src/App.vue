<template>
  <div id="app" class="container h-full font-body">
    <router-link to="/" class="mr-3">Home</router-link>
    <button @click.prevent="logout" class="mr-3">Logout</button>
    <router-link to="/account" class="mr-3">Account</router-link>
    <span v-if="user">{{ user.email }} is logged in</span>
    <router-view :user="user" />
    <portal-target name="modal" />
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  props: {
    user: Object,
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/').catch(err => console.log(err));
        });
    },
  },
};
</script>
