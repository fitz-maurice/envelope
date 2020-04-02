<template>
  <div @click="toggle" class="relative m-5 cursor-pointer">
    <div class="grow bg-white">
      <div
        class="flex z-20 right-0 absolute shadow-lg rounded-full flex py-1 px-2 m-2 bg-gray-600 text-white text-xs items-center"
      >
        {{ card.tag }}
      </div>
      <div class="shadow-lg border border-gray-400">
        <progressive-img
          :src="front"
          alt="card"
          placeholder="https://unsplash.it/1920/1080?image=10"
        />
      </div>
    </div>
    <div class="flex justify-between mt-2 items-end">
      <!-- Card tag type -->
      <span class="font-semibold text-sm">{{ card.from }}</span>
      <!-- When -->
      <span v-if="card.date" class="text-xs">{{ card.date | date }} </span>
    </div>

    <!-- Card detail modal -->
    <portal to="modal" v-if="show">
      <modal name="card-detail" height="90%" @before-close="show = false">
        <card-detail :card="{ ...card, front }" />
      </modal>
    </portal>
  </div>
</template>

<script>
import fire from '@/firebase';

export default {
  props: {
    card: Object,
  },
  data() {
    return {
      show: false,
      front: null,
    };
  },
  created() {
    fire
      .storage()
      .refFromURL(`${this.card.front}`)
      .getDownloadURL()
      .then(url => (this.front = url));
  },
  methods: {
    toggle() {
      this.show = true;
      this.$nextTick(() => {
        this.$modal.show('card-detail');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.grow {
  transition-duration: 0.4s;
  transition-property: transform;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    transform: scale(1.02);
  }
}
</style>
