<template>
  <Page @navigatedTo="loaded" actionBarHidden="true">
    <FlexboxLayout
      class="page"
      flexDirection="column"
      justifyContent="space-between"
    >
      <StackLayout class="logo-container">
        <!-- <Image class="logo" v-shadow="12" src="~/assets/envelope.png"></Image> -->
        <Image class="logo" src="~/assets/envelope.png"></Image>
      </StackLayout>
      <Label class="header" text="Envelope"></Label>

      <TextField
        class="input"
        hint="Email"
        :isEnabled="!processing"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        v-model="user.email"
        returnKeyType="next"
        @returnPress="$refs.password.nativeView.focus()"
      ></TextField>

      <TextField
        class="input"
        ref="password"
        :isEnabled="!processing"
        hint="Password"
        secure="true"
        v-model="user.password"
        autocorrect="false"
        autocapitalizationType="none"
        :returnKeyType="isSigningIn ? 'done' : 'next'"
      ></TextField>

      <Loader v-show="processing" />

      <Button
        @tap="submit"
        :text="isSigningIn ? 'Sign in' : 'Sign up'"
        :isEnabled="!processing"
        class="button-action"
      ></Button>

      <Label
        @tap="forgotPassword()"
        text="Forgot your password?"
        class="forgot-password"
      ></Label>

      <Button
        text="Continue with Google"
        :isEnabled="!processing"
        @tap="loginWithGoogle()"
        class=""
      ></Button>

      <Button
        text="Continue with Apple"
        :isEnabled="!processing"
        @tap="loginWithApple()"
        class="btn btn-primary m-t-20"
      ></Button>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span
            :text="isSigningIn ? 'Don’t have an account? ' : 'Back to sign in '"
          ></Span>
          <Span :text="isSigningIn ? 'Sign up' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import routes from '~/router';
import Loader from '~/components/Loader';
import { Frame } from 'tns-core-modules/ui/frame';
import { isIOS } from 'tns-core-modules/platform';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      isSigningIn: true,
      processing: false,
      user: {
        // email: 'admin@envelope.app',
        // password: 'Envelope1989',
        email: null,
        password: null,
      },
    };
  },
  methods: {
    /**
     * Switch between Logging In & Signing UP
     */
    toggleForm() {
      this.isSigningIn = !this.isSigningIn;
    },

    /**
     * Sign in or Sign up
     */
    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert('Please provide both an email address and password.');
        return;
      }

      this.processing = true;

      // Send to sign in or sign up
      if (this.isSigningIn) {
        this.signInWithEmail();
      } else {
        this.register();
      }
    },

    /**
     * Sign in with Email
     */
    signInWithEmail() {
      this.$authService.login(this.user).catch(err => {
        this.processing = false;

        alert({
          title: 'Something went wrong',
          message: err,
          okButtonText: 'Try again',
        });
      });
    },

    /**
     * Sign in with Google
     */
    loginWithGoogle() {
      this.$authService.loginWithGoogle();
    },

    /**
     * Sign in with Apple
     */
    loginWithApple() {
      this.$authService.loginWithApple();
    },

    /**
     * Register a new User
     */
    register() {
      this.$authService
        .register(this.user)
        .then(user => this.goHome(user))
        .catch(err => {
          this.processing = false;

          alert({
            title: 'Something went wrong',
            message: err,
            okButtonText: 'Try again',
          });
        });
    },

    /**
     * Prompt the User with a forgot password dialog
     */
    forgotPassword() {
      prompt({
        title: 'Forgot Password?',
        message:
          'Enter the email address you used to register for Envelope to reset your password.',
        inputType: 'email',
        defaultText: '',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancel',
      }).then(data => {
        if (data.result) {
          this.$backendService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                'Your password was successfully reset. Please check your email for instructions on choosing a new password.',
              );
            })
            .catch(() => {
              this.alert(
                'Unfortunately, an error occurred resetting your password.',
              );
            });
        }
      });
    },

    /**
     * Show an alert dialog
     */
    alert(message) {
      return alert({
        title: 'Envelope',
        okButtonText: 'OK',
        message: message,
      });
    },

    /**
     * Proceed to the Home Screen after authentication
     * - Clear history so user cannot go back
     */
    goHome(user) {
      this.$navigateTo(routes.home, {
        animated: false,
        clearHistory: true,
        props: {
          user,
        },
      }).catch(err => console.log(err));
    },

    /**
     * Make sure the sign in screen has white header text
     */
    loaded(args) {
      if (isIOS) {
        Frame.topmost().ios.controller.navigationBar.barStyle = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 15px;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('~/assets/background.png');
}

.logo-container {
  flex: 2;
}

.logo {
  width: 40%;
}

.header {
  color: #fff;
  font-size: 45;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.button-action {
  width: 100%;
  color: #fff;
  border-radius: 15px;
  background-color: #590404;
}

.forgot-password {
  font-size: 16;
  color: #fff;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>
