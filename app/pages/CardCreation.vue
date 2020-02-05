<template>
  <Frame id="modal">
    <Page @loaded="loaded">
      <ActionBar
        title="Create New Card"
        backgroundColor="#0F6CA6"
        color="white"
      >
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
          v-model="selectedBarIndex"
          :items="segmentedBarItems"
          v-shadow="3"
          class="segmented-bar"
        />

        <Loader v-show="creating" />

        <component
          v-for="(view, index) in ['CardData', 'CardImages']"
          v-show="index === selectedBarIndex"
          :key="index"
          :is="view"
          :card="card"
          :images="images"
          :creating="creating"
          :showErrors="showErrors"
          @dateChange="e => (card.date = e)"
          @image="e => images.push(e)"
        />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import routes from '~/router';
import Loader from '@/components/Loader';
import CardService from '@/services/card';
import CardData from '@/components/CardData';
import CardImages from '@/components/CardImages';
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

const cardService = new CardService();

export default {
  components: {
    Loader,
    CardData,
    CardImages,
  },
  data() {
    return {
      segmentedBarItems: (function() {
        var segmentedBarModule = require('tns-core-modules/ui/segmented-bar');
        let segmentedBarItem1 = new segmentedBarModule.SegmentedBarItem();
        segmentedBarItem1.title = 'Card Info';
        let segmentedBarItem2 = new segmentedBarModule.SegmentedBarItem();
        segmentedBarItem2.title = 'Card Images';
        return [segmentedBarItem1, segmentedBarItem2];
      })(),
      selectedBarIndex: 0,
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

    // Take user to app settings
    goToAppSettings() {
      openAppSettings();
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

      this.card.images = this.images.map(image =>
        image.toBase64String('jpeg', 85),
      );

      cardService
        .createCard(this.card)
        .then(() => {
          this.creating = false;
          alert({
            title: 'Your card was created!',
            okButtonText: 'Ok',
          }).then(() => {
            this.$modal.close();
          });
        })
        .catch(err => console.log(err));
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
        }
      });
    },
  },
};
</script>

<style lang="scss">
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
