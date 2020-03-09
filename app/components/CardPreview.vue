<template>
  <StackLayout>
    <Image
      :src="image"
      stretch="aspectFill"
      height="175"
      width="98%"
      class="m-y-2"
    />
  </StackLayout>
</template>

<script>
import moment from 'moment';
import routes from '@/router';
import { ImageSource } from 'tns-core-modules/image-source';

export default {
  props: {
    card: Object,
    width: String,
  },
  computed: {
    image() {
      return ImageSource.fromBase64Sync(this.card.images[0]);
    },
    date() {
      return moment(this.card.date).format('M/D/YYYY');
    },
  },
};
</script>

<style lang="scss" scoped></style>
