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

      <!-- No cards view -->
      <StackLayout
        :visibility="cardList.length === 0 ? 'visible' : 'collapsed'"
        height="100%"
        width="100%"
        horizontalAlignment="center"
      >
        <Image
          src="~/assets/gray.png"
          height="50%"
          width="50%"
          stretch="aspectFit"
        />
        <Label
          class="no-cards"
          text="No cards to show"
          horizontalAlignment="center"
        />
      </StackLayout>

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
import { TapticEngine } from 'nativescript-taptic-engine';

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
      const tapticEngine = new TapticEngine();
      tapticEngine.selection();

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
          if (data === 'deleted') {
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

.no-cards {
  color: #cbd5e0;
  margin-top: 10;
  font-weight: 600;
  font-size: 18;
}
</style>
