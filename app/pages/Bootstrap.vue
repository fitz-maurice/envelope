<template>
  <Page
    @loaded="loaded"
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="false"
  >
    <Loader />
  </Page>
</template>

<script>
import routes from '~/router';
import * as firebase from 'nativescript-plugin-firebase';
import * as application from 'tns-core-modules/application';
import Loader from '~/components/Loader';

export default {
  components: {
    Loader,
  },
  methods: {
    // The application has loaded
    loaded() {
      // Initialize Firebae
      firebase.init();
      firebase.addAuthStateListener({
        onAuthStateChanged: data => {
          if (data.loggedIn) {
            this.$authService.auth = data.user;
            this.$userService.auth = data.user;
            this.$cardService.auth = data.user;
            this.$storageService.auth = data.user;
            this.$userService.getUserDocument();
            this.$navigateTo(routes.home, {
              animated: false,
              clearHistory: true,
            });
          } else
            this.$navigateTo(routes.login, {
              animated: false,
              clearHistory: true,
            });
        },
      });

      // application.on(application.suspendEvent, () => {
      //   if (this.$authService.isLoggedIn()) {
      //     this.$editingUserService.clearListener();
      //   }
      // });

      // application.on(application.resumeEvent, () => {
      //   if (this.$authService.isLoggedIn()) {
      //     this.$authService.refresh();
      //     if (
      //       this.$editingUserService.userWrapper &&
      //       this.$editingUserService.userWrapper.user
      //     ) {
      //       this.$editingUserService.watchUser();
      //       const player = this.$editingUserService.userWrapper.team
      //         ? undefined
      //         : this.$editingUserService.userWrapper.user;
      //       EventBus.$emit('player-selected', { picked: 'dummy', player });
      //     }
      //   }
      // });

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
