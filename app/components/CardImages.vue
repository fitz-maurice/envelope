<template>
  <StackLayout>
    <!-- Header text -->
    <Label text="Select or take up 5 pictures" textWrap="true" class="header" />

    <!-- Buttons -->
    <FlexboxLayout justifyContent="space-around" class="p-x-25">
      <Label
        @tap="selectPicture"
        text="Select Picture"
        v-shadow="10"
        class="button"
      />

      <Label
        @tap="takePicture"
        text="Take Picture"
        v-shadow="10"
        class="button"
      />
    </FlexboxLayout>

    <GridLayout rows="*, *, *" columns="*, *">
      <StackLayout
        v-for="(img, index) in images"
        :key="index"
        class="m-t-25"
        :row="index / 2 < 1 ? 0 : index / 2 <= 2 ? 1 : 2"
        :column="(index + 1) % 2 == 0 ? 1 : 0"
      >
        <Label
          :text="`Picture ${index + 1}`"
          textWrap="true"
          class="label label-img"
        />
        <Image :src="img" v-shadow="15" stretch="aspectFit" class="img" />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
import * as camera from 'nativescript-camera';
import * as imagepicker from 'nativescript-imagepicker';
import { ImageSource } from 'tns-core-modules/image-source';
import { ImageCropper } from 'nativescript-imagecropper';

export default {
  name: 'CardImages',
  props: {
    card: Object,
    images: Array,
  },
  methods: {
    // Take picture and pass to cropper
    takePicture() {
      let source = new ImageSource();

      camera.requestPermissions().then(
        () => {
          camera
            .takePicture({
              width: 300,
              keepAspectRatio: true,
            })
            .then(imageAsset => {
              source.fromAsset(imageAsset).then(source => {
                this.editPicture(source);
              });
            })
            .catch(function(err) {
              console.log('Error -> ' + err.message);
            });
        },
        () => {
          console.log('No permissions for camera');
        },
      );
    },

    // Select picture from phone
    selectPicture() {
      let image;
      let source = new ImageSource();
      let context = imagepicker.create({
        mode: 'single',
        mediaType: 'image',
        minimumNumberOfSelection: '1',
      });

      context
        .authorize()
        .then(() => {
          return context.present();
        })
        .then(selection => {
          selection.forEach(selected => {
            source.fromAsset(selected).then(source => {
              setTimeout(async () => {
                this.editPicture(source);
              }, 250);
            });
          });
        })
        .catch(e => {
          console.log('error in selectPicture', e);
        });
    },

    // Edit and crop the picture
    async editPicture(source) {
      const imageCropper = new ImageCropper();

      setTimeout(async () => {
        await imageCropper
          .show(source, { width: 300, height: 300, keepAspectRatio: true })
          .then(({ response, image }) => {
            if (response === 'Success') {
              this.$emit('image', image);
            }
          })
          .catch(function(e) {
            console.log('ERROR', e);
          });
      }, 100);
    },

    async restrictedAccess() {
      confirm({
        title: 'Envelope',
        message: 'Your message',
        okButtonText: 'Go to settings',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result) {
          utils.openUrl('App-prefs:root=General');
        }
      });
    },
  },
};
</script>
