<template>
  <form
    action="#"
    @submit.prevent="submit"
    class="flex flex-col w-full items-center"
  >
    <input
      v-model="name"
      class="border border-gray-400 rounded shadow p-2 w-full my-2"
      type="text"
      placeholder="Full name"
    />
    <input
      v-model="email"
      class="border border-gray-400 rounded shadow p-2 w-full my-2"
      type="text"
      placeholder="Email"
    />
    <input
      v-model="password"
      class="border border-gray-400 rounded shadow p-2 w-full my-2"
      type="password"
      placeholder="Password"
    />
    <button
      type="submit"
      class="shadow-md border rounded bg-blue-800 hover:bg-blue-900 text-white tracking-widest px-3 py-2 my-2 w-3/4"
    >
      Sign up
    </button>
  </form>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.name,
            })
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
