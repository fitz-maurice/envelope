<template>
  <form
    action="#"
    @submit.prevent="submit"
    class="flex flex-col w-full items-center"
  >
    <p class="my-3 text-sm text-gray-700">
      Enter your email to reset your password
    </p>
    <input
      v-model="email"
      class="border border-gray-400 rounded p-2 w-full my-2 w-1/2"
      type="email"
      placeholder="Email"
    />
    <button
      class="shadow-md border rounded bg-blue-800 text-white px-3 py-2 my-2 w-1/2"
    >
      Send reset email
    </button>
    <span
      v-show="alert"
      class="rounded bg-green-400 py-3 px-8 text-center text-green-900 text-sm font-semibold mt-5"
    >
      Email sent successfully. <br />
      Please follow the link to reset your password.
    </span>
    <button
      @click="$emit('back')"
      class="flex items-center fill-current text-gray-700 text-xs font-semibold mt-10 mb-3"
    >
      <arrow-left class="h-4 w-4 mr-2" />
      Back to log in
    </button>
  </form>
</template>

<script>
import fire from 'firebase';

export default {
  data() {
    return {
      email: '',
      alert: false,
    };
  },
  methods: {
    submit() {
      fire
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.email = '';
          this.alert = true;
        })
        .catch(err => {
          this.err = err.message;
        });
    },
  },
};
</script>
