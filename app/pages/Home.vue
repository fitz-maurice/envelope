<template>
  <Page
    @loaded="$adService.showBanner()"
    @navigatingFrom="$adService.hideBanner()"
  >
    <!-- Envelope Header -->
    <Header @changeLayout="changeLayout" />
    <!-- Main view -->
    <AbsoluteLayout>
      <ScrollView
        orientation="vertical"
        scrollBarIndicatorVisible="false"
        height="100%"
        width="100%"
      >
        <WrapLayout :orientation="layout.orientation">
          <CardPreview
            v-for="card in cardList"
            :key="card.id"
            :card="card"
            :width="layout.width"
          />
        </WrapLayout>
      </ScrollView>
      <AbsoluteLayout width="100%" marginTop="94%">
        <FlexboxLayout justifyContent="flex-end" width="94%">
          <FabButton
            @onButtonTap="$showModal(routes.cardCreation, { fullscreen: true })"
          />
        </FlexboxLayout>
      </AbsoluteLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script>
import routes from '@/router';
import Header from '@/components/Header';
import CardPreview from '@/components/CardPreview';
import FabButton from '@/components/FabButton';

export default {
  components: {
    Header,
    FabButton,
    CardPreview,
  },
  data() {
    return {
      routes,
      layout: {
        width: '49.9%',
        orientation: 'horizontal',
      },
    };
  },
  mounted() {
    this.$cache.enableDownload();
  },
  computed: {
    cardList() {
      return this.$store.getters.cardList;
    },
  },
  methods: {
    changeLayout(payload) {
      this.layout = {
        width: payload ? '100%' : '49.9%',
        orientation: payload ? 'vertical' : 'horizontal',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  margin: 0;
  padding: 0;
}
.center {
  margin: 0 auto;
}
</style>
