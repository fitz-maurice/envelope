<template>
  <Frame>
    <Page
      actionBarHidden="true"
      backgroundSpanUnderStatusBar="false"
      @loaded="pageLoaded"
    >
      <GridLayout rows="*" columns="*">
        <Label
          row="1"
          class="m-y-10"
          text="This is the loading page"
          textWrap="true"
          verticalAlignment="bottom"
        ></Label>
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>
import * as firebase from 'nativescript-plugin-firebase';
import * as application from 'tns-core-modules/application';
import routes from '~/router';

export default {
  data() {
    return {
      initDone: false,
    };
  },

  methods: {
    goToNexPage() {
      setTimeout(() => {
        // TODO: Add logic to check if logged in, route home / login
        this.$navigateTo(routes.home, { clearHistory: true });
      }, 500);
    },

    pageLoaded() {
      if (this.initDone) {
        console.log('>> not initing again!');
        this.goToNexPage();
        return;
      }
      console.log('PAGE->LOADED');

      firebase.init().then(instance => {
        console.log('>> firebase initialized');
        this.initDone = true;
        this.$navigateTo(routes.login);
      });

      //     application.on(application.suspendEvent, () => {
      //       // if (this.$authService.isLoggedIn()) {
      //       //   this.$editingUserService.clearListener();
      //       // }
      //     });

      //     application.on(application.resumeEvent, () => {
      //       // if (this.$authService.isLoggedIn()) {
      //       //   this.$authService.refresh();
      //       //   if (
      //       //     this.$editingUserService.userWrapper &&
      //       //     this.$editingUserService.userWrapper.user
      //       //   ) {
      //       //     this.$editingUserService.watchUser();
      //       //     const player = this.$editingUserService.userWrapper.team
      //       //       ? undefined
      //       //       : this.$editingUserService.userWrapper.user;
      //       //     EventBus.$emit('player-selected', { picked: 'dummy', player });
      //       //   }
      //       // }
      //     });

      //     application.on(application.uncaughtErrorEvent, args => {
      //       if (application.android) {
      //         // For Android applications, args.android is an NativeScriptError.
      //         console.log(' *** NativeScriptError *** : ' + args.android);
      //         console.log(' *** StackTrace *** : ' + args.android.stackTrace);
      //         console.log(
      //           ' *** nativeException *** : ' + args.android.nativeException,
      //         );
      //         // firebase.crashlytics.sendCrashLog(args.android.nativeException);
      //       } else if (application.ios) {
      //         // For iOS applications, args.ios is NativeScriptError.
      //         console.log(' *** NativeScriptError  *** : ' + args.ios);
      //         // firebase.crashlytics.sendCrashLog(args.ios);
      //       }
      //     });

      //     this.goToNexPage();
      //   })
      //   .catch(error => {
      //     console.log(`firebase.init error: ${error}`);
      //     this.goToNexPage();
      //   });
    },
  },
};
</script>

<style scoped>
.spin {
  animation-name: spin;
  animation-duration: 4;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
