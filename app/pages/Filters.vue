<template>
  <Page ref="page">
    <!-- Main Layout -->
    <StackLayout>
      <Label
        v-for="(sort, index) in sorts"
        :class="{ selected: sort.value === $store.state.currentSort }"
        :key="index"
        :text="sort.name"
        @tap="setSort(sort.value)"
        textWrap="true"
      />

      <ListPicker
        :items="$store.state.holidays"
        :selectedIndex="$store.state.tagFilter"
        @selectedIndexChange="setTag($event.value)"
      />

      <ListPicker
        :items="peopleList"
        :selectedIndex="$store.state.personFilter"
        @selectedIndexChange="setPerson($event.value)"
      />
    </StackLayout>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
import { getString } from 'tns-core-modules/application-settings';

export default {
  data() {
    return {
      sorts: [
        {
          name: 'Date Received',
          value: 'date',
        },
        {
          name: 'Creation Date',
          value: 'createdAt',
        },
      ],
    };
  },
  computed: {
    peopleList() {
      return this.$store.getters.people(this);
    },
  },
  methods: {
    ...mapActions(['setSort', 'setTag', 'setPerson']),
  },
};
</script>

<style scoped>
.selected {
  color: #590404;
  font-weight: 600;
}
</style>
