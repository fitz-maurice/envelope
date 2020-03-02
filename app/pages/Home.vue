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
          <CardPreview :card="card" />
        </v-template>
      </RadListView>

      <!-- FAButton -->
      <FabButton @onButtonTap="createCard" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import routes from '@/router';
import { mapActions } from 'vuex';
import Header from '@/components/Header';
import FabButton from '@/components/FabButton';
import CardPreview from '@/components/CardPreview';

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
      return this.$store.state.cards;
    },
  },
  methods: {
    ...mapActions(['loadCards', 'fetchMoreCards']),
    filter() {
      this.$showBottomSheet(routes.filters, {});
    },
    createCard() {
      this.$showModal(routes.cardCreation, { fullscreen: true }).then(data => {
        if (data) {
          this.loadCards();
        }
      });
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
          editCard: JSON.parse(JSON.stringify(item)),
        },
      })
        .then(data => {
          if (data) {
            this.loadCards();
          }
        })
        .catch(e => console.log(e));
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
