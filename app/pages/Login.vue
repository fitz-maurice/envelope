<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <!-- <Image class="logo" src="~/assets/images/NativeScript-Vue.png"></Image> -->
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
              @returnPress="focusPassword"
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
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Confirm password"
              secure="true"
              v-model="user.confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          :text="isLoggingIn ? 'Log In' : 'Sign Up'"
          :isEnabled="!processing"
          @tap="submit"
          class="btn btn-primary m-t-20"
        ></Button>
        <Label
          v-show="isLoggingIn"
          text="Forgot your password?"
          class="login-label"
          @tap="forgotPassword()"
        ></Label>
      </StackLayout>

      <Button
        text="Login With Google"
        :isEnabled="!processing"
        @tap="loginWithGoogle()"
        class="btn btn-primary m-t-20"
      ></Button>

      <Button
        text="Login With Apple"
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

export default {
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        email: 'dpfitzmaurice@gmail.com',
        password: 'baseball',
        confirmPassword: 'vue',
      },
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
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
    loginWithEmail() {
      this.$authService.login(this.user).then(user => this.goHome(user));
    },
    loginWithGoogle() {
      this.$authService.loginWithGoogle().then(user => this.goHome(user));
    },
    loginWithApple() {
      this.$authService.loginWithApple().then(user => this.goHome(user));
    },
    register() {},
    forgotPassword() {},
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },
    alert(message) {
      return alert({
        title: 'APP NAME',
        okButtonText: 'OK',
        message: message,
      });
    },
    goHome(user) {
      this.$navigateTo(routes.home, {
        animated: true,
        transition: {
          name: 'slide',
          curve: 'ease',
        },
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
