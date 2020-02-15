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
          @tap="update"
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

        <StackLayout>
          <TextField
            :editable="isEditing"
            v-model="card.from"
            textWrap="true"
          />
          <TextField :editable="isEditing" v-model="card.tag" textWrap="true" />
          <Label v-if="!isEditing" :text="date" textWrap="true" />
          <DatePickerField
            v-else
            :date="card.date"
            @dateChange="args => (card.date = args.value)"
            dateFormat="MM/dd/yyyy"
            class="input"
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
    ...mapActions(['deleteCard', 'updateCard']),
    goHome() {
      this.isEditing = false;
      this.$modal.close();
    },
    editPrompt() {
      action('Select option', 'Cancel', ['Edit', 'Delete']).then(
        async result => {
          if (result === 'Delete') {
            await this.delete();
          } else if (result === 'Edit') {
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
      await this.$nextTick(() => {
        this.updateCard(this.card).then(() => {
          this.isEditing = false;
          Frame.topmost().ios.controller.modalInPresentation = false;

          alert({
            title: 'Card saved!',
            message: 'Card was successfully updated.',
            okButtonText: 'Dismiss',
          });
        });
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
