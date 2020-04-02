<template>
  <Page ref="page" :backgroundColor="$root.darkMode ? 'black' : 'white'">
    <ActionBar title="Card Images" backgroundColor="#590404" color="white">
      <NavigationButton
        text=""
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
      <ActionItem text="Save" ios.position="right" @tap="save" />
    </ActionBar>

    <ScrollView key="main" class="m-t-30" height="100%">
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

      <!-- Loading icon -->
      <LoaderCustom v-show="creating" />
    </ScrollView>
  </Page>
</template>

<script>
import { openAppSettings } from 'nativescript-advanced-permissions/core';
import moment from 'moment';
import { mapGetters } from 'vuex';
import Picker from '@/native/picker';
import CardService from '@/services/card';
import { Frame } from 'tns-core-modules/ui/frame';
import { ios } from 'tns-core-modules/application';
import LoaderCustom from '@/components/LoaderCustom';
const dialogs = require('tns-core-modules/ui/dialogs');

const cardService = new CardService();

export default {
  components: {
    LoaderCustom,
  },
  props: {
    images: Array,
  },
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
      showErrors: false,
      creating: false,
    };
  },
  computed: {
    ...mapGetters(['tagList']),
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

    // Create the new card
    save() {
      if (!this.formValid) {
        this.showErrors = true;
        return;
      }

      if (this.creating === true) return;

      this.creating = true;

      this.card.images = this.images
        .filter(image => image !== '')
        .map(image => image.toBase64String('jpeg', 85));

      cardService
        .createCard(this.card)
        .then(() => {
          this.creating = false;
          // Refetch user document to refresh people list
          this.$userService.getUserDocument();

          alert({
            title: 'Your card was created!',
            okButtonText: 'Ok',
          }).then(() => {
            this.$modal.close('created');
            // Reset status bar color
            if (!this.$root.darkMode) {
              UIApplication.sharedApplication.setStatusBarStyleAnimated(
                UIStatusBarStyle.Default,
                true,
              );
            }
          });
        })
        .catch(err => console.log(err));
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
</style>
