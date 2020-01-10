<template>
  <div class="h-full">
    <auth-selection v-if="!loggedIn" />
    <card-list v-if="user" :user="user" />
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    loggedIn: Boolean,
  },
};
</script>
