<template>
  <Frame id="detail" ref="test">
    <Page ref="page">
      <!-- Action Bar -->
      <ActionBar :title="`Card from ${card.from}`">
        <!-- Left Side - Edit & Cancel -->
        <ActionItem
          icon=""
          ios.systemIcon="2"
          ios.position="left"
          @tap="editPrompt"
          :visibility="hideButtons"
        />
        <ActionItem
          icon=""
          ios.systemIcon="1"
          ios.position="left"
          @tap="cancelEdit"
          :visibility="showButtons"
        />
        <!-- Right Side - Done & Save -->
        <ActionItem
          icon=""
          ios.systemIcon="0"
          ios.position="right"
          @tap="goHome"
          :visibility="hideButtons"
        />
        <ActionItem
          icon=""
          ios.systemIcon="3"
          ios.position="right"
          @tap="inEditing"
          :visibility="showButtons"
        />
      </ActionBar>

      <!-- Main Layout -->
      <StackLayout>
        <!-- Cards -->
        <GridLayout height="350">
          <Carousel
            ref="myCarousel"
            height="100%"
            width="100%"
            color="white"
            android:indicatorAnimation="slide"
            indicatorColor="#fff"
            indicatorOffset="0, -10"
            showIndicator="true"
          >
            <CarouselItem
              v-for="(image, index) in images"
              :key="index"
              verticalAlignment="middle"
            >
              <GridLayout>
                <Image :src="image" stretch="aspectFill" />
              </GridLayout>
            </CarouselItem>
          </Carousel>
        </GridLayout>

        <StackLayout v-if="!isEditing">
          <Label :text="card.from" textWrap="true" />
          <Label :text="card.tag" textWrap="true" />
          <Label :text="date" textWrap="true" />
        </StackLayout>

        <!-- Editing -->
        <StackLayout v-else>
          <Button
            v-if="isEditing"
            text="Can't drag now. Click to make draggable"
            @tap="cancelEdit"
          />
        </StackLayout>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import moment from 'moment';
import routes from '@/router';
import { mapActions } from 'vuex';
import { Frame } from 'tns-core-modules/ui/frame';
import { fromBase64 } from 'tns-core-modules/image-source';

export default {
  props: {
    card: Object,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    images() {
      return this.card.images.map(image => fromBase64(image));
    },
    date() {
      return moment(this.card.date).format('M/D/YYYY');
    },
    hideButtons() {
      return this.isEditing ? 'collapse' : 'visible';
    },
    showButtons() {
      return this.isEditing ? 'visible' : 'collapse';
    },
  },
  methods: {
    ...mapActions(['deleteCard']),
    goHome() {
      this.isEditing = false;
      this.$modal.close();
    },
    editPrompt() {
      action('Select option', 'Cancel', ['Edit', 'Delete']).then(
        async result => {
          if (result === 'Delete') {
            await this.delete();
          } else {
            this.isEditing = true;
            await this.edit();
          }
        },
      );
    },
    async edit() {
      await this.$nextTick(() => {
        Frame.topmost().ios.controller.modalInPresentation = true;
      });
    },
    async cancelEdit() {
      await confirm({
        title: 'Discard edits',
        message: 'Are you sure? Edits will be lost.',
        okButtonText: 'Discard',
        cancelButtonText: 'Cancel',
      }).then(async result => {
        if (result) {
          this.isEditing = false;
          await this.$nextTick(() => {
            Frame.topmost().ios.controller.modalInPresentation = false;
          });
        }
      });
    },
    async update() {
      // TODO: show prompt upon success
      this.isEditing = false;
      await this.$nextTick(() => {
        Frame.topmost().ios.controller.modalInPresentation = false;
      });
    },
    inEditing() {
      alert('In editing mode...');
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
