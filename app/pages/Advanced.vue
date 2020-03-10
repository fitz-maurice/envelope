<template>
  <Page>
    <!-- Action Bar -->
    <ActionBar title="Advanced Options" />

    <!-- Main Scroll View -->
    <StackLayout>
      <Label
        text="ADVANCED"
        class="section-header"
        :backgroundColor="$root.darkMode ? 'black' : '#f0eff4'"
        :color="$root.darkMode ? 'white' : '#718096'"
      />

      <!-- Download Data -->
      <StackLayout
        v-tapped
        @tap="exportData"
        class="input-wrapper"
        orientation="horizontal"
        horizontalAlignment="stretch"
        :backgroundColor="$root.darkMode ? '#212121' : 'white'"
      >
        <Label text.decode="&#xf56d;" class="far icon" />
        <Label class="label" text="Export Data" horizontalAlignment="stretch">
        </Label>
      </StackLayout>

      <!-- Delete Account -->
      <StackLayout
        v-tapped
        @tap="deleteAccount"
        class="input-wrapper"
        orientation="horizontal"
        horizontalAlignment="stretch"
        :backgroundColor="$root.darkMode ? '#212121' : 'white'"
      >
        <Label text.decode="&#xf071;" class="far icon" />
        <Label
          class="label"
          text="Delete Account"
          horizontalAlignment="stretch"
        >
        </Label>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
import * as firebase from 'nativescript-plugin-firebase';

export default {
  methods: {
    ...mapActions(['clearCards']),

    /**
     * Delete a users account and log them out of the app
     */
    deleteAccount() {
      confirm({
        title: 'Delete Account',
        message:
          'You will be sent an export of your data before your account and all of its data is permanently deleted. This action cannot be undone. Are you sure you want to delete your account?',
        okButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result) {
          if (result) {
            // Un-comment below to use local emulators for developing
            // firebase.functions.useFunctionsEmulator('http://localhost:5001');
            const deleteFn = firebase.functions.httpsCallable('deleteAccount');

            deleteFn({ uid: this.$baseService.uid })
              .then(result => {
                this.clearCards();
                this.$userService.userRef = null;
                this.$authService.logout();
              })
              .catch(err => {
                console.warn(err);
              });
          }
        }
      });
    },

    /**
     * Export all data in an emailed .zip file
     */
    exportData() {
      confirm({
        title: 'Export Data',
        message:
          'Requesting an export will send you an email with an attachment of all your data to the email address used when signing up.',
        okButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async result => {
        if (result) {
          // Un-comment below to use local emulators for developing
          // firebase.functions.useFunctionsEmulator('http://localhost:5001');
          const exportFn = firebase.functions.httpsCallable('exportUserData');

          exportFn({
            uid: this.$baseService.uid,
            email: this.$userService.email,
          })
            .then(response => console.log(response))
            .catch(e => console.log(e));
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 12;
  color: #718096;
  padding: 15 10 10 10;
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
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

.input-wrapper {
  padding: 8 10;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
}

.label {
  width: 100%;
  font-size: 14;
  margin-left: 15;
}
</style>
