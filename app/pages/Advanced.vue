<template>
  <Page>
    <StackLayout>
      <Label text="ADVANCED" class="section-header" />
      <!-- Delete Account -->
      <StackLayout
        v-tapped
        @tap="deleteAccount"
        class="input-wrapper"
        orientation="horizontal"
        horizontalAlignment="stretch"
      >
        <Label text.decode="&#xf071;" class="far icon" />
        <Label
          class="label"
          text="Delete Account"
          horizontalAlignment="stretch"
        >
        </Label>
      </StackLayout>

      <!-- Download Data -->
      <StackLayout
        v-tapped
        @tap="exportData"
        class="input-wrapper"
        orientation="horizontal"
        horizontalAlignment="stretch"
      >
        <Label text.decode="&#xf56d;" class="far icon" />
        <Label class="label" text="Export Data" horizontalAlignment="stretch">
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
              .then(function(result) {
                this.clearCards();
                this.$userService.userRef = null;
                this.$authService.logout();
              })
              .catch(function(err) {
                console.warn(err);
              });
          }
        }
      });
    },
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
Page {
  background-color: #f0eff4;
}

.section-header {
  font-size: 12;
  color: #718096;
  padding: 55px 30px 20px 50px;
  border-bottom-width: 1px;
  background-color: #f0eff4;
  border-bottom-color: #c6c6c8;
}

.icon {
  width: 85px;
  height: 85px;
  color: #fff;
  font-size: 14px;
  margin-right: 0;
  text-align: center;
  border-radius: 20px;
  background-color: #590404;
}

.input-wrapper {
  padding: 23px 50px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
}

.label {
  width: 100%;
  font-size: 14px;
  margin-left: 40px;
}
</style>
