<template>
  <Page>
    <ActionBar title="asf">
      <ActionItem
        @tap="onTapShare"
        ios.systemIcon="12"
        ios.position="right"
        android.systemIcon="ic_menu_share"
        android.position="actionBar"
      />
    </ActionBar>

    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
      <Button text="Launch Camera" @tap="launch()" class="btn btn-primary m-t-20"></Button>
    </GridLayout>
  </Page>
</template>

<script>
const camera = require('nativescript-camera');
const imageModule = require('tns-core-modules/ui/image');

export default {
  computed: {
    message() {
      return 'Blank {N}-Vue app';
    },
  },
  methods: {
    launch() {
      camera.requestPermissions().then(
        function success() {
          const image = new imageModule.Image();
          image.src = imageAsset;
        },
        function failure() {
          // permission request rejected
          // ... tell the user ...
        },
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@nativescript/theme/scss/variables/blue';

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
