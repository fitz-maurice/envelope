<template>
  <AbsoluteLayout :marginTop="isPaying" marginLeft="79%">
    <Button
      v-feedback
      v-shadow="shadow"
      text.decode="&#xf067;"
      class="far fab-button"
      :class="darkMode ? 'dark' : 'light'"
      @tap="$emit('onButtonTap')"
    />
  </AbsoluteLayout>
</template>

<script>
import { isIOS } from 'tns-core-modules/platform';
import { Frame } from 'tns-core-modules/ui/frame';
import { getBoolean } from 'tns-core-modules/application-settings';

export default {
  computed: {
    isPaying() {
      return getBoolean('isPaying') ? '92%' : '86%';
    },
    darkMode() {
      return (
        Frame.topmost().viewController.traitCollection.userInterfaceStyle === 2
      );
    },
    shadow() {
      return isIOS
        ? {
            elevation: 20,
            shadowColor: '#000000',
            shadowOpacity: '0.5',
            shadowRadius: '10',
            shadowOffset: 15,
            useShadowPath: true,
            rasterize: true,
          }
        : {
            elevation: 50,
            shape: shape.OVAL,
            bgcolor: '#000000',
            cornerRadius: 15,
          };
    },
  },
  methods: {
    onButtonTouch(args) {
      this.$emit('onButtonTouch', args);
    },
  },
};
</script>

<style scoped>
.fab-button {
  width: 56;
  height: 56;
  border-radius: 9999px;
  vertical-align: center;
  text-align: center;
  font-size: 18;
}

.light {
  background-color: #590404;
  color: white;
}

.dark {
  color: #590404;
  background-color: white;
}
</style>
