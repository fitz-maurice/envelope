<template>
  <Page ref="page" backgroundColor="#f0eff4">
    <!-- Main Layout -->
    <StackLayout>
      <Label class="bar" />
      <!-- Action buttons -->
      <FlexboxLayout class="header" justifyContent="space-between">
        <Label text="Filters" class="title" />

        <FlexboxLayout flexDirection="row" alignContent="flex-end">
          <Label
            v-feedback
            v-shadow="2"
            class="reset"
            text="Reset"
            @tap="reset"
          />
          <Label
            v-feedback
            v-shadow="2"
            class="apply"
            text="Apply"
            @tap="apply"
          />
        </FlexboxLayout>
      </FlexboxLayout>

      <!-- Sort -->
      <FlexboxLayout
        class="input-wrapper input-wrapper-first"
        backgroundColor="white"
        justifyContent="space-between"
      >
        <Label text="Sort" class="label" />
        <FlexboxLayout alignItems="flex-end">
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
        @tap="selectTag"
        class="input-wrapper"
        justifyContent="space-between"
      >
        <Label text="Occasion" class="label" />
        <Label :text="selectedTag" class="value" />
      </FlexboxLayout>

      <!-- Person picker -->
      <FlexboxLayout
        v-tapped
        @tap="selectPerson"
        class="input-wrapper"
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
import Picker from '@/native/picker';
import { Color } from 'tns-core-modules/color';
import { Frame } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { getString } from 'tns-core-modules/application-settings';

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
      const picker = new Picker('Select person', {
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

<style lang="scss" scoped>
Page {
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
}

.bar {
  height: 5;
  width: 95px;
  margin-top: -100px;
  border-radius: 9999;
  background-color: #590404;
}

.header {
  padding: 30px;
}

.title {
  font-size: 20;
  color: #590404;
  font-weight: 600;
}

.input-wrapper {
  padding: 30px;
  font-size: 14px;
  border-bottom-width: 2px;
  border-bottom-color: #dfdfdf;
  background-color: white;
}
.input-wrapper-first {
  border-top-width: 2px;
  border-top-color: #dfdfdf;
}

.value {
  font-size: 14px;
}

.selected {
  color: #590404;
  font-weight: 600;
}

.reset {
  font-size: 14px;
  color: #590404;
  padding: 8 12;
  border-radius: 5;
  font-weight: 700;
  background-color: white;
}

.apply {
  font-size: 14px;
  margin-left: 30px;
  color: white;
  padding: 8 12;
  border-radius: 5;
  font-weight: 700;
  background-color: #590404;
}
</style>
