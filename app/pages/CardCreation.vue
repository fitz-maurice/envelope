<template>
  <Frame id="modal">
    <Page
      ref="page"
      @loaded="loaded"
      :backgroundColor="$root.darkMode ? 'black' : 'white'"
    >
      <ActionBar
        title="Create New Card"
        backgroundColor="#590404"
        color="white"
      >
        <ActionItem text="Cancel" ios.position="left" @tap="cancel" />
        <ActionItem text="Next" ios.position="right" @tap="next" />
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
      <ScrollView v-else key="main" class="m-t-30" height="100%">
        <StackLayout height="100%">
          <!-- From -->
          <StackLayout>
            <Label
              text="Who was the card from?"
              class="label"
              :class="{ 'input-error': showErrors && !fromValid }"
            />
            <Label
              @tap="selectPerson"
              :text="card.from"
              class="input"
              :color="fromColor"
              :backgroundColor="$root.darkMode ? '#313131' : '#edf2f7'"
            />
          </StackLayout>

          <!-- Tag type -->
          <StackLayout class="m-t-15">
            <StackLayout>
              <Label
                text="What was the occassion?"
                class="label m-b-5"
                :class="{ 'input-error': showErrors && !tagValid }"
              />
              <Label
                @tap="selectTag"
                :text="card.tag"
                class="input"
                :color="tagColor"
                :backgroundColor="$root.darkMode ? '#313131' : '#edf2f7'"
              />
            </StackLayout>
          </StackLayout>

          <!-- Date -->
          <StackLayout class="m-t-15">
            <Label
              text="When did you receive the card?"
              class="label"
              :class="{ 'input-error': showErrors && !dateValid }"
            />
            <Label
              @tap="selectDate"
              :text="card.date"
              class="input"
              :color="dateColor"
              :backgroundColor="$root.darkMode ? '#313131' : '#edf2f7'"
            />
          </StackLayout>

          <!-- Notes -->
          <StackLayout class="m-t-15">
            <Label text="Notes (optional)" class="label" />
            <TextView
              v-model="card.notes"
              @tap="closePicker"
              class="input"
              returnKeyType="done"
              height="65%"
              :backgroundColor="$root.darkMode ? '#313131' : '#edf2f7'"
              :color="$root.darkMode ? 'white' : 'black'"
            />
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </Page>
  </Frame>
</template>

<script>
import routes from '~/router';
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
import { mapGetters } from 'vuex';
import Picker from '@/native/picker';
import moment from 'moment';
const dialogs = require('tns-core-modules/ui/dialogs');
import { ios } from 'tns-core-modules/application';
import { Frame } from 'tns-core-modules/ui/frame';

export default {
  data() {
    return {
      card: {
        from: 'Name',
        tag: 'Type of card',
        date: 'Received date',
        notes: '',
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      keySet: false,
      showErrors: false,
    };
  },
  computed: {
    ...mapGetters(['tagList']),
    hasPermissions() {
      return hasCameraPermissions() && hasFilePermissions();
    },
    fromValid() {
      return this.card.from !== '' && this.card.from !== 'Name';
    },
    tagValid() {
      return this.card.tag !== '' && this.card.tag !== 'Type of card';
    },
    dateValid() {
      return this.card.date !== 'Received date' && this.card.date !== '';
    },
    formValid() {
      return this.fromValid && this.tagValid && this.dateValid;
    },
    fromColor() {
      return this.card.from === 'Name'
        ? '#718096'
        : this.$root.darkMode
        ? 'white'
        : 'black';
    },
    tagColor() {
      return this.card.tag === 'Type of card'
        ? '#718096'
        : this.$root.darkMode
        ? 'white'
        : 'black';
    },
    dateColor() {
      return this.card.date === 'Received date'
        ? '#718096'
        : this.$root.darkMode
        ? 'white'
        : 'black';
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

    selectPerson() {
      const picker = new Picker('Select or enter new person', {
        items: [''].concat(this.$userService.user.people.sort()),
        fields: 3,
      });

      picker.pick().then(result => {
        if (result === 'new') {
          prompt({
            title: 'New person',
            message: "Provide the person's name who gifted you the card",
            okButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputType: dialogs.inputType.email,
          }).then(result => {
            if (result.result) this.card.from = result.text.trim();
          });
        } else {
          if (result)
            this.card.from = this.$userService.user.people[result - 1];
        }
      });
    },

    selectDate() {
      const picker = new Picker('Select date', {
        type: 'date',
      });
      picker.pick().then(result => {
        if (result) this.card.date = moment(result).format('MM/DD/YYYY');
      });
    },

    selectTag() {
      const picker = new Picker('Select an occassion', { items: this.tagList });
      picker.pick().then(result => {
        if (result) this.card.tag = this.tagList[result];
      });
    },

    next() {
      if (!this.formValid) {
        this.showErrors = true;
        return;
      }

      this.$navigateTo(routes.cardImages, {
        frame: 'modal',
        props: {
          card: this.card,
        },
      }).catch(err => console.log(err));
    },

    // Take user to app settings
    goToAppSettings() {
      openAppSettings();
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
  },
};
</script>

<style lang="scss" scoped>
.label {
  width: 85%;
  font-size: 13;
  font-weight: 500;
  letter-spacing: 0.025;
}

.input {
  border-bottom-width: 0;
  background-color: #edf2f7;
  border-radius: 5;
  padding: 8;
  height: 40;
  font-weight: 500;
  font-size: 18;
  width: 85%;
}

.input-error {
  color: red;
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
