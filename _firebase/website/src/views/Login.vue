<template>
  <div class="mx-auto w-1/4 rounded p-5 border bg-white">
    <log-in-form v-if="!passwordReset" @forgot="passwordReset = true" />
    <password-reset v-else />
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      passwordReset: false,
    };
  },
};
</script>
