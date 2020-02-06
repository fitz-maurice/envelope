<template>
  <AbsoluteLayout marginTop="86%">
    <Label
      left="300"
      v-shadow="15"
      text.decode="&#xf067;"
      class="far fab-button"
      @tap="$emit('onButtonTap')"
    />
  </AbsoluteLayout>
</template>

<script>
export default {
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
