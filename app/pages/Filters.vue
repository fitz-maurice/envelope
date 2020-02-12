<template>
  <Page ref="page">
    <!-- Main Layout -->
    <StackLayout>
      <FlexboxLayout orientation="horizontal" justifyContent="space-between">
        <StackLayout>
          <Label
            v-for="(sort, index) in sorts"
            :class="{ selected: sort.value === sortSelected }"
            :key="index"
            :text="sort.name"
            @tap="sortSelected = sort.value"
            textWrap="true"
          />
        </StackLayout>

        <StackLayout>
          <Label text="Apply" @tap="apply" />
          <Label text="Reset" @tap="reset" />
        </StackLayout>
      </FlexboxLayout>

      <ListPicker
        ref="tag"
        :items="$store.state.holidays"
        :selectedIndex="tagIndex"
      />

      <ListPicker
        ref="person"
        :items="peopleList"
        :selectedIndex="personIndex"
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
      sortSelected: 'date',
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
      return ['All'].concat(this.$userService.user.people.sort());
    },
    personIndex() {
      return this.peopleList.indexOf(this.$store.state.personFilter);
    },
    tagIndex() {
      return this.$store.state.holidays.indexOf(this.$store.state.tagFilter);
    },
  },
  methods: {
    ...mapActions(['setSort', 'setTag', 'setPerson', 'filter']),
    apply() {
      this.setPerson(
        this.peopleList[this.$refs.person.nativeView.selectedIndex],
      );
      this.setTag(
        this.$store.state.holidays[this.$refs.tag.nativeView.selectedIndex],
      );
      this.setSort(this.sortSelected);
      this.filter();
    },
    reset() {
      this.sortSelected = 'date';
      this.setSort('date');
      this.setTag('All');
      this.setPerson('All');
      this.filter();
    },
  },
};
</script>

<style scoped>
.selected {
  color: #590404;
  font-weight: 600;
}
</style>
