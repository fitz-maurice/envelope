<template>
  <Page>
    <!-- Action Bar -->
    <ActionBar title="Card Images" backgroundColor="#590404" color="white">
      <NavigationButton
        text=""
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
      <ActionItem text="Save" ios.position="right" @tap="save" />
    </ActionBar>

    <!-- Main View -->
    <GridLayout>
      <ScrollView>
        <StackLayout>
          <!-- Header text -->
          <Label
            text="Select or take up 5 pictures"
            textWrap="true"
            class="header"
          />

          <!-- Images -->
          <GridLayout rows="auto, auto, auto" columns="*, *">
            <StackLayout
              v-for="(img, index) in images"
              :key="index"
              class="m-t-15"
              :row="index / 2 < 1 ? 0 : index / 2 <= 1.5 ? 1 : 2"
              :column="(index + 1) % 2 == 0 ? 1 : 0"
            >
              <Label
                :text="`Picture ${index + 1}`"
                textWrap="true"
                class="label label-img"
              />
              <Image
                v-if="img !== ''"
                :src="img"
                v-shadow="15"
                @tap="imagePrompt(index)"
                stretch="aspectFill"
                class="img p-x-5"
              />
              <Label
                v-else
                class="placeholder fas"
                text.decode="&#xf03e;"
                @tap="imagePrompt"
              />
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </ScrollView>

      <!-- Loading icon -->
      <LoaderCustom v-show="creating" />
    </GridLayout>
  </Page>
</template>

<script>
import CardService from '@/services/card';
import * as camera from 'nativescript-camera';
import LoaderCustom from '@/components/LoaderCustom';
import * as imagepicker from 'nativescript-imagepicker';
import { ImageCropper } from 'nativescript-imagecropper';
import { ImageSource } from 'tns-core-modules/image-source';
import { toBase64String } from 'tns-core-modules/image-source';

const cardService = new CardService();

export default {
  components: {
    LoaderCustom,
  },
  props: {
    card: Object,
  },
  data() {
    return {
      creating: false,
      images: ['', '', '', '', ''],
    };
  },
  computed: {
    imagesValid() {
      return this.images.length > 0;
    },
  },
  methods: {
    imagePrompt(index = null) {
      action('Select image source', 'Cancel', [
        'Camera',
        'Photo Library',
      ]).then(result =>
        result === 'Camera'
          ? this.takePicture(index)
          : this.selectPicture(index),
      );
    },
    // Take picture and pass to cropper
    takePicture(index = null) {
      let source = new ImageSource();

      camera.requestPermissions().then(
        () => {
          camera
            .takePicture({
              width: 500,
              height: 700,
              keepAspectRatio: true,
            })
            .then(imageAsset => {
              source.fromAsset(imageAsset).then(source => {
                this.editPicture(source, index);
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
    selectPicture(index = null) {
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
                this.editPicture(source, index);
              }, 250);
            });
          });
        })
        .catch(e => {
          console.log('error in selectPicture', e);
        });
    },

    // Edit and crop the picture
    async editPicture(source, index = null) {
      const imageCropper = new ImageCropper();

      setTimeout(async () => {
        await imageCropper
          .show(source, { width: 500, height: 700, keepAspectRatio: true })
          .then(({ response, image }) => {
            if (response === 'Success') {
              const i =
                typeof index === 'number' ? index : this.images.indexOf('');
              this.images.splice(i, 1, image);
            }
          })
          .catch(function(e) {
            console.log('ERROR', e);
          });
      }, 100);
    },

    // Create the new card
    save() {
      if (this.creating === true) return;

      this.creating = true;

      if (!this.imagesValid) {
        this.creating = false;

        alert({
          title: 'Missing images!',
          message: 'At least 1 image is required.',
          okButtonText: 'Ok',
        });

        return;
      }

      this.card.images = this.images
        .filter(image => image !== '')
        .map(image => image.toBase64String('jpeg', 85));

      cardService
        .createCard(this.card)
        .then(() => {
          this.creating = false;
          // Refetch user document to refresh people list
          this.$userService.getUserDocument();

          alert({
            title: 'Your card was created!',
            okButtonText: 'Ok',
          }).then(() => {
            this.$modal.close('created');
          });
        })
        .catch(err => console.log(err));
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

<style lang="scss" scoped>
.placeholder {
  background-color: #a7b3c4;
  border-radius: 5;
  width: 90%;
  height: 175;
  font-size: 50;
  text-align: center;
  color: white;
}

.header {
  font-size: 20px;
  font-weight: 700;
  width: 85%;
  margin-top: 50px;
  text-align: center;
}

.label {
  width: 85%;
  font-size: 12px;

  &-img {
    text-align: center;
    font-weight: 700;
    margin-bottom: 15px;
  }
}

.img {
  width: 90%;
  height: 175;
}
</style>
