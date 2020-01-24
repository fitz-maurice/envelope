<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between">
      <h3 class="tracking-widest font-semibold">Filters</h3>
      <div
        @click="clear"
        class="flex text-xs items-center"
        :class="{ 'opacity-50': allNull, 'cursor-pointer': !allNull }"
      >
        Clear all
        <clear-button class="ml-2 h-4 w-4" />
      </div>
    </div>
    <span class="w-full border-b border-gray-400"></span>
    <form
      action="#"
      @submit.prevent="submit"
      class="flex flex-col items-center"
    >
      <label for="when" class="w-full text-left text-xs font-semibold mt-6">
        Event
      </label>
      <div class="flex w-full items-center">
        <select
          v-model="tag"
          @change="update"
          class="border text-sm border-gray-400 rounded p-2 w-full my-2"
          :class="{ 'text-gray-700': !tag }"
        >
          <option value="null" selected disabled hidden>Select event</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Birthday">Birthday</option>
          <option value="Christmas">Christmas</option>
        </select>
      </div>
      <label for="from" class="w-full text-left text-xs font-semibold">
        From
      </label>
      <div class="flex w-full items-center">
        <select
          v-model="from"
          @change="update"
          class="border text-sm border-gray-400 rounded p-2 w-full my-2"
          :class="{ 'text-gray-700': !from }"
        >
          <option value="null" selected disabled hidden>Select person</option>
          <option
            v-for="(person, index) in people"
            :key="index"
            :value="person"
          >
            {{ person }}
          </option>
        </select>
      </div>
      <label for="when" class="w-full text-left text-xs font-semibold">
        When
      </label>
      <div class="flex w-full items-center">
        <select
          v-model.number="month"
          class="border text-sm border-gray-400 rounded p-2 w-full my-2"
          :class="{ 'text-gray-700': !month }"
          @change="update"
        >
          <option value="null" selected disabled hidden>Month</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <select
          v-model="year"
          class="border text-sm border-gray-400 rounded p-2 w-full my-2 ml-5"
          :class="{ 'text-gray-700': !year }"
          @change="update"
        >
          <option value="null" selected disabled hidden>Year</option>
          <option v-for="(year, index) in yearRange" :key="index" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import _range from 'lodash.range';

export default {
  props: {
    people: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      from: null,
      tag: null,
      month: null,
      year: null,
    };
  },
  computed: {
    yearRange() {
      return _range(1980, new Date().getFullYear() + 1).reverse();
    },
    allNull() {
      return (
        this.from === null &&
        this.tag === null &&
        this.month === null &&
        this.year === null
      );
    },
  },
  methods: {
    clear() {
      if (!this.allNull) {
        this.from = null;
        this.tag = null;
        this.month = null;
        this.year = null;
        this.$emit('clear');
      }
    },
    update() {
      if (this.month !== null && this.year === null)
        this.year = new Date().getFullYear();

      this.$emit('update', {
        tag: this.tag,
        from: this.from,
        month: this.month,
        year: this.year,
      });
    },
  },
};
</script>
