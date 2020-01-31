<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/envelope.png"></Image>
        <Label class="header" text="Envelope"></Label>

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
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
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Password"
              secure="true"
              v-model="user.password"
              :returnKeyType="isLoggingIn ? 'done' : 'next'"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <Loader v-show="processing" />
        </GridLayout>

        <Button
          @tap="submit"
          :text="isLoggingIn ? 'Sign In' : 'Sign Up'"
          :isEnabled="!processing"
          class="btn btn-primary m-t-20"
        ></Button>
        <Label
          @tap="forgotPassword()"
          text="Forgot your password?"
          class="login-label"
        ></Label>
      </StackLayout>

      <Button
        text="Continue with Google"
        :isEnabled="!processing"
        @tap="loginWithGoogle()"
        class="btn btn-primary m-t-20"
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
            :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"
          ></Span>
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import routes from '~/router';
import Loader from '~/components/Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        email: 'admin@envelope.app',
        password: 'Envelope1989',
      },
    };
  },
  methods: {
    // Switch between Logging In & Signing UP
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    // Login in or Sign Up
    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert('Please provide both an email address and password.');
        return;
      }

      this.processing = true;
      if (this.isLoggingIn) {
        this.loginWithEmail();
      } else {
        this.register();
      }
    },

    // Log in with Email
    loginWithEmail() {
      this.$authService.login(this.user).catch(err => {
        this.processing = false;

        alert({
          title: 'Something went wrong',
          message: err,
          okButtonText: 'Try again',
        });
      });
    },

    // Log in with Google
    loginWithGoogle() {
      this.$authService.loginWithGoogle();
    },

    // Log in with Apple
    loginWithApple() {
      this.$authService.loginWithApple();
    },

    // Register a new User
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

    // Prompt the User with a Forgot Password dialog
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

    // Show an Alert dialog
    alert(message) {
      return alert({
        title: 'Envelope',
        okButtonText: 'OK',
        message: message,
      });
    },

    // Proceed to the Home Screen after authentication
    goHome(user) {
      this.$navigateTo(routes.home, {
        animated: false,
        clearHistory: true,
        props: {
          user,
        },
      }).catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #fff;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.btn-primary {
  margin: 30 5 15 5;
}

.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>
