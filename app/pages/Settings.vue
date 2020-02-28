<template>
  <Page>
    <!-- Action Bar -->
    <ActionBar title="Account" />

    <!-- Main Scroll View -->
    <ScrollView orientation="vertical">
      <FlexboxLayout flexDirection="column" justifyContent="space-between">
        <StackLayout>
          <!-- SETTING -->
          <Label text="SETTINGS" class="section-header" />

          <!-- Full name -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper personal-info"
          >
            <Label text.decode="&#xf007;" class="far icon" />
            <TextField
              v-model="$userService.user.displayName"
              class="name-input"
              hint="Full name"
              autocorrect="false"
              returnKeyType="done"
              horizontalAlignment="stretch"
            >
            </TextField>
          </StackLayout>

          <!-- Birthday -->
          <StackLayout
            class="input-wrapper personal-info"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf133;" class="far icon" />
            <DatePickerField
              v-model="$userService.user.birthday"
              :maxDate="today"
              hint="Birthday"
              class="name-input"
              borderBottomWidth="0"
              dateFormat="MM/dd/yyyy"
            />
          </StackLayout>

          <!-- Save -->
          <Button
            @tap="updateUser"
            :isEnabled="!updating"
            text="Save"
            color="white"
            class="action"
            backgroundColor="#590404"
            horizontalAlignment="stretch"
          />

          <!-- Subscriptions -->
          <Label text="PREMIUM" class="section-header" />
          <FlexboxLayout justifyContent="space-between" @tap="subscription">
            <StackLayout
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Image
                width="30"
                height="30"
                class="m-l-2"
                src="~/assets/envelope.png"
              ></Image>
              <Label class="label" text="Envelope Premium" />
            </StackLayout>

            <Label
              text.decode="&#xf105;"
              class="far m-r-15 caret input-wrapper"
            />
          </FlexboxLayout>

          <!-- Support -->
          <Label text="SUPPORT" class="section-header" />
          <!-- Email Support -->
          <StackLayout
            @tap="emailSupport"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf0e0;" class="far icon" />
            <Label
              class="label"
              text="Email Support"
              horizontalAlignment="stretch"
            >
            </Label>
          </StackLayout>

          <!-- Advanced -->
          <StackLayout
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf013;" class="far icon" />
            <Label
              class="label"
              text="Advanced"
              horizontalAlignment="stretch"
            />
          </StackLayout>
          <!-- Help Center -->
          <StackLayout
            @tap="help"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf059;" class="far icon" />
            <Label class="label" text="Help Center" />
          </StackLayout>

          <!-- About -->
          <Label text="ABOUT" class="section-header" />
          <!-- Refer a Friend -->
          <StackLayout
            @tap="share"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf164;" class="far icon" />
            <Label class="label" text="Refer a Friend" />
          </StackLayout>
          <!-- Rate -->
          <StackLayout
            @tap="rate"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf005;" class="far icon" />
            <Label class="label" text="Rate in the App Store" />
          </StackLayout>
          <!-- Follow -->
          <StackLayout
            @tap="follow"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
          >
            <Label text.decode="&#xf099;" class="fab icon" />
            <Label class="label" text="Follow Envelope" />
          </StackLayout>

          <!-- APP -->
          <Label text="APP" class="section-header" />
          <!-- Acknowledgements -->
          <FlexboxLayout justifyContent="space-between" @tap="ack">
            <StackLayout
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
            >
              <Label text.decode="&#xf14e;" class="far icon" />
              <Label class="label" text="Acknowledgements" />
            </StackLayout>

            <Label
              text.decode="&#xf105;"
              class="far m-r-15 input-wrapper caret"
            />
          </FlexboxLayout>
          <!-- Version -->
          <FlexboxLayout
            width="100%"
            class="input-wrapper"
            justifyContent="space-between"
          >
            <StackLayout orientation="horizontal" horizontalAlignment="stretch">
              <Label text.decode="&#xf126;" class="far icon" />
              <Label class="label" text="Version" width="75%" />
            </StackLayout>

            <Label :text="version" class="m-r-5" />
          </FlexboxLayout>
        </StackLayout>

        <Button
          @tap="logout"
          color="white"
          class="action"
          text="Sign Out"
          marginTop="15"
          backgroundColor="#590404"
          horizontalAlignment="stretch"
        />
        <FlexboxLayout justifyContent="center" class="m-t-25 footer">
          <Label text.decode="&copy;" class="far" />
          <Label :text="copyright" />
        </FlexboxLayout>
        <FlexboxLayout justifyContent="center" class="footer">
          <Label text="Terms" color="#590404" @tap="terms" />
          <Label text=" & " />
          <Label text="Privacy Policy" color="#590404" @tap="privacy" />
        </FlexboxLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import routes from '~/router';
