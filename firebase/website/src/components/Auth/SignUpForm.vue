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
    <span
      v-if="error"
      class="w-full bg-red-400 text-red-900 rounded text-sm text-center font-semibold p-2"
    >
      {{ error }}
    </span>
    <button
      type="submit"
      :disabled="!valid"
      :class="{ 'opacity-75 cursor-default': !valid }"
      class="shadow-md border rounded bg-blue-800 hover:bg-blue-900 text-white tracking-widest px-3 py-2 my-2 w-3/4"
    >
      Sign up
    </button>
  </form>
</template>

<script>
import fire from 'firebase';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
    };
  },
  computed: {
    valid() {
      return this.name !== '' && this.email !== '' && this.password !== '';
    },
  },
  methods: {
    submit() {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user.updateProfile({
            displayName: this.name,
          });

          data.user.sendEmailVerification();
        })
        .catch(err => {
          this.error = err.message;
        });
    },
  },
};
</script>
