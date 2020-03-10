<template>
  <Page @navigatingTo="loaded" :class="{ bg: !$root.darkMode }">
    <!-- Action Bar -->
    <ActionBar title="Envelope Premium">
      <!-- Restore -->
      <ActionItem
        text="Restore"
        ios.position="right"
        android.position="actionBar"
        @tap="restore()"
      />
    </ActionBar>

    <FlexboxLayout flexDirection="column" justifyContent="space-between">
      <StackLayout v-if="products.length > 0">
        <Label
          :text="header"
          textWrap="true"
          class="section-header"
          :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
        />

        <Label
          :text="premium"
          textWrap="true"
          class="section-header m-t-30"
          :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
        />

        <FlexboxLayout
          v-tapped
          v-feedback
          class="input-wrapper"
          justifyContent="space-between"
          :backgroundColor="$root.darkMode ? 'black' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
          @tap="purchase(products[0])"
        >
          <Label class="label" :text="products[0].localizedTitle" />
          <Label class="label" :text="products[0].priceFormatted" />
        </FlexboxLayout>
        <FlexboxLayout
          v-tapped
          v-feedback
          class="input-wrapper"
          justifyContent="space-between"
          :backgroundColor="$root.darkMode ? 'black' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
          @tap="purchase(products[1])"
        >
          <Label class="label" :text="products[1].localizedTitle" />
          <Label class="label" :text="products[1].priceFormatted" />
        </FlexboxLayout>

        <Label
          :text="unlimited"
          textWrap="true"
          class="section-header m-t-30"
          :backgroundColor="$root.darkMode ? '#212121' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
        />

        <FlexboxLayout
          v-tapped
          v-feedback
          class="input-wrapper"
          justifyContent="space-between"
          :backgroundColor="$root.darkMode ? 'black' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
          @tap="purchase(products[2])"
        >
          <Label class="label" :text="products[2].localizedTitle" />
          <Label class="label" :text="products[2].priceFormatted" />
        </FlexboxLayout>
        <FlexboxLayout
          v-tapped
          v-feedback
          class="input-wrapper"
          justifyContent="space-between"
          :backgroundColor="$root.darkMode ? 'black' : 'white'"
          :color="$root.darkMode ? 'white' : '#718096'"
          @tap="purchase(products[3])"
        >
          <Label class="label" :text="products[3].localizedTitle" />
          <Label class="label" :text="products[3].priceFormatted" />
        </FlexboxLayout>
      </StackLayout>
      <!-- Custom loading icon -->
      <LoaderCustom :loading="products.length === 0" />

      <StackLayout
        class="footer"
        :backgroundColor="$root.darkMode ? '#212121' : 'white'"
        :color="$root.darkMode ? 'white' : '#718096'"
      >
        <Label
          textWrap="true"
          text="• Payment will be charged to your iTunes Account at confirmation of purchase."
        />
        <Label
          textWrap="true"
          text="• Subscription automatically renews unless auto-renewal is turned off at least 24-hours before the end of the the current period."
        />
        <Label
          textWrap="true"
          text="• You can manage your subscription at any time through your iTunes account."
        />
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import LoaderCustom from '@/components/LoaderCustom';
import * as purchase from '@proplugins/nativescript-purchase';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export default {
  components: {
    LoaderCustom,
  },
  data() {
    return {
      products: [],
      header: `Envelope Premium is a subscription to control banner ads on the homepage, more card uploads and support future development.\n\nYou can easily cancel at any time, from here or the App Store, without talking to anyone.`,
      unlimited: `UNLIMITED\n\nRemove ads, gain access to upload unlimited cards.`,
      premium: `PREMIUM\n\nRemove ads, gain access to upload up from 50 to 100 cards.`,
    };
  },
  methods: {
    /**
     * Initialize IAP Purchases
     */
    async loaded() {
      this.$iapService.initPurchases();
      this.$iapService.getProducts().then(prods => (this.products = prods));
    },

    /**
     * Restore IAP Purchases
     */
    restore() {
      this.$iapService.restore();
    },

    /**
     * Purchase a Subscription
     */
    purchase(product) {
      this.$iapService.buyProduct(product);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #f0eff4;
}

.section-header {
  font-size: 12;
  padding: 55px 30px 20px 40px;
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
}

.input-wrapper {
  padding: 23px 20px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #c6c6c8;
}

.label {
  font-size: 14px;
  margin-left: 20px;
}

.footer {
  background-color: #ffffff;
  padding: 30px;
  border-top-width: 1px;
  border-top-color: #c6c6c8;
}
</style>
