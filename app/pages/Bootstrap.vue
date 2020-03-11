<template>
  <Page
    @loaded="loaded"
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="false"
  >
    <LoaderCustom :loading="loading" />
  </Page>
</template>

<script>
import routes from '~/router';
import { mapActions } from 'vuex';
import LoaderCustom from '@/components/LoaderCustom';
import * as firebase from 'nativescript-plugin-firebase';
import * as application from 'tns-core-modules/application';
import { hasCameraPermissions } from 'nativescript-advanced-permissions/camera';
import { hasFilePermissions } from 'nativescript-advanced-permissions/files';
import { hasKey } from 'tns-core-modules/application-settings/application-settings';
import { openAppSettings } from 'nativescript-advanced-permissions/core';

export default {
  components: {
    LoaderCustom,
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    ...mapActions(['loadCards', 'setHolidays']),
    // The application has loaded
    async loaded() {
      this.$root.darkMode =
        application.systemAppearance() === 'dark' ? true : false;

      this.$root.nativeView.addEventListener(
        'traitCollectionColorAppearanceChanged',
        () => {
          this.$nextTick(() => {
            this.$root.darkMode =
              application.systemAppearance() === 'dark' ? true : false;
          });
        },
      );

      this.setHolidays();

      // Initialize Firebase
      firebase.init();
      firebase.addAuthStateListener({
        onAuthStateChanged: data => {
          if (data.loggedIn) {
            // Assign uid in Base class
            this.$baseService.uid = data.user.uid;
            this.$userService.email = data.user.email;
            // Load the user's cards through Vuex
            this.loadCards();
            // Fetch the user document
            this.$userService.getUserDocument();

            // Finished loading
            this.loading = false;

            // Navigate to Home
            this.$navigateTo(routes.home, {
              frame: 'main',
              animated: false,
              clearHistory: true,
            });
          } else {
            // Finished loading
            this.loading = false;

            // Navigate to Login
            this.$navigateTo(routes.login, {
              frame: 'main',
              animated: false,
              clearHistory: true,
            });
          }
        },
      });

      // application.on(application.suspendEvent, () => {
      //   if (this.$authService.isLoggedIn()) {
      //     this.$editingUserService.clearListener();
      //   }
      // });

      application.on(application.resumeEvent, () => {
        // Check if we have checked for permission already
        // If we have and they are not set prompt to update
        const keySet = hasKey('firstTimePermissions');
        if (keySet) {
          if (!hasCameraPermissions() || !hasFilePermissions()) {
            confirm({
              title: 'Missing Permissions',
              message:
                'Envelope requires access to both your camera and photos library to function properly. Please check application settings.',
              okButtonText: 'Settings',
              cancelButtonText: 'Dismiss',
            }).then(result => {
              if (result) {
                openAppSettings();
              }
            });
          }
        }
      });

      // application.on(application.uncaughtErrorEvent, args => {
      //   if (application.android) {
      //     // For Android applications, args.android is an NativeScriptError.
      //     console.log(' *** NativeScriptError *** : ' + args.android);
      //     console.log(' *** StackTrace *** : ' + args.android.stackTrace);
      //     console.log(
      //       ' *** nativeException *** : ' + args.android.nativeException,
      //     );
      //     // firebase.crashlytics.sendCrashLog(args.android.nativeException);
      //   } else if (application.ios) {
      //     // For iOS applications, args.ios is NativeScriptError.
      //     console.log(' *** NativeScriptError  *** : ' + args.ios);
      //     // firebase.crashlytics.sendCrashLog(args.ios);
      //   }
      // });
    },
  },
};
</script>
