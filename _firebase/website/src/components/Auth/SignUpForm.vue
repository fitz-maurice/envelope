<template>
  <form
    action="#"
    @submit.prevent="submit"
    class="flex flex-col w-full items-center"
  >
    <input
      v-model="email"
      class="border p-2 w-full my-2"
      type="text"
      placeholder="Email"
    />
    <input
      v-model="password"
      class="border p-2 w-full my-2"
      type="password"
      placeholder="Password"
    />
    <button
      type="submit"
      class="shadow-md border rounded bg-blue-800 text-white px-3 py-2 my-2 w-1/2"
    >
      Sign Up
    </button>
  </form>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({name: 'account'}).catch(err => console.log(err));
        })
        .catch(err => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
