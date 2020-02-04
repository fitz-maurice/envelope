<template>
  <Page @loaded="loaded">
    <!-- Action Bar -->
    <ActionBar title="Envelope Premium" />

    <StackLayout>
      <Label
        text="Envelope Premium is a subscription to control banner ads on the homepage, more card uploads and support future development."
      />
      <Label
        text="You can easily cancel at any time, from here of the App Store, without talking to anyone."
      />

      <Label text="Restore Purchases" @tap="restore()" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      hello: 'world',
    };
  },
  methods: {
    // Initialize IAP Purchases
    loaded() {
      this.$iapService.initPurchases();
    },

    // Restore IAP Purchases
    restore() {
      this.$iapService.restore();
    },
  },
};
</script>

<style lang="scss" scoped></style>
