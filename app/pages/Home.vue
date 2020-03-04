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
        :visibility="
          cardList.length === 0 && !$store.state.loading
            ? 'visible'
            : 'collapsed'
        "
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
          :text="noCardText"
          horizontalAlignment="center"
        />
        <Button
          v-shadow="5"
          v-feedback
          @tap="createCard"
          class="m-t-30 upload-first"
          :visibility="firstLoad ? 'visible' : 'collapsed'"
          text="Upload your first card"
        />
      </StackLayout>

      <!-- FAButton -->
      <FabButton
        :visibility="firstLoad ? 'collapsed' : 'visible'"
        @onButtonTap="createCard"
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
    firstLoad() {
      return this.$store.state.firstLoad && this.cardList.length === 0;
    },
    noCardText() {
      return this.firstLoad
        ? "You haven't uploaded any cards yet"
        : 'Filters have no results';
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
          this.$adService.showInterstitial();
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

.upload-first {
  background-color: #cbd5e0;
  color: #4a5568;
  width: 65%;
  border-radius: 5;
}
</style>
