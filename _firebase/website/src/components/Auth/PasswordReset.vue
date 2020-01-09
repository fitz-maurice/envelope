<template>
  <form
    action="#"
    @submit.prevent="submit"
    class="flex flex-col w-full items-center"
  >
    <input
      v-model="email"
      class="border p-2 w-full my-2"
      type="email"
      placeholder="Email"
    />
    <button
      class="shadow-md border rounded bg-blue-800 text-white px-3 py-2 my-2 w-3/4"
    >
      Send Reset Email
    </button>
  </form>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.$emit('reset');
        })
        .catch(err => {
          this.err = err.message;
        });
    },
  },
};
</script>
