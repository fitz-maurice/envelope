<template>
  <div
    class="flex flex-col relative h-full justify-between rounded bg-white text-center"
  >
    <!-- Card Data -->
    <div
      class="flex items-center justify-between p-5 border-b border-gray-400 shadow-md"
    >
      <div class="flex flex-col items-start">
        <h2 class="text-lg font-semibold">{{ card.tag }} Card</h2>
        <span class="">{{ card.from }} </span>
      </div>
      <span class="text-sm">{{ card.date | date }}</span>
    </div>
    <full-screen
      @click="index = 0"
      class="absolute cursor-pointer right-0 mt-28 mr-3 h-5"
    />
    <!-- Image -->
    <progressive-img :src="images[viewing]" />
    <!-- View buttons -->
    <div class="border-t border-gray-400 shadow-top">
      <!-- Back -->
      <button
        v-if="this.type === 'book' || this.type === 'double'"
        @click="viewing = 'back'"
        class="focus:outline-none hover:text-envelope-red hover:font-semibold h-full"
        :class="{
          'text-envelope-red font-semibold bg-gray-200 shadow-inner':
            viewing === 'back',
          'w-1/3': this.type === 'book',
          'w-1/2': this.type === 'double',
        }"
      >
        Back
      </button>
      <!-- Front -->
      <button
        @click="viewing = 'front'"
        :disabled="this.type === 'single'"
        class="focus:outline-none hover:text-envelope-red hover:font-semibold py-5 cursor-default border-gray-400"
        :class="{
          'text-envelope-red font-semibold bg-gray-200 shadow-inner cursor-pointer':
            viewing === 'front' && this.type !== 'single',
          'w-1/3 border-l border-r': this.type === 'book',
          'w-1/2 border-l': this.type === 'double',
        }"
      >
        Front
      </button>
      <!-- Inside -->
      <button
        v-if="this.type === 'book'"
        @click="viewing = 'inside'"
        class="focus:outline-none hover:text-envelope-red hover:font-semibold h-full"
        :class="{
          'text-envelope-red font-semibold bg-gray-200 shadow-inner':
            viewing === 'inside',
          'w-1/3': this.type === 'book',
        }"
      >
        Inside
      </button>
    </div>

    <gallery
      :images="galleryImages"
      :index="index"
      @close="index = null"
    ></gallery>
  </div>
</template>

<script>
import fire from '@/firebase';
import VueGallery from 'vue-gallery';

export default {
  components: {
    gallery: VueGallery,
  },
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {
      viewing: 'front',
      index: null,
      images: {
        front: this.card.front,
        inside: null,
        back: null,
      },
    };
  },
  computed: {
    type() {
      return this.card.back && this.card.inside
        ? 'book'
        : this.card.back && !this.card.inside
        ? 'double'
        : 'single';
    },
    galleryImages() {
      return Object.values(this.images).filter(value => value !== null);
    },
  },
  beforeMount() {
    if (this.card.inside) {
      fire
        .storage()
        .refFromURL(`${this.card.inside}`)
        .getDownloadURL()
        .then(url => (this.images.inside = url));
    }

    if (this.card.back) {
      fire
        .storage()
        .refFromURL(`${this.card.back}`)
        .getDownloadURL()
        .then(url => (this.images.back = url));
    }
  },
  methods: {},
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