import { mapActions } from 'vuex';
import * as email from 'nativescript-email';
import { appRater } from 'nativescript-rater';
import { openApp } from 'nativescript-open-app';
import { platform } from 'tns-core-modules/platform';
import InAppBrowser from 'nativescript-inappbrowser';
import * as appversion from 'nativescript-appversion';
import * as SocialShare from 'nativescript-social-share';

export default {
  data() {
    return {
      updating: false,
      version: appversion.getVersionCodeSync(),
    };
  },
  computed: {
    copyright() {
      return ` ${new Date().getFullYear()} Envelope`;
    },
    today() {
      return new Date();
    },
  },
  methods: {
    ...mapActions(['clearCards']),

    /**
     * Log user out and clear cards
     */
    logout() {
      this.clearCards();
      this.$userService.userRef = null;
      this.$authService.logout();
    },

    /**
     * Update the user
     */
    updateUser() {
      this.updating = true;
      this.$userService.updateUser().then(() => {
        this.updating = false;
        alert({
          title: 'Account has been updated!',
          okButtonText: 'Dismiss',
        });
      });
    },

    /**
     * Rate the application
     */
    rate() {
      appRater.showRateDialog();
    },

    /**
     * Share the application
     */
    share() {
      // Third param is Android only
      SocialShare.shareUrl(
        'https:envelope.app/',
        'Envelope',
        'How would you like to share Envelope?',
      );
    },

    /**
     * Follow on Twitter
     */
    follow() {
      platform.isIOS
        ? openApp('twitter://user?screen_name=envelope_app', true, '333903271')
        : openApp('com.twitter.android://user?screen_name=envelope_app');
    },

    /**
     * Email Support
     */
    emailSupport() {
      email
        .available()
        .then(available =>
          email.compose({
            subject: 'Support Ticket',
            to: ['admin@envelope.app'],
          }),
        )
        .then(() => alert('Support has been contacted.'));
    },

    /**
     * Navigatio to the Subscriptions page
     */
    subscription() {
      this.$navigateTo(routes.subscription, { frame: 'main' });
    },

    /**
     * Navigate to the acknowledgements page
     */
    ack() {
      this.$navigateTo(routes.acknowledgements, { frame: 'main' });
    },

    /**
     * Open the help page in InAppBrowser
     */
    help() {
      this.openInAppBrowser('https://envelope.app/help?m=true');
    },

    /**
     * Open the terms page in InAppBrowser
     */
    terms() {
      this.openInAppBrowser('https://envelope.app/terms?m=true');
    },

    /**
     * Open the privacy page in InAppBrowser
     */
    privacy() {
      this.openInAppBrowser('https://envelope.app/privacy?m=true');
    },

    /**
     * Open url in InAppBrowser
     */
    openInAppBrowser(url) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'Back',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'popover',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: true,
        // Android Properties
        showTitle: true,
        toolbarColor: '#590404',
        secondaryToolbarColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    },
  },
};
</script>

<style scoped>
Page {
  background-color: #f0eff4;
}

.name-input {
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  border-bottom-width: 0;
  background-color: #f0eff4;
}

.personal-info {
  padding: 10px 100px 10px 50px !important;
}

.section-header {
  font-size: 12;
  color: #718096;
  padding: 55px 30px 20px 50px;
  border-bottom-width: 1px;
  background-color: #f0eff4;
  border-bottom-color: #c6c6c8;
}

.input-wrapper {
  padding: 23px 50px;
  background-color: #ffffff;
  border-bottom-width: 1px;
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

.label {
  width: 100%;
  font-size: 14px;
  margin-left: 40px;
}

.action {
  margin: 0;
  font-weight: 700;
  border-bottom-color: #c6c6c8;
}

.caret {
  font-size: 14px;
  color: #718096;
}

.footer {
  font-size: 12px;
}
</style>
