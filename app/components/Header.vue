<template>
  <ActionBar title="">
    <!-- Left Layout Grid -->
    <ActionItem
      id="filter"
      @tap="$emit('filter')"
      ios.systemIcon="9"
      ios.position="left"
      android.position="actionBar"
      android.systemIcon="ic_menu_share"
    >
      <Label
        class="far header-icon"
        text.decode="&#xf0b0;"
        horizontalAlignment="left"
      />
    </ActionItem>

    <!-- Right Settings -->
    <ActionItem
      ios.position="right"
      android.position="actionBar"
      @tap="$navigateTo(routes.settings, { frame: 'main' })"
    >
      <Label
        class="far header-icon m-l-15"
        text.decode="&#xf013;"
        horizontalAlignment="right"
      />
    </ActionItem>

    <!-- Logo -->
    <Image width="20" height="20" src="~/assets/envelope.png"></Image>
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
