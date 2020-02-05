<template>
  <Page>
    <StackLayout>
      <Label :text="card.from" textWrap="true" />
      <Label :text="card.tag" textWrap="true" />
      <Label :text="date" textWrap="true" />
      <Image
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        width="auto"
        stretch="aspectFit"
      />
    </StackLayout>
  </Page>
</template>

<script>
import moment from 'moment';
import { fromBase64 } from 'tns-core-modules/image-source';

export default {
  props: {
    card: Object,
  },
  computed: {
    images() {
      return this.card.images.map(image => fromBase64(image));
    },
    date() {
      return moment(this.card.date).format('M/D/YYYY');
    },
  },
};
</script>

<style lang="scss" scoped></style>
