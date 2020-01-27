<template>
  <GridLayout rows="*" columns="*">
    <ActivityIndicator :busy="true" class="loader" />
  </GridLayout>
</template>

<style scoped>
.loader {
  color: black;
  background-color: white;
  border-radius: 30px;
  height: 250px;
  width: 250px;
}
</style>
