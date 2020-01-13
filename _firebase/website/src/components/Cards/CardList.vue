<template>
  <div class="">
    <no-cards v-if="cards.length === 0" />
  </div>
</template>

<script>
import fire from '@/firebase';

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
          fire.firestore().collection(`${user.uid}/account/cards`),
        );
      },
    },
  },
};
</script>
