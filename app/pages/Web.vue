<template>
  <WebView :src="url" />
</template>

<script>
export default {
  props: {
    url: String,
  },
};
</script>

<style lang="scss" scoped></style>
