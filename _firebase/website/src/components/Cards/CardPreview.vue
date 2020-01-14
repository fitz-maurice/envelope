<template>
  <div class="relative m-5">
    <div
      class="flex right-0 absolute shadow-lg rounded-full flex py-1 px-2 m-2 bg-gray-600 text-white text-xs items-center"
    >
      {{ card.tag }}
    </div>
    <div class="rounded-lg shadow-lg border border-gray-400">
      <img :src="image" alt="card" />
    </div>
    <div class="flex justify-between mt-2 items-end">
      <!-- Card tag type -->
      <span class="font-semibold text-sm">{{ card.from }}</span>
      <!-- When -->
      <span v-if="card.date" class="text-xs">{{ card.date | date }} </span>
    </div>
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
      image: null,
    };
  },
  created() {
    fire
      .storage()
      .refFromURL(`${this.card.front}`)
      .getDownloadURL()
      .then(url => (this.image = url));
  },
};
</script>
