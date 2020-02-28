<template>
  <ActionBar>
    <!-- Left Layout Grid -->
    <ActionItem @tap="$emit('filter')">
      <Label
        class="far header-icon"
        text.decode="&#xf0b0;"
        horizontalAlignment="left"
      />
    </ActionItem>

    <!-- Logo -->
    <Image width="20" height="20" src="~/assets/envelope.png"></Image>

    <!-- Right Settings -->
    <ActionItem
      ios.position="right"
      android.position="actionBar"
      @tap="$navigateTo(routes.settings, { frame: 'main' })"
    >
      <Label
        class="far header-icon right"
        text.decode="&#xf013;"
        horizontalAlignment="right"
      />
    </ActionItem>
  </ActionBar>
</template>

<script>
import routes from '~/router';

export default {
  data() {
    return {
      routes,
    };
  },
};
</script>

<style scoped>
.right {
  margin-right: 115px;
}
</style>
