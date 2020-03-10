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
        <GridLayout height="300">
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
                <Image
                  :src="image"
                  stretch="aspectFill"
                  @tap="fullscreen(images, index)"
                />
              </GridLayout>
            </CarouselItem>
          </Carousel>
        </GridLayout>

        <!-- CreatedAt Header -->
        <Label
          :text="`Card created on ${createdAt}`"
          class="section-header"
          :backgroundColor="$root.darkMode ? '#313131' : '#f0eff4'"
          :color="$root.darkMode ? 'white' : 'black'"
        />

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
                verticalAlignment="center"
              />
              <Label
                @tap="selectPerson"
                :text="card.from"
                class="input"
                :class="{
                  'light-edit': isEditing && !$root.darkMode,
                  'dark-edit': isEditing && $root.darkMode,
                }"
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
                verticalAlignment="center"
              />
              <Label
                @tap="selectTag"
                :text="card.tag"
                class="input"
                :class="{
                  'light-edit': isEditing && !$root.darkMode,
                  'dark-edit': isEditing && $root.darkMode,
                }"
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
                verticalAlignment="center"
              />
              <Label
                @tap="selectDate"
                :text="date"
                class="input"
                :class="{
                  'light-edit': isEditing && !$root.darkMode,
                  'dark-edit': isEditing && $root.darkMode,
                }"
              />
            </StackLayout>

            <!-- NOTES: -->
            <StackLayout
              class="input-wrapper-last"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Label
                class="far icon m-t-8"
                text.decode="&#xf249;"
                verticalAlignment="top"
              />
              <TextView
                class="text-field"
                :class="{
                  'light-edit': isEditing && !$root.darkMode,
                  'dark-edit': isEditing && $root.darkMode,
                }"
                :editable="isEditing"
                v-model="card.notes"
                textWrap="true"
                :hint="
                  isEditing ? 'Add a description...' : 'No description provided'
                "
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
import { ImageSource } from 'tns-core-modules/image-source';
import { PhotoViewer } from 'nativescript-photoviewer';
import * as fs from 'file-system';
import * as enums from 'ui/enums';
import Picker from '@/native/picker';
import { mapGetters } from 'vuex';

export default {
  props: {
    card: Object,
    editCard: Object,
    index: Number,
  },
  data() {
    return {
      isEditing: false,
      secondary: null,
    };
  },
  computed: {
    ...mapGetters(['tagList']),
    // Prepare the images from Base64 encoding
    images() {
      return this.card.images.map(image => ImageSource.fromBase64Sync(image));
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
    ...mapActions({
      deleteCard: 'deleteCard',
      updateCard: 'updateCard',
      cancel: 'cancelEdit',
    }),

    /**
     * Present a fullscreen image
     */
    fullscreen(images, index) {
      if (this.isEditing) return;
      const photoviewer = new PhotoViewer();
      let folder = fs.knownFolders.temp();
      const paths = images.map((image, index) => {
        let fileName = `${index}_${new Date().getTime()}_.jpg`;
        let path = fs.path.join(folder.path, fileName);
        image.saveToFile(path, enums.ImageFormat.jpg);
        return path;
      });

      photoviewer.showGallery(paths, {
        startIndex: index,
      });
    },

    /**
     * Select a person from the dropdown
     */
    selectPerson() {
      if (!this.isEditing) return;
      const picker = new Picker('Select or enter new person', {
        items: [''].concat(this.$userService.user.people),
        fields: 3,
      });

      picker.pick().then(result => {
        if (result === 'new') {
          prompt({
            title: 'New person',
            message: "Provide the person's name who gifted you the card",
            okButtonText: 'OK',
            cancelButtonText: 'Cancel',
          }).then(result => {
            if (result.result) this.card.from = result.text.trim();
          });
        } else {
          if (result)
            this.card.from = this.$userService.user.people[result - 1];
        }
      });
    },

    /**
     * Edit date received
     */
    selectDate() {
      if (!this.isEditing) return;
      const picker = new Picker('Select date', {
        type: 'date',
      });
      picker.pick().then(result => {
        if (result) this.card.date = moment(result).format('MM/DD/YYYY');
      });
    },

    /**
     * Edit a tag for the card
     */
    selectTag() {
      if (!this.isEditing) return;
      const picker = new Picker('Select an occassion', { items: this.tagList });
      picker.pick().then(result => {
        if (result) this.card.tag = this.tagList[result];
      });
    },

    /**
     * Close the modal and return Home
     */
    goHome(deleted) {
      this.isEditing = false;
      Frame.topmost().removeEventListener();
      if (deleted) {
        this.$modal.close(deleted);
      } else {
        this.$modal.close();
      }
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
      this.secondary = JSON.parse(JSON.stringify(this.editCard));
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
          this.card = this.secondary;
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
              this.goHome('deleted');
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
  padding: 10;
  font-size: 12;
  text-align: right;
  border-bottom-width: 2px;
  border-bottom-color: #dfdfdf;
}

.input-wrapper {
  padding: 10;
  border-bottom-color: #dfdfdf;
  border-bottom-width: 2px;
}

.input-wrapper-last {
  padding: 10;
}

.input {
  border-bottom-width: 0;
  border-radius: 5;
  margin-left: 10;
  padding: 8;
  height: 40;
  font-weight: 500;
  font-size: 14;
  width: 85%;
}

.input-error {
  color: red;
}

.light-edit {
  background-color: white;
}

.dark-edit {
  background-color: #313131;
}

.icon {
  width: 25;
  height: 25;
  color: #fff;
  font-size: 14;
  margin-right: 0;
  text-align: center;
  border-radius: 4;
  background-color: #590404;
}

.text-field {
  width: 85%;
  margin-left: 10;
  padding-left: 5;
  padding-top: 10;
  border-radius: 5;
  border-bottom-width: 0;
  border-bottom-color: transparent;
}
</style>
