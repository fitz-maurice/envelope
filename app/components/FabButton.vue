<template>
  <Label
    text.decode="&#xf067;"
    @tap="$emit('onButtonTap')"
    class="far fab-button"
  />
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
