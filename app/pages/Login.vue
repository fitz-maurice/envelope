<template>
  <Page @navigatedTo="loaded" actionBarHidden="true">
    <GridLayout>
      <FlexboxLayout
        class="page"
        flexDirection="column"
        justifyContent="space-between"
      >
        <!-- LOGO -->
        <StackLayout v-shadow="150" class="logo-container">
          <Image class="logo" src="~/assets/envelope.png"></Image>
        </StackLayout>

        <!-- HEADER -->
        <Image class="header" src="~/assets/envelope_white.png" />

        <GridLayout rows="auto, auto, auto, auto">
          <!-- Email input -->
          <TextField
            row="0"
            class="input"
            hint="Email"
            :isEnabled="!processing"
            keyboardType="email"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.email"
            returnKeyType="next"
            :backgroundColor="$root.darkMode ? '#313131' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : 'black'"
            @returnPress="$refs.password.nativeView.focus()"
          ></TextField>

          <!-- Password Input -->
          <TextField
            row="1"
            class="input"
            ref="password"
            :isEnabled="!processing"
            hint="Password"
            secure="true"
            v-model="user.password"
            autocorrect="false"
            autocapitalizationType="none"
            :backgroundColor="$root.darkMode ? '#313131' : '#f0eff4'"
            :color="$root.darkMode ? 'white' : 'black'"
            :returnKeyType="isSigningIn ? 'done' : 'next'"
          ></TextField>

          <!-- Login Button -->
          <Button
            v-feedback
            row="2"
            @tap="submit"
            :text="isSigningIn ? 'Sign in' : 'Sign up'"
            :isEnabled="!processing"
            class="button-action p-y-10 m-y-8"
          ></Button>

          <!-- Forgot Password -->
          <Label
            row="3"
            v-show="isSigningIn"
            @tap="forgotPassword()"
            text="Forgot your password?"
            class="forgot-password"
            horizontalAlignment="center"
          ></Label>
        </GridLayout>

        <Label text="OR" class="or" />

        <StackLayout>
          <!-- Apple -->
          <Button
            v-feedback
            :isEnabled="!processing"
            @tap="loginWithApple()"
            class="social-login p-y-10"
            v-shadow="20"
          >
            <FormattedString>
              <Span text.decode="&#xf179;" class="fab" />
              <Span text="      " />
              <Span text="Continue with Apple" />
            </FormattedString>
          </Button>

          <!-- Google -->
          <Button
            v-feedback
            :isEnabled="!processing"
            @tap="loginWithGoogle()"
            class="social-login m-t-16 p-y-10"
            v-shadow="20"
          >
            <FormattedString>
              <Span text.decode="&#xf1a0;" class="fab" />
              <Span text="     " />
              <Span text="Continue with Google" />
            </FormattedString>
          </Button>
        </StackLayout>

        <Label class="login-label sign-up-label" @tap="toggleForm">
          <FormattedString>
            <Span
              :text="
                isSigningIn ? 'Don’t have an account? ' : 'Back to sign in '
              "
            ></Span>
            <Span :text="isSigningIn ? 'Sign up' : ''"></Span>
          </FormattedString>
        </Label>
      </FlexboxLayout>

      <!-- Custom loading icon -->
      <LoaderCustom :loading="processing" />
    </GridLayout>
  </Page>
</template>

<script>
import routes from '~/router';
import LoaderCustom from '@/components/LoaderCustom';
import { Frame } from 'tns-core-modules/ui/frame';
import { isIOS } from 'tns-core-modules/platform';

export default {
  components: {
    LoaderCustom,
  },
  data() {
    return {
      isSigningIn: true,
      processing: false,
      user: {
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
      this.$authService
        .login(this.user)
        .then(() => (this.processing = false))
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
        // Frame.topmost().ios.controller.navigationBar.barStyle = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 5;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('~/assets/background.png');
}

.logo {
  width: 35%;
}

.header {
  width: 75%;
}

.input {
  placeholder-color: #a0aec0;
  border-bottom-width: 0;
  background-color: #edf2f7;
  border-radius: 5;
  padding: 5;
  font-size: 15;
  width: 85%;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.button-action {
  width: 85%;
  font-weight: 700;
  color: #fff;
  border-radius: 10;
  background-color: #590404;
}

.or {
  color: white;
  font-weight: 700;
  font-size: 18;
}

.ns-dark .social-login {
  background-color: black;
  color: white;
}

.ns-light .social-login {
  background-color: white;
  color: black;
}

.social-login {
  padding-left: 20;
  text-align: left;
  border-radius: 9999;
  width: 75%;
  height: 44;
  font-size: 19;
}

.forgot-password {
  font-size: 16;
  color: #fff;
}

.sign-up-label {
  font-size: 16;
  font-weight: 600;
  color: white;
}
</style>
