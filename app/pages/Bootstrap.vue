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
    loaded() {
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
            this.loadCards(true);
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

      // application.on(application.resumeEvent, () => {});

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
