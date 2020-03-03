<template>
  <Page ref="page" backgroundColor="#f0eff4">
    <!-- Main Layout -->
    <StackLayout>
      <Label v-shadow="5" class="bar" />
      <!-- Action buttons -->
      <FlexboxLayout class="header p-15 border" justifyContent="space-between">
        <Label text="Filters" class="heading" />

        <FlexboxLayout
          class="m-r-25"
          width="50%"
          justifyContent="space-between"
        >
          <Button v-shadow="5" class="reset" text="Reset" @tap="reset" />
          <Button v-shadow="5" class="apply" text="Apply" @tap="apply" />
        </FlexboxLayout>
      </FlexboxLayout>

      <!-- Sort -->
      <FlexboxLayout
        class="p-15 sort border"
        orientation="horizontal"
        justifyContent="space-between"
      >
        <Label text="Sort" class="label" />
        <FlexboxLayout>
          <Label
            v-for="(sort, index) in sorts"
            :class="{ selected: sort.value === sortSelected }"
            class="m-l-15 value"
            :key="index"
            :text="sort.name"
            @tap="sortSelected = sort.value"
            textWrap="true"
          />
        </FlexboxLayout>
      </FlexboxLayout>

      <!-- Tag picker -->
      <FlexboxLayout
        v-tapped
        class="p-15 border"
        @tap="selectTag"
        justifyContent="space-between"
      >
        <Label text="Occasion" class="label" />
        <Label :text="selectedTag" class="value" />
      </FlexboxLayout>

      <!-- Person picker -->
      <FlexboxLayout
        v-tapped
        class="p-15 border"
        @tap="selectPerson"
        justifyContent="space-between"
      >
        <Label text="Person" class="label" />
        <Label :text="selectedPerson" class="value" />
      </FlexboxLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
import { getString } from 'tns-core-modules/application-settings';
import { Frame } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { Color } from 'tns-core-modules/color';
import Picker from '@/native/picker';

export default {
  data() {
    return {
      sortSelected: null,
      selectedTag: null,
      selectedPerson: null,
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
  created() {
    this.selectedTag = this.$store.state.tagFilter;
    this.selectedPerson = this.$store.state.personFilter;
    this.sortSelected = this.$store.state.currentSort;
  },
  computed: {
    peopleList() {
      return ['All'].concat(this.$userService.user.people.sort());
    },
  },
  methods: {
    ...mapActions(['setSort', 'setTag', 'setPerson', 'filter']),
    selectTag() {
      const picker = new Picker('Select an occassion', {
        items: this.$store.state.holidays,
      });

      picker.pick().then(result => {
        if (result) this.selectedTag = this.$store.state.holidays[result];
      });
    },
    selectPerson() {
      const picker = new Picker('Select or enter new person', {
        items: this.peopleList,
      });

      picker.pick().then(result => {
        if (result) this.selectedPerson = this.peopleList[result];
      });
    },
    apply() {
      this.setPerson(this.selectedPerson);
      this.setTag(this.selectedTag);
      this.setSort(this.sortSelected);
      this.filter();
      this.$closeBottomSheet();
    },
    reset() {
      this.sortSelected = 'date';
      this.selectedTag = 'All';
      this.selectedPerson = 'All';
      this.setSort('date');
      this.setTag('All');
      this.setPerson('All');
      this.filter();
      this.$closeBottomSheet();
    },
  },
};
</script>

<style scoped>
.border {
  border-width: 0 0 0.25 0;
  border-color: #590404;
  background-color: white;
}

.bar {
  margin-top: -75px;
  margin-bottom: 20;
  background-color: #590404;
  width: 40%;
  height: 4;
  border-radius: 9999;
}

.heading {
  color: #590404;
  font-size: 25;
  font-weight: 700;
}

.sort {
  background-color: white;
}

.label {
  font-weight: 600;
}

.value {
  font-size: 14;
}

.selected {
  color: #590404;
  font-weight: 600;
}

.reset {
  color: #590404;
  background-color: white;
  padding: 8 20;
  border-radius: 5;
  font-size: 13px;
  font-weight: 700;
}

.apply {
  color: white;
  background-color: #590404;
  padding: 8 20;
  border-radius: 5;
  font-size: 13px;
  font-weight: 700;
}
</style>
