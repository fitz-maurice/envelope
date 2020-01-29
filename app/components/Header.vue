<template>
  <ActionBar title="">
    <!-- Left Layout Grid -->
    <ActionItem
      @tap="changeLayout"
      v-show="isGridLayout"
      ios.systemIcon="9"
      ios.position="left"
      android.position="actionBar"
      android.systemIcon="ic_menu_share"
    >
      <Label
        class="far header-icon"
        text.decode="&#xf009;"
        horizontalAlignment="left"
      />
    </ActionItem>

    <!-- Left Layout Row -->
    <ActionItem
      @tap="changeLayout"
      v-show="!isGridLayout"
      ios.systemIcon="10"
      ios.position="left"
      android.position="actionBar"
      android.systemIcon="ic_menu_share"
    >
      <Label
        class="far header-icon"
        text.decode="&#xf0c9;"
        horizontalAlignment="left"
      />
    </ActionItem>

    <!-- Right Settings -->
    <ActionItem
      ios.position="right"
      android.position="actionBar"
      @tap="$navigateTo(routes.settings)"
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
      isGridLayout: false,
    };
  },
  methods: {
    changeLayout() {
      this.isGridLayout = !this.isGridLayout;
      this.$emit('changeLayout', this.isGridLayout);
    },
  },
};
</script>
