<template>
  <AbsoluteLayout marginTop="86%" marginLeft="79%">
    <Button
      v-shadow="shadow"
      text.decode="&#xf067;"
      class="far fab-button"
      @tap="$emit('onButtonTap')"
    />
  </AbsoluteLayout>
</template>

<script>
import { isIOS } from 'tns-core-modules/platform';

export default {
  computed: {
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
  background-color: #590404;
  border-radius: 9999px;
  vertical-align: center;
  color: white;
  text-align: center;
  font-size: 18;
}
</style>
