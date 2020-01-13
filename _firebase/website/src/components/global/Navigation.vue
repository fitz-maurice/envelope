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
        <cog
          @click="settings = true"
          class="mr-5 cursor-pointer fill-current hover:text-blue-800"
        />
        {{ user.displayName }}
        <button
          @click.prevent="logout"
          class="cursor-pointer fill-current hover:text-blue-800 ml-5 text-sm"
        >
          Logout
        </button>
      </div>
    </div>

    <portal to="modal" v-if="settings">
      <div
        @click="
          settings = false;
          success = false;
        "
        class="absolute inset-0 flex items-center justify-center w-screen h-screen bg-modal"
      >
        <div
          @click.stop
          class="w-1/3 rounded bg-white p-5 text-center opacity-100"
        >
          <h2
            class="tracking-widest text-2xl font-semibold pb-3 mb-8 border-b border-gray-400"
          >
            Settings
          </h2>
          <form
            action="#"
            @submit.prevent="submit"
            class="flex flex-col w-2/3 items-center mx-auto"
          >
            <label
              for="full name"
              class="w-full text-left text-xs font-semibold"
            >
              Full name
            </label>
            <input
              :value="user.displayName"
              @input="e => (name = e.target.value)"
              class="border border-gray-400 rounded p-2 w-full my-2"
              type="text"
              placeholder="Full name"
            />
            <label
              for="birthday"
              class="w-full text-left text-xs font-semibold mt-6"
            >
              Birthday
            </label>
            <input
              v-model="birthday"
              @keypress="isNumber"
              @keyup="formatDate"
              type="text"
              placeholder="Birthday (MM/DD/YYYY)"
              class="border border-gray-400 rounded p-2 w-full my-2"
            />
            <span
              v-if="success"
              class="rounded w-full bg-green-400 text-green-800 font-semibold p-3 mt-3"
            >
              Account has been updated
            </span>
            <button
              type="submit"
              class="shadow-md border rounded bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 mt-8 mb-5 w-1/2"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </portal>
  </nav>
</template>

<script>
import fire from '@/firebase';

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      settings: false,
      name: this.user.displayName,
      account: [],
      success: false,
      birthday: null,
    };
  },
  watch: {
    account() {
      this.birthday = this.account?.birthday;
    },
    user: {
      immediate: true,
      handler(user) {
        this.$bind(
          'account',
          fire
            .firestore()
            .collection(`${user.uid}`)
            .doc('account'),
        );
      },
    },
  },
  methods: {
    formatDate(event) {
      if (event.key !== 'Backspace') {
        if (this.birthday.length === 2) this.birthday = `${this.birthday}/`;
        if (this.birthday.length === 5) this.birthday = `${this.birthday}/`;
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    logout() {
      fire
        .auth()
        .signOut()
        .then(() => this.$router.push('/').catch(() => {}));
    },
    submit() {
      this.user
        .updateProfile({
          displayName: this.name,
        })
        .then(() => {
          this.user.reload();
          this.account ? this.updateCollection() : this.newCollection();
        });
    },
    // When a collection for the users UID exists
    updateCollection() {
      this.$firestoreRefs.account
        .update({
          birthday: this.birthday,
        })
        .then(() => {
          this.success = true;
        });
    },
    // When a collection for the users uid does not exist
    newCollection() {
      fire
        .firestore()
        .collection(`${this.user.uid}`)
        .doc('account')
        .set({
          birthday: this.birthday,
        });
    },
  },
};
</script>
