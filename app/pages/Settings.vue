<template>
  <Page>
    <!-- Action Bar -->
    <ActionBar title="Account" />

    <!-- Main Scroll View -->
    <ScrollView orientation="vertical">
      <FlexboxLayout flexDirection="column" justifyContent="space-between">
        <StackLayout>
          <!-- SETTING -->
          <Label text="SETTINGS" class="section" />

          <!-- Full name -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
          >
            <Label text.decode="&#xf007;" class="far icon" />
            <TextField
              v-model="$userService.user.displayName"
              class="input"
              hint="Full name"
              autocorrect="false"
              returnKeyType="done"
              horizontalAlignment="stretch"
              width="100%"
            >
            </TextField>
          </StackLayout>

          <!-- Birthday -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
          >
            <Label text.decode="&#xf133;" class="far icon" />
            <DatePickerField
              v-model="$userService.user.birthday"
              :maxDate="today"
              hint="Birthday"
              dateFormat="MM/dd/yyyy"
              width="100%"
              borderBottomWidth="0"
            />
          </StackLayout>

          <!-- Save -->
          <Button
            :isEnabled="!updating"
            text="Save"
            color="white"
            backgroundColor="#2f7cf6"
            horizontalAlignment="stretch"
            margin="0"
            @tap="updateUser"
          />

          <!-- Subscriptions -->
          <Label text="Premium" class="section" />
          <FlexboxLayout justifyContent="space-between" @tap="subscription">
            <StackLayout
              orientation="horizontal"
              horizontalAlignment="stretch"
              class="input-wrapper"
            >
              <Image width="15" height="15" src="~/assets/envelope.png"></Image>
              <Label class="label" text="Envelope Premium" />
            </StackLayout>

            <Label text.decode="&#xf105;" class="far m-r-15" fontSize="20" />
          </FlexboxLayout>

          <!-- Support -->
          <Label text="SUPPORT" class="section" />
          <!-- Email Support -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
            @tap="emailSupport"
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
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
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
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
            @tap="help"
          >
            <Label text.decode="&#xf059;" class="far icon" />
            <Label class="label" text="Help Center" />
          </StackLayout>

          <!-- About -->
          <Label text="ABOUT" class="section" />
          <!-- Refer a Friend -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
            @tap="share"
          >
            <Label text.decode="&#xf164;" class="far icon" />
            <Label class="label" text="Refer a Friend" />
          </StackLayout>
          <!-- Rate -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
            @tap="rate"
          >
            <Label text.decode="&#xf005;" class="far icon" />
            <Label class="label" text="Rate in the App Store" />
          </StackLayout>
          <!-- Follow -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
            @tap="follow"
          >
            <Label text.decode="&#xf099;" class="fab icon" />
            <Label class="label" text="Follow Envelope" />
          </StackLayout>

          <!-- APP -->
          <Label text="APP" class="section" />
          <!-- Acknowledgements -->
          <FlexboxLayout justifyContent="space-between" @tap="ack">
            <StackLayout
              orientation="horizontal"
              horizontalAlignment="stretch"
              class="input-wrapper"
            >
              <Label text.decode="&#xf14e;" class="far icon" />
              <Label class="label" text="Acknowledgements" />
            </StackLayout>

            <Label text.decode="&#xf105;" class="far m-r-15" fontSize="20" />
          </FlexboxLayout>
          <!-- Version -->
          <FlexboxLayout
            justifyContent="space-between"
            class="input-wrapper"
            width="100%"
          >
            <StackLayout orientation="horizontal" horizontalAlignment="stretch">
              <Label text.decode="&#xf126;" class="far icon" />
              <Label class="label" text="Version" width="75%" />
            </StackLayout>

            <Label :text="version" class="m-r-5" />
          </FlexboxLayout>
        </StackLayout>

        <Button
          color="white"
          backgroundColor="#2f7cf6"
          text="Sign Out"
          horizontalAlignment="stretch"
          margin="0"
          @tap="logout"
        />
        <FlexboxLayout justifyContent="center" class="m-t-25">
          <Label text.decode="&#xf1f9;" class="far" />
          <Label :text="copyright" />
        </FlexboxLayout>
        <FlexboxLayout justifyContent="center">
          <Label text="Terms" color="blue" @tap="terms" />
          <Label text=" & " />
          <Label text="Privacy Policy" color="blue" @tap="privacy" />
        </FlexboxLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
const SocialShare = require('nativescript-social-share');
const platform = require('tns-core-modules/platform');
const email = require('nativescript-email');
const appversion = require('nativescript-appversion');
import { appRater } from 'nativescript-rater';
import { openApp } from 'nativescript-open-app';
import InAppBrowser from 'nativescript-inappbrowser';
import routes from '~/router';
import { mapActions } from 'vuex';

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

    // Log user out and clear cards
    logout() {
      this.clearCards();
      this.$authService.logout();
    },

    // Update the user
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

    // Rate the application
    rate() {
      appRater.showRateDialog();
    },

    // Share the application
    share() {
      // Third param is Android only
      SocialShare.shareUrl(
        'https:envelope.app/',
        'Envelope',
        'How would you like to share Envelope?',
      );
    },

    // Follow on Twitter
    follow() {
      platform.isIOS
        ? openApp('twitter://user?screen_name=envelope_app', true, '333903271')
        : openApp('com.twitter.android://user?screen_name=envelope_app');
    },

    // Email Support
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

    // Navigatio to the Subscriptions page
    subscription() {
      this.$navigateTo(routes.subscription);
    },

    // Navigate to the acknowledgements page
    ack() {
      this.$navigateTo(routes.acknowledgements);
    },

    // Open the help page in InAppBrowser
    help() {
      this.openInAppBrowser('https://envelope.app/help?m=true');
    },

    // Open the terms page in InAppBrowser
    terms() {
      this.openInAppBrowser('https://envelope.app/terms?m=true');
    },

    // Open the privacy page in InAppBrowser
    privacy() {
      this.openInAppBrowser('https://envelope.app/privacy?m=true');
    },

    // Open url in InAppBrowser
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
.input {
  border-bottom-width: 0;
}

.section {
  background-color: #f0eff4;
  border-bottom-color: #dfdfdf;
  border-bottom-width: 2px;
  padding: 30px;
  font-size: 10;
}

.section-text {
  padding: 10px;
}

.icon {
  text-align: center;
  height: 90px;
  width: 90px;
  border-radius: 15px;
  color: #fff;
  background-color: #2f7cf6;
}

.label {
  margin-left: 40px;
  width: 100%;
}

.input-wrapper {
  padding: 30px 30px;
}
</style>
