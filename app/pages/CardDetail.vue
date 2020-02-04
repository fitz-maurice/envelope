<template>
  <Page>
    <StackLayout>
      <Label :text="card.from" textWrap="true" />
      <Label :text="card.tag" textWrap="true" />
      <Label :text="date" textWrap="true" />
      <Image :src="image" width="50%" stretch="aspectFit" />
    </StackLayout>
  </Page>
</template>

<script>
import moment from 'moment';
import * as imageSource from 'tns-core-modules/image-source';

export default {
  props: {
    card: Object,
  },
  data() {
    return {
      image: '',
    };
  },
  created() {
    const url = this.card.images[0];
    const image = this.$cache.get(url);

    if (image) {
      this.image = imageSource.fromNativeSource(image);
    } else {
      this.$cache.push({
        key: url,
        url,
        completed: (image, key) => {
          this.image = imageSource.fromNativeSource(image);
        },
        error: () => {
          console.log('Error');
        },
      });
    }
  },
  computed: {
    date() {
      return moment(this.card.date).format('M/D/YYYY');
    },
  },
};
</script>

<style lang="scss" scoped></style>
