<template>
  <Page>
    <ActionBar title="Envelope" flat="true"> </ActionBar>
    <StackLayout>
      <Button
        text="Launch Camera"
        @tap="launch()"
        class="btn btn-primary m-t-20"
      ></Button>
      <Button
        @tap="$authService.logout"
        :text="`Log out ${$authService.user.displayName}`"
        class="btn btn-primary m-t-0"
      ></Button>
    </StackLayout>
  </Page>
</template>

<script>
import routes from '~/router';
const camera = require('nativescript-camera');
const { ImageCropper } = require('nativescript-imagecropper');
const { ImageSource } = require('tns-core-modules/image-source');

export default {
  data() {
    return {
      image: '',
    };
  },
  methods: {
    async launch() {
      const imageCropper = new ImageCropper();
      let source = new ImageSource();
      const _this = this;

      camera.requestPermissions().then(
        function success() {
          camera
            .takePicture()
            .then(function(imageAsset) {
              source.fromAsset(imageAsset).then(source => {
                setTimeout(async () => {
                  await imageCropper
                    .show(source, { width: 300, height: 300 })
                    .then(({ image }) => {
                      if (image !== '') {
                        console.log('IMAGE:', image.ios);
                        console.log(_this);
                        _this.image = image.ios;
                      }
                    })
                    .catch(function(e) {
                      console.log('ERROR', e);
                    });
                }, 1000);
              });
            })
            .catch(function(err) {
              console.log('Error -> ' + err.message);
            });
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
