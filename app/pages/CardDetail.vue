<template>
  <Frame id="detail" ref="detail">
    <Page ref="page">
      <!-- Action Bar -->
      <ActionBar :title="`Card from ${card.from}`">
        <!-- Left Side - Edit & Cancel -->
        <ActionItem
          @tap="editPrompt"
          ios.systemIcon="2"
          ios.position="left"
          :visibility="hideButtons"
        />
        <ActionItem
          @tap="cancelEdit"
          ios.systemIcon="1"
          ios.position="left"
          :visibility="showButtons"
        />
        <!-- Right Side - Done & Save -->
        <ActionItem
          @tap="goHome"
          ios.systemIcon="0"
          ios.position="right"
          :visibility="hideButtons"
        />
        <ActionItem
          @tap="update"
          ios.systemIcon="3"
          ios.position="right"
          :visibility="showButtons"
        />
      </ActionBar>

      <!-- Main Layout -->
      <StackLayout>
        <!-- The carousel -->
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
              verticalAlignment="middle"
              v-for="(image, index) in images"
              :key="index"
            >
              <GridLayout>
                <Image :src="image" stretch="aspectFill" />
              </GridLayout>
            </CarouselItem>
          </Carousel>
        </GridLayout>

        <!-- CreatedAt Header -->
        <Label :text="`Card created on ${createdAt}`" class="section-header" />

        <!-- Detail list ScrollView/ListView -->
        <ScrollView>
          <StackLayout orientation="vertical">
            <!-- FROM: -->
            <StackLayout
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Label
                class="far icon"
                text.decode="&#xf007;"
                verticalAlignment="top"
              />
              <TextField
                class="text-field"
                :editable="isEditing"
                v-model="card.from"
                textWrap="true"
              />
            </StackLayout>

            <!-- TAG: -->
            <StackLayout
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Label
                class="far icon"
                text.decode="&#xf79c;"
                verticalAlignment="top"
              />
              <TextField
                class="text-field"
                :editable="isEditing"
                v-model="card.tag"
                textWrap="true"
              />
            </StackLayout>

            <!-- DATE: -->
            <StackLayout
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Label
                class="far icon"
                text.decode="&#xf073;"
                verticalAlignment="top"
              />
              <TextField
                v-if="!isEditing"
                class="text-field"
                :editable="false"
                v-model="date"
                textWrap="true"
              />
              <TextField
                v-else
                class="text-field"
                v-model="card.date"
                textWrap="true"
              />
            </StackLayout>

            <!-- NOTES: -->
            <StackLayout
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Label
                class="far icon"
                text.decode="&#xf249;"
                verticalAlignment="top"
              />
              <TextView
                class="text-field"
                :editable="isEditing"
                v-model="card.notes"
                textWrap="true"
                hint="Add a description..."
              />
            </StackLayout>
          </StackLayout>
        </ScrollView>
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
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export default {
  props: {
    card: Object,
  },
  data() {
    return {
      isEditing: false,
      detailsList: new ObservableArray([
        { name: this.card.from, icon: '&#xf007;' },
        { name: this.card.tag, icon: '&#xf79c;' },
        { name: this.card.date, icon: '&#xf133;' },
        { name: this.card.notes, icon: '&#xf249;' },
      ]),
    };
  },
  computed: {
    // Prepare the images from Base64 encoding
    images() {
      return this.card.images.map(image => fromBase64(image));
    },
    // Format the Date of the card
    date() {
      return moment(this.card.date).format('M/D/YYYY');
    },
    // Format the createdAt string
    createdAt() {
      return moment(this.card.createdAt).format('MMMM Do, YYYY');
    },
    // Convert buttons to edit mode
    showButtons() {
      return this.isEditing ? 'visible' : 'collapse';
    },
    // Convert buttons back to normal
    hideButtons() {
      return this.isEditing ? 'collapse' : 'visible';
    },
  },
  methods: {
    ...mapActions(['deleteCard', 'updateCard']),

    /**
     * Close the modal and return Home
     */
    goHome() {
      this.isEditing = false;
      Frame.topmost().removeEventListener();
      this.$modal.close();
    },

    /**
     * Present the Edit prompt
     */
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

    /**
     * Convert modal to non-draggable
     */
    async edit() {
      await this.$nextTick(() => {
        Frame.topmost().ios.controller.modalInPresentation = true;
      });
    },

    /**
     * Cancel the edit and discard
     */
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

    /**
     * Update the card on hand
     */
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

    /**
     * Delete a card with confirmation dialog
     */
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

<style scoped>
.section-header {
  padding: 30px;
  font-size: 12;
  text-align: right;
  border-bottom-width: 2px;
  background-color: #f0eff4;
  border-bottom-color: #dfdfdf;
}

.input-wrapper {
  padding: 30px 30px 15px 30px;
  border-bottom-color: #dfdfdf;
  border-bottom-width: 2px;
}

.icon {
  margin-right: 0;
  text-align: center;
  height: 70px;
  width: 70px;
  border-radius: 15px;
  color: #fff;
  background-color: #590404;
}

.text-field {
  width: 100%;
  border: 0;
  padding: 0;
  padding-top: 5px;
  border-bottom-width: 0;
}
</style>
