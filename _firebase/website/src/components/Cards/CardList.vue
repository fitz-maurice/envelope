<template>
  <div class="">
    <div class="flex items-baseline">
      <h1 class="font-semibold text-3xl tracking-widest mx-5">
        Your Cards
      </h1>
      <div class="relative flex">
        <button
          ref="filter"
          @click="showFilters = !showFilters"
          :disabled="cards.length === 0 && !loading"
          class="outline-none mr-5"
          :class="{
            'opacity-50 cursor-default': cards.length === 0 && !loading,
          }"
        >
          <icon-filter
            class="hover:text-envelope-red focus:outline-none fill-current h-6 w-6"
          />
        </button>
        <div
          v-show="showFilters"
          v-closable="{
            exclude: ['filter'],
            handler: 'onClose',
          }"
          class="caret absolute rounded-lg border border-gray-700 shadow-lg bg-white p-3 mt-10 mr-2 right-0 w-64 z-10"
        >
          <filters @update="update" @clear="clear" :people="people" />
        </div>
      </div>
    </div>
    <loading v-if="loading" />
    <no-cards v-else-if="cards.length === 0 && !loading" />
    <div v-else class="flex flex-row flex-wrap">
      <card-preview
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        class="w-1/5"
      />
    </div>
  </div>
</template>

<script>
import fire from '@/firebase';
import cond from '@/utils/conditional';

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      cards: [],
      loading: true,
      showFilters: false,
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.$bind(
          'cards',
          fire
            .firestore()
            .collection(`${user.uid}/account/cards`)
            .limit(12),
        ).then(() => (this.loading = false));
      },
    },
  },
  computed: {
    people() {
      return [...new Set(this.cards.map(card => card.from).sort())];
    },
    last() {
      return this.cards[this.cards.length - 1];
    },
  },
  methods: {
    onClose() {
      this.showFilters = false;
    },
    clear() {
      this.loading = true;
      this.$bind(
        'cards',
        fire.firestore().collection(`${this.user.uid}/account/cards`),
      ).then(() => (this.loading = false));
    },
    loadMore() {
      this.loading = true;
      this.$bind(
        'cards',
        fire.firestore().collection(`${this.user.uid}/account/cards`),
      ).then(() => (this.loading = false));
    },
    update(e) {
      this.loading = true;
      const start = new Date(e.year, e.month ? e.month : 0, 1, 0, 0, 0);
      const end = new Date(
        e.year,
        e.month ? e.month + 1 : 12,
        0,
        23,
        59,
        59,
        0,
      );
      const q = cond(
        fire.firestore().collection(`${this.user.uid}/account/cards`),
      )
        .if(e.tag, q => q.where('tag', '==', e.tag))
        .if(e.from, q => q.where('from', '==', e.from))
        .if(e.year || e.month, q =>
          q
            .orderBy('date', 'desc')
            .startAt(end)
            .endAt(start),
        )
        .end();

      this.$bind('cards', q).then(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.caret {
  & :before {
    content: '';
    position: absolute;
    top: -15px;
    right: 9px;
    border-bottom: 15px solid #4a5568;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  & :after {
    content: '';
    position: absolute;
    top: -13px;
    right: 10px;
    border-bottom: 14px solid #fff;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
  }
}
</style>
