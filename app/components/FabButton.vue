<template>
  <AbsoluteLayout :marginTop="marginTop" marginLeft="79%">
    <Button
      v-feedback
      v-shadow="shadow"
      text.decode="&#xf067;"
      class="far fab-button"
      :class="$root.darkMode ? 'dark' : 'light'"
      @tap="$emit('onButtonTap')"
    />
  </AbsoluteLayout>
</template>

<script>
import moment from 'moment';
import { isIOS } from 'tns-core-modules/platform';
import { getBoolean } from 'tns-core-modules/application-settings';
const platformModule = require('tns-core-modules/platform');

export default {
  data() {
    return {
      scale: platformModule.screen.mainScreen.scale,
    };
  },
  computed: {
    isPaying() {
      return this.$store.state.isPaying;
    },
    marginTop() {
      if (this.isPaying && this.scale === 3) {
        return '92%';
      } else if (this.isPaying && this.scale === 2) {
        return '88%';
      } else if (!this.isPaying && this.scale === 3) {
        return '86%';
      } else if (!this.isPaying && this.scale === 2) {
        return '80%';
      }
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
