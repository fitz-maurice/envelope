<template>
  <Frame id="detail">
    <Page ref="page">
      <!-- Action Bar -->
      <ActionBar :title="`Card from ${card.from}`">
        <ActionItem
          icon=""
          ios.systemIcon="2"
          ios.position="left"
          @tap="editPrompt"
        />
        <ActionItem
          icon=""
          ios.systemIcon="0"
          ios.position="right"
          @tap="goHome"
        />
      </ActionBar>

      <!-- Main Layout -->
      <StackLayout>
        <Image
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          width="auto"
          stretch="aspectFit"
        />
        <Label :text="card.from" textWrap="true" />
        <Label :text="card.tag" textWrap="true" />
        <Label :text="date" textWrap="true" />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import moment from 'moment';
import routes from '@/router';
import { mapActions } from 'vuex';
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
  methods: {
    ...mapActions(['deleteCard']),
    goHome() {
      this.$modal.close();
    },
    editPrompt() {
      action('Select option', 'Cancel', ['Edit', 'Delete']).then(result => {
        if (result === 'Delete') {
          this.delete();
        } else {
          console.log('CHangeing...', this.$refs.page.nativeView);
          this.$refs.page.nativeView.set('fullscreen', true);
        }
      });
    },
    delete() {
      confirm({
        title: 'Delete Card',
        message:
          'Are you sure you want to delete this card? You will not be able to recover it.',
        okButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result) {
          this.deleteCard(this.card.id).then(() => {
            alert({
              title: 'Card Deleted',
              message: 'Card was successfully deleted',
              okButtonText: 'Ok',
            }).then(() => {
              this.goHome();
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
