<template>
  <Frame id="modal">
    <Page @loaded="loaded">
      <!-- Action Bar -->
      <ActionBar
        title="Create New Card"
        backgroundColor="#590404"
        color="white"
      >
        <ActionItem text="Cancel" ios.position="left" @tap="cancel" />
        <ActionItem text="Next" ios.position="right" @tap="next" />
      </ActionBar>

      <!-- Main View -->
      <GridLayout>
        <!-- No Permission Access -->
        <StackLayout v-if="keySet && !hasPermissions">
          <Label text.decode="&#xf071;" class="far warning-icon" />
          <Label
            text="Envelope does not have access to your photos and camera"
            class="warning-message"
            textWrap="true"
          />
          <Label
            text="Please enable access so you can continue using Envelope"
            class="warning-message-sub"
            textWrap="true"
          />
          <Button
            @tap="goToAppSettings"
            text="Go To App Settings"
            class="app-settings"
            backgroundColor="transparent"
          />
        </StackLayout>

        <!-- Has Permission Access -->

        <ScrollView v-else>
          <StackLayout>
            <!-- Header text -->
            <Label
              text="Select or take up 5 pictures"
              textWrap="true"
              class="header"
            />

            <!-- Images -->
            <GridLayout rows="auto, auto, auto" columns="*, *">
              <StackLayout
                v-for="(img, index) in images"
                :key="index"
                class="m-t-15"
                :row="index / 2 < 1 ? 0 : index / 2 <= 1.5 ? 1 : 2"
                :column="(index + 1) % 2 == 0 ? 1 : 0"
              >
                <Label
                  :text="`Picture ${index + 1}`"
                  textWrap="true"
                  class="label label-img"
                />
                <Image
                  v-if="img !== ''"
                  :src="img"
                  v-shadow="15"
                  @tap="imagePrompt(index)"
                  stretch="aspectFill"
                  class="img p-x-5"
                />
                <Label
                  v-else
                  class="placeholder fas"
                  text.decode="&#xf03e;"
                  @tap="imagePrompt"
                />
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>
import routes from '~/router';
import * as camera from 'nativescript-camera';
import * as imagepicker from 'nativescript-imagepicker';
import { ImageCropper } from 'nativescript-imagecropper';
import { ImageSource } from 'tns-core-modules/image-source';
import { toBase64String } from 'tns-core-modules/image-source';
import { openAppSettings } from 'nativescript-advanced-permissions/core';
import { hasKey, setBoolean } from 'tns-core-modules/application-settings';
import {
  hasCameraPermissions,
  requestCameraPermissions,
} from 'nativescript-advanced-permissions/camera';
import {
  hasFilePermissions,
  requestFilePermissions,
} from 'nativescript-advanced-permissions/files';

