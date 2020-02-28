<template>
  <Frame id="modal">
    <Page ref="page" @loaded="loaded" @tap="outsideForms">
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
      <StackLayout v-else key="main" class="m-t-30">
        <!-- From -->
        <StackLayout>
          <Label
            text="Who was the card from?"
            class="label"
            :class="{ 'input-error': showErrors && !fromValid }"
          />
          <RadAutoCompleteTextView
            ref="auto"
            :items="peopleList"
            :suggestMode="suggestMode"
            :completionMode="completionMode"
            :displayMode="displayMode"
            @textChanged="onTextChanged"
            @tap="closePicker"
            hint="Card giver's name"
          >
            <SuggestionView ~suggestionView>
              <StackLayout v-suggestionItemTemplate orientation="horizontal">
                <v-template scope="item">
                  <Label ref="person" col="1" :text="item.text" class="p-l-5" />
                </v-template>
              </StackLayout>
            </SuggestionView>
          </RadAutoCompleteTextView>
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
              @tap="pickerOpen ? '' : showPicker()"
              :text="card.tag"
              class="input"
              :color="tagValid ? 'black' : '#a0aec0'"
            />
            <ListPicker
              id="tag"
              class="m-y-5"
              opacity="0"
              :items="tagList"
              :selectedIndex="tagIndex"
              @selectedIndexChange="tagChange"
            />
          </StackLayout>
        </StackLayout>

        <StackLayout id="moveTag">
          <!-- Date -->
          <StackLayout class="m-t-10">
            <Label
              text="When did you receive the card?"
              class="label"
              :class="{ 'input-error': showErrors && !dateValid }"
            />
            <DatePickerField
              :date="card.date"
              @tap="closePicker"
              @dateChange="args => (card.date = args.value)"
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
              @tap="closePicker"
              class="input"
              returnKeyType="done"
              height="75%"
            />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import routes from '~/router';
import { openAppSettings } from 'nativescript-advanced-permissions/core';
import { hasKey, setBoolean } from 'tns-core-modules/application-settings';
import { Frame } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import {
  TokenModel,
  AutoCompleteSuggestMode,
  AutoCompleteCompletionMode,
  AutoCompleteDisplayMode,
} from 'nativescript-ui-autocomplete';
import {
  hasCameraPermissions,
  requestCameraPermissions,
} from 'nativescript-advanced-permissions/camera';
import {
  hasFilePermissions,
  requestFilePermissions,
} from 'nativescript-advanced-permissions/files';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { mapGetters } from 'vuex';

export default {
  data() {
    const peopleList = new ObservableArray();
    const people = this.$userService.user.people.sort();
    people.forEach(person =>
      peopleList.push(new TokenModel(person, undefined)),
    );

    return {
      card: {
        from: '',
        tag: 'Type of card',
        date: undefined,
        notes: '',
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      pickerOpen: false,
      tagIndex: 0,
      keySet: true,
      showErrors: false,
      peopleList: peopleList,
      suggestMode: AutoCompleteSuggestMode.Append,
      completionMode: AutoCompleteCompletionMode.StartsWith,
      displayMode: AutoCompleteDisplayMode.Plain,
    };
  },
  computed: {
    ...mapGetters(['tagList']),
    hasPermissions() {
      return hasCameraPermissions() && hasFilePermissions();
    },
    fromValid() {
      return this.card.from !== '';
    },
    tagValid() {
      return this.card.tag !== '' && this.card.tag !== 'Type of card';
    },
    dateValid() {
      return this.card.date !== undefined;
    },
    formValid() {
      return this.fromValid && this.tagValid && this.dateValid;
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

    outsideForms() {
      if (this.pickerOpen) this.closePicker();
    },

    onTextChanged({ text }) {
      this.card.from = text.trim();
    },

    tagChange(e) {
      this.card.tag = this.$store.state.holidays[e.value + 1];
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
        }
      });
    },

    showPicker() {
      if (this.pickerOpen === true) return;
      const picker = this.$refs.page.nativeView.getViewById('tag');
      const view = this.$refs.page.nativeView.getViewById('moveTag');

      view.animate({
        translate: {
          x: 0,
          y: 200,
        },
        duration: 250,
        delay: 50,
        curve: AnimationCurve.easeInOut,
      });

      picker.animate({
        opacity: 1,
        backgroundColor: '#F7FAFC',
        duration: 275,
      });

      this.pickerOpen = true;
    },

    closePicker() {
      const picker = this.$refs.page.nativeView.getViewById('tag');
      const view = this.$refs.page.nativeView.getViewById('moveTag');

      view.animate({
        translate: {
          x: 0,
          y: 0,
        },
        duration: 250,
        delay: 50,
        curve: AnimationCurve.easeInOut,
      });

      picker.animate({
        opacity: 0,
        duration: 275,
      });

      setTimeout(() => {
        this.pickerOpen = false;
      }, 250);
    },
  },
};
</script>

<style lang="scss" scoped>
#moveTag {
  margin-top: -650px;
}

#tag {
  border-width: 0.25 0 0.25 0;
  border-color: #a0aec0;
  margin: 5 30;
}

RadAutoCompleteTextView {
  border-bottom-width: 0;
  background-color: #edf2f7;
  border-radius: 5;
  margin: 5 25 0 25;
  padding: 8;
  height: 40;
  font-weight: 500;
  font-size: 18px;
}

.label {
  width: 85%;
  font-size: 13px;
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
  font-size: 18px;
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
