<template>
  <Page @loaded="loaded">
    <ActionBar title="Create New Card" backgroundColor="#0F6CA6" color="white">
      <ActionItem text="Cancel" ios.position="left" @tap="cancel" />
      <ActionItem text="Save" ios.position="right" @tap="save" />
    </ActionBar>

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
      />
    </StackLayout>

    <!-- Has Permission Access -->
    <StackLayout v-else key="main" class="p-t-10">
      <!-- View Selection -->
      <SegmentedBar
        @selectedIndexChange="onSelectedIndexChange"
        v-shadow="3"
        class="segmented-bar"
      >
        <SegmentedBarItem v-for="view in views" :title="view" :key="view" />
      </SegmentedBar>

      <!-- Card data -->
      <StackLayout v-if="selectedView === 0" key="data">
        <!-- Header text -->
        <Label
          text="Tell us a little about the card you received"
          textWrap="true"
          class="header"
        />

        <!-- From -->
        <StackLayout>
          <Label text="Who was the card from?" class="label" />
          <TextField
            v-model="card.from"
            @returnPress="$refs.tag.nativeView.focus()"
            v-shadow="2"
            hint="Card giver's name"
            returnKeyType="next"
            class="input"
          />
        </StackLayout>

        <!-- Tag type -->
        <StackLayout class="m-t-15">
          <Label text="What was the occassion?" class="label" />
          <TextField
            ref="tag"
            v-model="card.tag"
            @returnPress="doneTap"
            v-shadow="2"
            returnKeyType="done"
            hint="Type of card"
            class="input"
          />
        </StackLayout>

        <!-- Date -->
        <StackLayout class="m-t-15">
          <Label text="When did you receive the card?" class="label" />
          <DatePickerField
            v-model="card.date"
            @dateChange="dateChange"
            v-shadow="2"
            hint="Date Received"
            dateFormat="MM/dd/yyyy"
            borderBottomWidth="0"
            class="input"
          />
        </StackLayout>

        <!-- Notes -->
        <StackLayout class="m-t-15">
          <Label text="Notes" class="label" />
          <TextField
            v-model="card.notes"
            @returnPress="doneTap"
            v-shadow="2"
            returnKeyType="done"
            textWrap="true"
            class="input"
            hint="Any special notes about the card"
            height="75%"
          />
        </StackLayout>
      </StackLayout>

      <!-- Images -->
      <StackLayout
        v-else
        key="images"
        orientation="vertical"
        horizonalAlignment="center"
      >
        <!-- Buttons -->
        <FlexboxLayout justifyContent="space-around" class="p-x-25">
          <Button
            @tap="selectPicture"
            text="Select Picture"
            v-shadow="10"
            class="button"
          />

          <Button
            @tap="takePicture"
            text="Take Picture"
            v-shadow="10"
            class="button"
          />
        </FlexboxLayout>

        <GridLayout rows="*, *, *" columns="*, *">
          <StackLayout
            v-for="(img, index) in images"
            :key="index"
            class="m-t-25"
            :row="index / 2 < 1 ? 0 : index / 2 <= 2 ? 1 : 2"
            :column="(index + 1) % 2 == 0 ? 1 : 0"
          >
            <Label
              :text="`Picture ${index + 1}`"
              textWrap="true"
              class="label label-img"
            />
            <Image :src="img" v-shadow="15" stretch="aspectFit" class="img" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
const appSettings = require('tns-core-modules/application-settings');
import moment from 'moment';
import routes from '~/router';
import * as camera from 'nativescript-camera';
import * as imagepicker from 'nativescript-imagepicker';
import { ImageSource } from 'tns-core-modules/image-source';
import { ImageCropper } from 'nativescript-imagecropper';
import { openAppSettings } from 'nativescript-advanced-permissions/core';
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
      selectedView: 0,
      views: ['Card Info', 'Images'],
      card: {
        from: '',
        tag: '',
        date: null,
        notes: '',
        images: [],
      },
      images: [],
      creating: false,
      keySet: true,
    };
  },
  computed: {
    today() {
      return moment(new Date()).format('MM/DD/YYYY');
    },
    hasPermissions() {
      return hasCameraPermissions() && hasFilePermissions();
    },
  },
  methods: {
    // Bootstrap the page
    loaded() {
      const keySet = appSettings.hasKey('firstTimePermissions');
      this.keySet = keySet;

      if (!keySet) {
        requestCameraPermissions();
        requestFilePermissions();
      }

      if (this.hasPermissions) {
        appSettings.setBoolean('firstTimePermissions', true);
      }
    },

    doneTap(args) {
      args.object.dismissSoftInput();
    },

    // Update the when it changes
    dateChange(args) {
      this.card.date = args.value;
    },

    // Take user to app settings
    goToAppSettings() {
      openAppSettings();
    },

    // Change the selected view index
    onSelectedIndexChange(args) {
      this.selectedView = args.object.selectedIndex;
    },

    // Create the new card
    async save() {
      this.creating = true;

      this.card.images = this.images.map((image, index) => {
        const name = `${moment(new Date()).unix()}_${index}.jpeg`;
        this.$storageService.uploadImage(image, name);
        return name;
      });

      this.$cardService.createCard(this.card).then(() => {
        this.creating = false;
        alert({
          title: 'Your card was created!',
          okButtonText: 'Ok',
        }).then(() => {
          this.$navigateTo(routes.home, {
            clearHistory: true,
            animated: false,
          });
        });
      });
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
          this.$navigateTo(routes.home, {
            clearHistory: true,
            animated: false,
          });
        }
      });
    },

    // Take picture and pass to cropper
    async takePicture() {
      let source = new ImageSource();

      camera
        .takePicture()
        .then(imageAsset => {
          source.fromAsset(imageAsset).then(source => {
            this.editPicture(source);
          });
        })
        .catch(function(err) {
          console.log('Error -> ' + err.message);
        });
    },

    // Select picture from phone
    async selectPicture() {
      let image;
      let source = new ImageSource();
      let context = imagepicker.create({
        mode: 'single',
      });

      context
        .authorize()
        .then(() => {
          return context.present();
        })
        .then(selection => {
          selection.forEach(selected => {
            source.fromAsset(selected).then(source => {
              setTimeout(async () => {
                this.editPicture(source);
              }, 250);
            });
          });
        })
        .catch(e => {
          console.log('error in selectPicture', e);
        });
    },

    // Edit and crop the picture
    async editPicture(source) {
      const imageCropper = new ImageCropper();

      setTimeout(async () => {
        await imageCropper
          .show(source)
          .then(({ response, image }) => {
            if (response === 'Success') {
              this.images.push(image);
            }
          })
          .catch(function(e) {
            console.log('ERROR', e);
          });
      }, 100);
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
.segmented-bar {
  width: 90%;
  margin-bottom: 50px;
  color: white;
  background-color: #a0aec0;
  selected-background-color: #0e4466;
  font-size: 13;
}

.header {
  font-size: 20px;
  font-weight: 700;
  width: 85%;
  margin-bottom: 75px;
  letter-spacing: 0.075px;
}

.button {
  color: white;
  background-color: #0f6ca6;
  font-weight: 500;
  font-size: 12;
  padding: 20px;
  border-radius: 25px;
  width: 33%;
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

.input {
  placeholder-color: #a0aec0;
  border-bottom-width: 0;
  background-color: #edf2f7;
  border-radius: 25px;
  padding: 20px;
  font-size: 15px;
  width: 85%;
}

.img {
  width: 325;
  border-radius: 20px;
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
  font-size: 20px;
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
