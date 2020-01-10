<template>
  <div></div>
</template>

<script>
import firebase from '@/firebase';

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      cards: [],
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.$bind(
          'cards',
          firebase.firestore().collection(`${user.uid}/account/cards`),
        );
      },
    },
  },
};
</script>
