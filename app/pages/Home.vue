<template>
  <Page
    @loaded="$adService.showBanner()"
    @navigatingFrom="$adService.hideBanner()"
  >
    <!-- Envelope Header -->
    <Header @changeLayout="changeLayout" />
    <!-- Main view -->
    <AbsoluteLayout>
      <RadListView
        ref="list"
        for="card in cardList"
        pullToRefresh="true"
        loadOnDemandMode="Manual"
        layout="grid"
        item-height="250"
        @itemTap="cardTapped"
        @pullToRefreshInitiated="onPullToRefresh"
        @loadMoreDataRequested="loadMoreCards"
      >
        <v-template>
          <CardPreview :card="card" :width="layout.width" />
        </v-template>
      </RadListView>
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
import { mapActions } from 'vuex';

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
  computed: {
    cardList() {
      return this.$store.getters.cardList;
    },
  },
  methods: {
    ...mapActions(['loadCards', 'fetchMoreCards']),
    onPullToRefresh() {
      this.$nextTick(() => {
        this.loadCards().then(() =>
          this.$refs.list.nativeView.notifyPullToRefreshFinished(),
        );
      });
    },
    loadMoreCards() {
      this.fetchMoreCards().then(() => {
        this.$refs.list.nativeView.notifyLoadOnDemandFinished();
      });
    },
    cardTapped({ item }) {
      this.$navigateTo(routes.detail, {
        frame: 'main',
        props: {
          card: item,
        },
      });
    },
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