export default {
  data() {
    return {
      keySet: false,
      images: ['', '', '', '', ''],
    };
  },
  computed: {
    hasPermissions() {
      return hasCameraPermissions() && hasFilePermissions();
    },
    imagesValid() {
      return this.images.filter(image => image !== '').length > 0;
    },
  },
  methods: {
    // Bootstrap the page
    loaded({ object }) {
      // Set the status bar color to white
      if (!this.$root.darkMode) {
        UIApplication.sharedApplication.setStatusBarStyleAnimated(
          UIStatusBarStyle.LightContent,
          true,
        );
      }

      this.$adService.preloadInterstitial();

      // Check if we have asked for permissions before
      const keySet = hasKey('firstTimePermissions');
      this.keySet = keySet;

      if (!keySet) {
        // Request camera permissions
        requestCameraPermissions();

        // Request files (photos) permission
        requestFilePermissions();

        // Set key for first time ask
        setBoolean('firstTimePermissions', true);
      }
    },

    // Take user to app settings
    goToAppSettings() {
      openAppSettings();
    },

    // Select image type
    imagePrompt(index = null) {
      action('Select image source', 'Cancel', ['Camera', 'Photo Library']).then(
        result => {
          if (result === 'Camera') return this.takePicture(index);
          if (result === 'Photo Library') return this.selectPicture(index);

          return;
        },
      );
    },

    // Take picture and pass to cropper
    takePicture(index = null) {
      let source = new ImageSource();

      camera.requestPermissions().then(
        () => {
          camera
            .takePicture({
              width: 500,
              height: 700,
              keepAspectRatio: true,
            })
            .then(imageAsset => {
              source.fromAsset(imageAsset).then(source => {
                this.editPicture(source, index);
              });
            })
            .catch(err => {
              console.log('Error -> ' + err.message);
            });
        },
        () => {
          console.log('No permissions for camera');
        },
      );
    },

    // Select picture from phone
    selectPicture(index = null) {
      let image;
      let source = new ImageSource();
      let context = imagepicker.create({
        mode: 'single',
        mediaType: 'image',
        minimumNumberOfSelection: '1',
      });

      context
        .authorize()
        .then(() => {
          return context.present();
        })
        .then(selection => {
          selection.forEach(selected => {
            source.fromAsset(selected).then(source => {
              setTimeout(() => {
                this.editPicture(source, index);
              }, 250);
            });
          });
        })
        .catch(e => {
          console.log('error in selectPicture', e);
        });
    },

    // Edit and crop the picture
    editPicture(source, index = null) {
      const imageCropper = new ImageCropper();

      setTimeout(() => {
        imageCropper
          .show(source, { width: 500, height: 700, keepAspectRatio: true })
          .then(({ response, image }) => {
            if (response === 'Success') {
              const i =
                typeof index === 'number' ? index : this.images.indexOf('');
              this.images.splice(i, 1, image);
            }
          })
          .catch(function(e) {
            console.log('ERROR', e);
          });
      }, 150);
    },
    // Go to next page
    next() {
      if (!this.imagesValid) {
        alert({
          title: '',
          message: 'Please select or take at least one picture.',
          okButtonText: 'Dismiss',
        });
        return;
      }

      this.$navigateTo(routes.cardCreation, {
        frame: 'modal',
        props: {
          images: this.images,
        },
      }).catch(err => console.log(err));
    },

    // Cancel card creation
    cancel() {
      confirm({
        title: 'Cancel New Card',
        message: 'Are you sure you want to cancel? You changes will be lost.',
        okButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result) {
          this.$modal.close();
          // Reset the status bar color
          if (!this.$root.darkMode) {
            UIApplication.sharedApplication.setStatusBarStyleAnimated(
              UIStatusBarStyle.Default,
              true,
            );
          }
        }
      });
    },

    async restrictedAccess() {
      confirm({
        title: 'Envelope',
        message: 'Your message',
        okButtonText: 'Go to settings',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result) {
          utils.openUrl('App-prefs:root=General');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.placeholder {
  background-color: #a7b3c4;
  border-radius: 5;
  width: 90%;
  height: 175;
  font-size: 50;
  text-align: center;
  color: white;
}

.header {
  font-size: 20px;
  font-weight: 700;
  width: 85%;
  margin-top: 50px;
  text-align: center;
}

.label {
  width: 85%;
  font-size: 12px;

  &-img {
    text-align: center;
    font-weight: 700;
    margin-bottom: 15px;
  }
}

.img {
  width: 90%;
  height: 175;
}

.warning-icon {
  margin-top: 300px;
  margin-bottom: 125px;
  font-size: 150px;
  color: #edf2f7;
  width: auto;
  horizontal-align: center;
}

.warning-message {
  text-align: center;
  width: 85%;
  font-size: 20;
  font-weight: 500;
  color: #718096;
  horizontal-align: center;
}

.warning-message-sub {
  text-align: center;
  width: 85%;
  font-size: 15px;
  color: #718096;
  margin-top: 50px;
  horizontal-align: center;
}

.app-settings {
  color: #0f6ca6;
  margin-top: 75px;
}
</style>
