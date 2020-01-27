<template>
  <Page @loaded="loaded">
    <ActionBar title="Account" backgroundColor="#2f7cf6" color="white" />
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
              v-model="user.name"
              class="input"
              hint="Full name"
              autocorrect="false"
              returnKeyType="next"
              horizontalAlignment="stretch"
              width="100%"
              @returnPress="focusBirthday"
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
            <TextField
              ref="birthday"
              class="input"
              autocorrect="false"
              v-model="user.birthday"
              returnKeyType="next"
              @returnPress="focusBirthday"
              horizontalAlignment="stretch"
              width="100%"
            >
            </TextField>
          </StackLayout>

          <!-- Save -->
          <Button
            text="Save"
            color="white"
            backgroundColor="#2f7cf6"
            horizontalAlignment="stretch"
            margin="0"
          />

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

            <Label text.decode="&#xf105;" class="far m-r-5" fontSize="20" />
          </FlexboxLayout>
          <!-- Version -->
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="stretch"
            class="input-wrapper"
          >
            <Label text.decode="&#xf126;" class="far icon" />
            <Label class="label" text="Version" />
            <Label text="version" />
          </StackLayout>
        </StackLayout>

        <Button
          color="white"
          backgroundColor="#2f7cf6"
          text="Sign Out"
          horizontalAlignment="stretch"
          margin="0"
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
const application = require('tns-core-modules/application');
const utils = require('tns-core-modules/utils/utils');
const email = require('nativescript-email');
import { firestore } from 'nativescript-plugin-firebase';
import * as firebase from 'nativescript-plugin-firebase';
import { appRater } from 'nativescript-rater';
import { openApp } from 'nativescript-open-app';
import routes from '~/router';

export default {
  data() {
    return {
      user: {
        name: '',
        birthday: '',
      },
    };
  },
  computed: {
    copyright() {
      return ` ${new Date().getFullYear()} Envelope`;
    },
    // version() {
    //   if (platform.isAndroid) {
    //     const PackageManager = android.content.pm.PackageManager;
    //     const pkg = application.android.context
    //       .getPackageManager()
    //       .getPackageInfo(
    //         application.android.context.getPackageName(),
    //         PackageManager.GET_META_DATA,
    //       );
    //     return pkg.versionCode;
    //   } else {
    //     return NSBundle.mainBundle().objectForInfoDictionaryKey(
    //       'CFBundleShortVersionString',
    //     );
    //   }
    // },
  },
  methods: {
    loaded() {
      firebase.getCurrentUser().then(user => {
        firestore
          .collection(`${user.uid}`)
          .doc('account')
          .get()
          .then(doc => {
            const data = doc.data();
            this.user.name = data.displayName;
            this.user.birthday = data.birthday;
          });
      });
    },
    focusBirthday() {
      this.$refs.birthday.nativeView.focus();
    },
    rate() {
      appRater.showRateDialog();
    },
    share() {
      // Third param is Android only
      SocialShare.shareUrl(
        'https:envelope.app/',
        'Envelope',
        'How would you like to share this url?',
      );
    },
    follow() {
      platform.isIOS
        ? openApp('twitter://user?screen_name=envelope_app')
        : openApp('com.twitter.android/envelope_app');
    },
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
    terms() {
      this.$showModal(routes.web, {
        props: {
          url: 'https://envelope.app/terms?m=true',
        },
      });
    },
    privacy() {
      this.$showModal(routes.web, {
        props: {
          url: 'https://envelope.app/privacy?m=true',
        },
      });
    },
    ack() {
      this.$navigateTo(routes.acknowledgements);
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
