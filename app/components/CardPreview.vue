<template>
  <StackLayout>
    <!-- <Label :text="card.from" textWrap="true" />
    <Label :text="card.tag" textWrap="true" />
    <Label :text="date" textWrap="true" /> -->
    <Image :src="image" stretch="fill" @tap="test" />
  </StackLayout>
</template>

<script>
import moment from 'moment';
import routes from '@/router';
import { fromBase64 } from 'tns-core-modules/image-source';

export default {
  props: {
    card: Object,
    width: String,
  },
  computed: {
    image() {
      return fromBase64(this.card.images[0]);
    },
    date() {
      return moment(this.card.date).format('M/D/YYYY');
    },
  },
};
</script>

<style lang="scss" scoped></style>
