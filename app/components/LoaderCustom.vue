<template>
  <AbsoluteLayout v-if="loading">
    <Image
      :left="width"
      :top="height"
      width="90"
      height="90"
      src="~/assets/seal.png"
      class="image seal"
    />
    <Image
      :left="width"
      :top="height"
      width="90"
      height="90"
      src="~/assets/e.png"
      class="image"
    />
  </AbsoluteLayout>
</template>

<script>
import routes from '~/router';
import { screen } from 'tns-core-modules/platform';

export default {
  props: {
    loading: Boolean,
  },
  data() {
    return {
      width: screen.mainScreen.widthDIPs / 2 - 45,
      height: screen.mainScreen.heightDIPs / 2 - 135,
    };
  },
};
</script>

<style scoped>
AbsoluteLayout {
  background-color: rgba(0, 0, 0, 0.3);
}

.seal {
  animation-name: spin;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.55, 0.01, 0.24, 1.02);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
