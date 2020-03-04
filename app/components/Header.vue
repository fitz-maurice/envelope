<template>
  <ActionBar>
    <!-- Left Layout Grid -->
    <ActionItem @tap="$emit('filter')">
      <Label
        class="far header-icon"
        :color="color"
        text.decode="&#xf0b0;"
        horizontalAlignment="left"
      />
    </ActionItem>

    <!-- Logo -->
    <Image
      :src="`~/assets/envelope_${darkMode ? 'white' : 'black'}.png`"
    ></Image>

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
import { Frame } from 'tns-core-modules/ui/frame';

export default {
  data() {
    return {
      routes,
    };
  },
  computed: {
    isFiltered() {
      return (
        this.$store.state.tagFilter !== 'All' ||
        this.$store.state.personFilter !== 'All'
      );
    },
    color() {
      return this.isFiltered ? '#590404' : this.darkMode ? 'white' : 'black';
    },
    darkMode() {
      return (
        Frame.topmost().viewController.traitCollection.userInterfaceStyle === 2
      );
    },
  },
};
</script>

<style scoped>
.right {
  margin-right: 115px;
}
</style>
