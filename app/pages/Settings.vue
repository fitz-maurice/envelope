<template>
  <Page>
    <!-- Action Bar -->
    <ActionBar title="Account" />

    <!-- Main Scroll View -->
    <ScrollView orientation="vertical">
      <FlexboxLayout flexDirection="column" justifyContent="space-between">
        <StackLayout>
          <!-- SETTING -->
          <Label
            text="SETTINGS"
            class="section-header"
            :backgroundColor="$root.darkMode ? 'black' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : '#718096'"
          />

          <!-- Full name -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper personal-info"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <Label text.decode="&#xf007;" class="far icon" />
            <TextField
              v-model="$userService.user.displayName"
              class="name-input"
              hint="Full name"
              autocorrect="false"
              returnKeyType="done"
              horizontalAlignment="stretch"
              :backgroundColor="$root.darkMode ? '#313131' : '#f0eff4'"
              :color="$root.darkMode ? 'white' : 'black'"
            >
            </TextField>
          </StackLayout>

          <!-- Birthday -->
          <StackLayout
            class="input-wrapper personal-info"
            orientation="horizontal"
            horizontalAlignment="stretch"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <Label text.decode="&#xf133;" class="far icon" />
            <Label
              ref="birthday"
              @tap="selectDate"
              :text="$userService.user.birthday"
              class="name-input m-l-15"
              :backgroundColor="$root.darkMode ? '#313131' : '#f0eff4'"
              :color="$root.darkMode ? 'white' : 'black'"
            />
          </StackLayout>

          <!-- Save -->
          <Button
            v-feedback
            @tap="updateUser"
            :isEnabled="!updating"
            text="Save"
            color="white"
            class="action"
            backgroundColor="#590404"
            horizontalAlignment="stretch"
          />

          <!-- Subscriptions -->
          <Label
            text="PREMIUM"
            class="section-header"
            :backgroundColor="$root.darkMode ? 'black' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : '#718096'"
          />
          <FlexboxLayout justifyContent="space-between" @tap="subscription">
            <StackLayout
              v-tapped
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
              :backgroundColor="$root.darkMode ? '#212121' : 'white'"
            >
              <Image
                width="30"
                height="30"
                class="m-l-2"
                src="~/assets/envelope.png"
              ></Image>
              <Label
                class="label"
                text="Envelope Premium"
                :backgroundColor="$root.darkMode ? '#212121' : 'white'"
              />
            </StackLayout>

            <Label
              text.decode="&#xf105;"
              class="far m-r-15 caret input-wrapper"
              :backgroundColor="$root.darkMode ? '#212121' : 'white'"
            />
          </FlexboxLayout>

          <!-- Support -->
          <Label
            text="SUPPORT"
            class="section-header"
            :backgroundColor="$root.darkMode ? 'black' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : '#718096'"
          />
          <!-- Email Support -->
          <StackLayout
            v-tapped
            @tap="emailSupport"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
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
          <FlexboxLayout justifyContent="space-between" @tap="advanced">
            <StackLayout
              v-tapped
              class="input-wrapper"
              orientation="horizontal"
              horizontalAlignment="stretch"
              :backgroundColor="$root.darkMode ? '#212121' : 'white'"
            >
              <Label text.decode="&#xf013;" class="far icon" />
              <Label
                class="label"
                text="Advanced"
                horizontalAlignment="stretch"
              />
            </StackLayout>

            <Label
              text.decode="&#xf105;"
              class="far m-r-15 input-wrapper caret"
              :backgroundColor="$root.darkMode ? '#212121' : 'white'"
            />
          </FlexboxLayout>
          <!-- Help Center -->
          <StackLayout
            v-tapped
            @tap="help"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <Label text.decode="&#xf059;" class="far icon" />
            <Label class="label" text="Help Center" />
          </StackLayout>

          <!-- About -->
          <Label
            text="ABOUT"
            class="section-header"
            :backgroundColor="$root.darkMode ? 'black' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : '#718096'"
          />
          <!-- Refer a Friend -->
          <StackLayout
            v-tapped
            @tap="share"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <Label text.decode="&#xf164;" class="far icon" />
            <Label class="label" text="Refer a Friend" />
          </StackLayout>

          <!-- Rate -->
          <StackLayout
            v-tapped
            @tap="rate"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <Label text.decode="&#xf005;" class="far icon" />
            <Label class="label" text="Rate in the App Store" />
          </StackLayout>

          <!-- Follow -->
          <StackLayout
            v-tapped
            @tap="follow"
            class="input-wrapper"
            orientation="horizontal"
            horizontalAlignment="stretch"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <Label text.decode="&#xf099;" class="fab icon" />
            <Label class="label" text="Follow Envelope" />
          </StackLayout>

          <!-- APP -->
          <Label
            text="APP"
            class="section-header"
            :backgroundColor="$root.darkMode ? 'black' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : '#718096'"
          />

          <!-- Version -->
          <FlexboxLayout
            width="100%"
            class="input-wrapper"
            justifyContent="space-between"
            :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          >
            <StackLayout orientation="horizontal" horizontalAlignment="stretch">
              <Label text.decode="&#xf126;" class="far icon" />
              <Label class="label" text="Version" width="70%" />
            </StackLayout>

            <Label :text="version" />
          </FlexboxLayout>
        </StackLayout>

        <Button
          v-feedback
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
          <Label
            text="Terms"
            :color="$root.darkMode ? 'white' : '#590404'"
            @tap="terms"
          />
          <Label text=" & " />
          <Label
            text="Privacy Policy"
            :color="$root.darkMode ? 'white' : '#590404'"
            @tap="privacy"
          />
        </FlexboxLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import moment from 'moment';
import routes from '~/router';
import { mapActions } from 'vuex';
import Picker from '@/native/picker';
import * as email from 'nativescript-email';
import { appRater } from 'nativescript-rater';
import { openApp } from 'nativescript-open-app';
import { isIOS } from 'tns-core-modules/platform';
import InAppBrowser from 'nativescript-inappbrowser';
import * as appversion from 'nativescript-appversion';
import * as SocialShare from 'nativescript-social-share';

export default {
  data() {
    return {
      updating: false,
      version: `${appversion.getVersionNameSync()} (${appversion.getVersionCodeSync()})`,
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

    selectDate() {
      const picker = new Picker('Select date', {
        type: 'date',
      });
      picker.pick().then(result => {
        const date = moment(result).format('MM/DD/YYYY');
        this.$userService.user.birthday = date;
        this.$refs.birthday.nativeView.text = date;
      });
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
      isIOS
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
     * Navigate to advanced page
     */
    advanced() {
      this.$navigateTo(routes.advanced, { frame: 'main' }).catch(e =>
        console.log(e),
      );
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
.name-input {
  width: 80%;
  padding: 5;
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
  padding: 15 10 10 10;
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
}

.input-wrapper {
  padding: 8 10;
  background-color: #ffffff;
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

.label {
  width: 100%;
  font-size: 14;
  margin-left: 15;
}

.action {
  margin: 0;
  padding: 10 0;
  font-weight: 700;
  border-bottom-color: #c6c6c8;
}

.caret {
  font-size: 14;
  color: #718096;
}

.footer {
  font-size: 12;
}
</style>
