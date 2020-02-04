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
      <StackLayout v-show="selectedView === 0" key="data">
        <!-- Header text -->
        <Label
          text="Tell us a little about the card you received"
          textWrap="true"
          class="header"
        />

        <!-- From -->
        <StackLayout>
          <Label
            text="Who was the card from?"
            class="label"
            :class="{ 'input-error': showErrors && !fromValid }"
          />
          <TextField
            v-model="card.from"
            v-shadow="2"
            hint="Card giver's name"
            returnKeyType="done"
            class="input"
          />
        </StackLayout>

        <!-- Tag type -->
        <StackLayout class="m-t-15">
          <Label
            text="What was the occassion?"
            class="label"
            :class="{ 'input-error': showErrors && !tagValid }"
          />
          <TextField
            v-model="card.tag"
            v-shadow="2"
            returnKeyType="done"
            hint="Type of card"
            class="input"
          />
        </StackLayout>

        <!-- Date -->
        <StackLayout class="m-t-15">
          <Label
            text="When did you receive the card?"
            class="label"
            :class="{ 'input-error': showErrors && !dateValid }"
          />
          <DatePickerField
            v-model="card.date"
            @dateChange="dateChange"
            hint="Date Received"
            dateFormat="MM/dd/yyyy"
            class="input"
          />
        </StackLayout>

        <!-- Notes -->
        <StackLayout class="m-t-15">
          <Label text="Notes (optional)" class="label" />
          <TextView
            v-model="card.notes"
            v-shadow="2"
            class="input"
            returnKeyType="done"
            height="75%"
          />
        </StackLayout>
      </StackLayout>

      <!-- Images -->
      <StackLayout
        v-show="selectedView === 1"
        key="images"
        orientation="vertical"
        horizonalAlignment="center"
      >
        <!-- Buttons -->
        <FlexboxLayout justifyContent="space-around" class="p-x-25">
          <Label
            @tap="selectPicture"
            text="Select Picture"
            v-shadow="10"
            class="button"
          />

          <Label
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
import { hasKey, setBoolean } from 'tns-core-modules/application-settings';
import CardService from '@/services/card';
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

const cardService = new CardService();

export default {
  data() {
    return {
      selectedView: 0,
      views: ['Card Info', 'Images'],
      card: {
        from: '',
        tag: '',
        date: undefined,
        notes: '',
        images: [],
      },
      images: [],
      creating: false,
      keySet: true,
      showErrors: false,
    };
  },
  computed: {
    today() {
      return moment(new Date()).format('MM/DD/YYYY');
    },
    hasPermissions() {
      return hasCameraPermissions() && hasFilePermissions();
    },
    fromValid() {
      return this.card.from !== '';
    },
    tagValid() {
      return this.card.tag !== '';
    },
    dateValid() {
      return this.card.date !== undefined;
    },
    imagesValid() {
      return this.images.length > 0 && this.images.length <= 5;
    },
    formValid() {
      return (
        this.fromValid && this.tagValid && this.dateValid && this.imagesValid
      );
    },
  },
  methods: {
    // Bootstrap the page
    loaded(args) {
      const keySet = hasKey('firstTimePermissions');
      this.keySet = keySet;

      if (!keySet) {
        requestCameraPermissions();
        requestFilePermissions();
      }

      if (this.hasPermissions) {
        setBoolean('firstTimePermissions', true);
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
    save() {
      if (this.creating === true) return;

      this.creating = true;

      if (!this.formValid) {
        this.showErrors = true;
        this.creating = false;

        alert({
          title: 'Missing information!',
          message:
            'Please fill out all fields and have at least 1 image attached.',
          okButtonText: 'Ok',
        });

        return;
      }

      this.card.images = this.images.map((image, index) => {
        const name = `${moment(new Date()).unix()}_${index}.jpeg`;
        this.$storageService.uploadImage(image, name);
        return name;
      });

      cardService.createCard(this.card).then(() => {
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
    takePicture() {
      let source = new ImageSource();

      camera.requestPermissions().then(
        () => {
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
        () => {
          console.log('No permissions for camera');
        },
      );
    },

    // Select picture from phone
    selectPicture() {
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
  height: 125px;
  font-size: 13;
  border-radius: 25px;
  width: 33%;
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

.input {
  placeholder-color: #a0aec0;
  border-bottom-width: 0;
  background-color: #edf2f7;
  border-radius: 25px;
  padding: 20px;
  font-size: 15px;
  width: 85%;
}

.input-error {
  color: red;
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
