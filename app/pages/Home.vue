<template>
  <Page
    @loaded="$adService.showBanner()"
    @navigatingFrom="$adService.hideBanner()"
  >
    <!-- Envelope Header -->
    <Header @filter="filter()" />

    <!-- Card View -->
    <AbsoluteLayout>
      <RadListView
        ref="list"
        for="card in cardList"
        pullToRefresh="true"
        loadOnDemandMode="Auto"
        layout="staggered"
        @itemTap="cardTapped"
        @pullToRefreshInitiated="onPullToRefresh"
        @loadMoreDataRequested="loadMoreCards"
      >
        <v-template>
          <CardPreview :card="card" width="50%" />
        </v-template>
      </RadListView>

      <!-- FAButton -->
      <FabButton
        @onButtonTap="$showModal(routes.cardCreation, { fullscreen: true })"
      />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import routes from '@/router';
import { mapActions } from 'vuex';
import Header from '@/components/Header';
import FabButton from '@/components/FabButton';
import CardPreview from '@/components/CardPreview';
import { platform } from 'tns-core-modules/platform';

export default {
  components: {
    Header,
    FabButton,
    CardPreview,
  },
  data() {
    return {
      routes,
    };
  },
  computed: {
    cardList() {
      return this.$store.getters.cardList(this);
    },
  },
  methods: {
    ...mapActions(['loadCards', 'fetchMoreCards']),
    filter() {
      this.$showBottomSheet(routes.filters, {});
    },
    onPullToRefresh() {
      this.$nextTick(() => {
        this.loadCards().then(() =>
          this.$refs.list.nativeView.notifyPullToRefreshFinished(),
        );
      });
    },
    loadMoreCards() {
      if (this.cardList.length < 20) {
        this.$refs.list.nativeView.notifyLoadOnDemandFinished(true);
        return;
      }

      this.fetchMoreCards().then(() => {
        this.$refs.list.nativeView.notifyLoadOnDemandFinished();
      });
    },
    cardTapped({ item }) {
      this.$showModal(routes.detail, {
        props: {
          card: item,
        },
      });
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
