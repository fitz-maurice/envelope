<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal" horizonalAlignment="stretch">
        <Label
          text.decode="&#xf019;"
          class="far"
          textWrap="true"
          paddingLeft="30px"
          fontSize="10"
        />
        <StackLayout orientation="horizontal">
          <Image
            src="~/assets/envelope.png"
            width="20"
            height="20"
            verticalAlignment="center"
          />
          <Label
            text="Envelope"
            fontSize="24"
            verticalAlignment="center"
            class="ml-2"
          />
        </StackLayout>
        <Label
          class="fas"
          text.decode="&#xf0ca;"
          color="white"
          horizonatalAlignment="right"
          width="10"
          @tap="goToSettings"
        />
      </StackLayout>
    </ActionBar>

    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
      <Image :src="image" />
      <Button
        text="Launch Camera"
        @tap="launch()"
        class="btn btn-primary m-t-20"
      ></Button>
    </GridLayout>
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
    goToSettings() {
      this.$navigateTo(routes.settings).catch(e => console.log(e));
    },
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
