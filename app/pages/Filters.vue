<template>
  <!-- Main Layout -->
  <Page @loaded="loaded">
    <StackLayout class="root">
      <Label
        class="bar"
        :marginTop="this.height > 800 ? -25 : 0"
        :backgroundColor="$root.darkMode ? 'white' : '#590404'"
      />
      <!-- Action buttons -->
      <FlexboxLayout class="header" justifyContent="space-between">
        <Label
          text="Filters"
          class="title"
          :color="$root.darkMode ? 'white' : '#590404'"
        />

        <FlexboxLayout flexDirection="row" alignContent="flex-end">
          <Button
            v-feedback
            v-shadow="2"
            class="reset"
            text="Reset"
            @tap="reset"
          />
          <Button
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
        justifyContent="space-between"
        :backgroundColor="$root.darkMode ? '#212121' : 'white'"
      >
        <Label text="Sort" class="label" />
        <FlexboxLayout alignItems="flex-end">
          <Label
            v-for="(sort, index) in sorts"
            :class="{
              'light-selected': sort.value === sortSelected,
              'dark-selected': sort.value === sortSelected && $root.darkMode,
              'dark-non-selected':
                sort.value !== sortSelected && $root.darkMode,
            }"
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
        :backgroundColor="$root.darkMode ? '#212121' : 'white'"
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
        :backgroundColor="$root.darkMode ? '#212121' : 'white'"
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
import { ios } from 'tns-core-modules/ui/core/view';
const platformModule = require('tns-core-modules/platform');

export default {
  data() {
    return {
      height: platformModule.screen.mainScreen.heightDIPs,
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
    scale() {
      return platformModule.screen.mainScreen.scale;
    },
  },
  methods: {
    ...mapActions(['setSort', 'setTag', 'setPerson', 'filter']),
    loaded(args) {
      const parent = ios.getParentWithViewController(args.object);
      const width = platformModule.screen.mainScreen.widthDIPs;
      let y;

      if (this.height > 650 && this.height < 730) {
        y = 100;
      } else if (this.height > 730 && this.height < 800) {
        y = 125;
      } else if (this.height > 800) {
        y = 175;
      }

      parent.ios.view.superview.frame = CGRectMake(0, y, width, 300);
    },
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
  padding-top: 0;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  background-color: #f0eff4;
}

.bar {
  height: 5;
  width: 30;
  border-radius: 9999;
}

.header {
  padding: 10;
}

.title {
  font-size: 20;
  color: #590404;
  font-weight: 600;
}

.input-wrapper {
  padding: 10;
  font-size: 14;
  border-bottom-width: 0.5;
  border-bottom-color: #dfdfdf;
  background-color: white;
}

.input-wrapper-first {
  border-top-width: 0.5;
  border-top-color: #dfdfdf;
}

.value {
  font-size: 14;
}

.light-selected {
  color: #590404;
  font-weight: 600;
}

.dark-selected {
  color: white;
  font-weight: 600;
}

.dark-non-selected {
  color: #a0aec0;
}

.reset {
  color: #590404;
  padding: 8 12;
  border-radius: 5;
  font-weight: 700;
  background-color: white;
}

.apply {
  margin-left: 10;
  color: white;
  padding: 8 12;
  border-radius: 5;
  font-weight: 700;
  background-color: #590404;
}
</style>
