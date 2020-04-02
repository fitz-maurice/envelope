<template>
  <form
    action="#"
    @submit.prevent="submit"
    class="flex flex-col w-full items-center justify-between"
  >
    <div v-if="!success" class="flex flex-col items-center w-full">
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border border-gray-400 rounded p-2 w-full my-2"
        :class="{
          'border-red-700': !valid && passwordConfirmation.length >= 5,
        }"
      />
      <input
        v-model="passwordConfirmation"
        type="password"
        placeholder="Confirm password"
        class="border border-gray-400 rounded p-2 w-full my-2"
        :class="{
          'border-red-700': !valid && passwordConfirmation.length >= 5,
        }"
      />
      <span
        v-show="!valid && passwordConfirmation.length >= 5"
        class="mx-auto text-sm text-red-700 font-semibold"
      >
        Passwords do not match!
      </span>
      <button
        type="submit"
        :disabled="!valid"
        :class="{ 'opacity-50 cursor-default': !valid }"
        class="shadow-md border rounded bg-blue-800 hover:bg-blue-900 text-white mt-5 px-3 py-2 w-1/2"
      >
        Update password
      </button>
    </div>
    <div v-else class="flex flex-col items-center">
      <span
        class="rounded bg-green-400 py-3 px-8 text-center text-green-900 text-sm font-semibold mt-5"
      >
        Password successfully reset
      </span>
      <router-link
        to="/login"
        class="flex items-center fill-current text-gray-700 text-xs font-semibold mt-8 mb-3"
      >
        <arrow-left class="h-4 w-4 mr-2" />
        Back to log in
      </router-link>
    </div>
  </form>
</template>

<script>
import fire from 'firebase';

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      success: false,
    };
  },
  computed: {
    valid() {
      return (
        this.password === this.passwordConfirmation && this.password !== ''
      );
    },
  },
  methods: {
    submit() {
      fire
        .auth()
        .confirmPasswordReset(this.$route.query.oobCode, this.password)
        .then(() => (this.success = true))
        .catch(err => console.log(err.message));
    },
  },
};
</script>
