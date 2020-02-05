<template>
  <Page>
    <ActionBar :title="`Card from ${card.from}`">
      <NavigationButton android.systemIcon="ic_menu_back" />
      <ActionItem
        icon=""
        ios.systemIcon="2"
        ios.position="right"
        @tap="editPrompt"
      />
    </ActionBar>

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
import { mapActions } from 'vuex';
import routes from '@/router';

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
    editPrompt() {
      action('Select option', 'Cancel', ['Edit', 'Delete']).then(result => {
        if (result === 'Delete') {
          this.delete();
        } else {
          console.log(result);
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
              this.$navigateTo(routes.home, {
                frame: 'main',
                clearHistory: true,
              });
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
