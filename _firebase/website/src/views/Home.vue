<template>
  <auth-selection v-if="!user" />
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>
