<template>
  <Page @navigatingFrom="$adService.hideBanner()">
    <!-- Envelope Header -->
    <Header @filter="filter()" />

    <!-- Card View -->
    <AbsoluteLayout>
      <RadListView
        ref="list"
        for="card in cards"
        pullToRefresh="true"
        loadOnDemandMode="Auto"
        layout="staggered"
        :itemTemplateSelector="templateSelector"
        @itemTap="cardTapped"
        @pullToRefreshInitiated="onPullToRefresh"
        @loadMoreDataRequested="loadMoreCards"
      >
        <v-template name="card">
          <CardPreview :card="card" />
        </v-template>

        <v-template name="skeleton">
          <StackLayout>
            <Label class="skeleton m-y-2" text=" " height="175" width="98%" />
          </StackLayout>
        </v-template>
      </RadListView>

      <!-- No cards view -->
      <StackLayout
        :visibility="noCards ? 'visible' : 'collapsed'"
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
        @onButtonTap="cardGaurd"
      />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import moment from 'moment';
import routes from '@/router';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import Header from '@/components/Header';
import FabButton from '@/components/FabButton';
import CardPreview from '@/components/CardPreview';
import { TapticEngine } from 'nativescript-taptic-engine';
import { getBoolean, getString } from 'tns-core-modules/application-settings';

export default {
  components: {
    Header,
    FabButton,
    CardPreview,
  },
  data() {
    return {
      routes,
      noCards: false,
      loadingComplete: false,
    };
  },
  watch: {
    loading(value) {
      if (!value) {
        this.loadingComplete = true;
      }
    },
    cards(value) {
      setTimeout(() => {
        this.noCards = value.length === 0 ? true : false;
      }, 250);
    },
  },
  computed: {
    ...mapState(['cards', 'loading', 'personFilter', 'tagFilter']),
    // Detect first application load
    firstLoad() {
      return (
        this.loadingComplete && this.cards.length === 0 && this.hasUploadedCards
      );
    },
    // Check if a user had uploaded cards
    hasUploadedCards() {
      return getBoolean('uploadedCards');
    },
    // No cards have been uploaded yet
    noCardText() {
      return this.firstLoad
        ? "You haven't uploaded any cards yet"
        : 'Filters have no results';
    },
  },
  methods: {
    ...mapActions(['loadCards', 'fetchMoreCards']),

    templateSelector(item) {
      return item.from ? 'card' : 'skeleton';
    },

    /**
     * Filter the cards
     */
    filter() {
      this.$showBottomSheet(routes.filters, {
        transparent: true,
      });
    },

    /**
     * Check if they can upload a card
     */
    cardGaurd() {
      let product = '';

      if (this.$userService.user.iap && this.$userService.user.iap.product) {
        product = this.$userService.user.iap.product;
      }

      if (this.$store.state.cards.length <= 49) {
        this.createCard();
      } else if (
        (this.$store.state.cards.length >= 50 &&
          this.$store.state.cards.length <= 99 &&
          product.includes('premium')) ||
        product.includes('unlimited')
      ) {
        this.createCard();
      } else if (
        this.$store.state.cards.length > 100 &&
        product.includes('unlimited')
      ) {
        this.createCard();
      } else {
        alert({
          title: 'Limit exceeded!',
          message:
            'You have exceeded your limit on cards. Please purchase a subscription in the settings panel.',
          okButtonText: 'Dismiss',
        });
      }
    },

    /**
     * Show the Create Card Modal
     */
    createCard() {
      this.$showModal(routes.cardImages, { fullscreen: true }).then(data => {
        if (data) {
          this.loadCards();
          if (moment().isAfter(this.$userService.user.iap.endDate)) {
            this.$adService.showInterstitial();
          }
        }
      });
    },

    /**
     * Refresh the cards
     */
    onPullToRefresh() {
      const tapticEngine = new TapticEngine();
      tapticEngine.selection();

      this.$nextTick(() => {
        this.loadCards().then(() =>
          this.$refs.list.nativeView.notifyPullToRefreshFinished(),
        );
      });
    },

    /**
     * Load more cards
     */
    loadMoreCards() {
      if (this.cards.length < 20) {
        this.$refs.list.nativeView.notifyLoadOnDemandFinished(true);
        return;
      }

      this.fetchMoreCards().then(() => {
        this.$refs.list.nativeView.notifyLoadOnDemandFinished();
      });
    },

    /**
     * Tap a card to go into detail view
     */
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

.skeleton {
  animation-name: skeletonShimmer;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes skeletonShimmer {
  0% {
    background-color: #eeeeee;
  }
  50% {
    background-color: #d1d1d1;
  }
  100% {
    background-color: #eeeeee;
  }
}
</style>
