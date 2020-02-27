<template>
  <Page ref="page" backgroundColor="#f0eff4">
    <!-- Main Layout -->
    <StackLayout>
      <Label v-shadow="5" class="bar" />
      <!-- Action buttons -->
      <FlexboxLayout class="header p-15 border" justifyContent="space-between">
        <Label text="Filters" class="heading" />

        <FlexboxLayout width="50%" justifyContent="space-between">
          <Label v-shadow="5" class="reset" text="Reset" @tap="reset" />
          <Label v-shadow="5" class="apply" text="Apply" @tap="apply" />
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
      <StackLayout id="tag" :class="{ border: showTag }">
        <FlexboxLayout
          id="tagRow"
          class="p-15 border"
          @tap="toggleTag"
          justifyContent="space-between"
        >
          <Label text="Occasion" class="label" />
          <Label :text="tagLabel" class="value" />
        </FlexboxLayout>
        <!-- :visibility="showTag ? 'visible' : 'collapsed'" -->
        <StackLayout id="tagPicker" opacity="0">
          <ListPicker
            ref="tag"
            :items="$store.state.holidays"
            :selectedIndex="tagIndex"
            @selectedIndexChange="tagChange"
          />
        </StackLayout>
      </StackLayout>

      <!-- Person picker -->
      <StackLayout id="person" :class="{ border: showPerson }">
        <FlexboxLayout
          id="personRow"
          class="p-15 border"
          @tap="togglePerson"
          justifyContent="space-between"
        >
          <Label text="Person" class="label" />
          <Label :text="personLabel" class="value" />
        </FlexboxLayout>
        <StackLayout id="personPicker" opacity="0">
          <ListPicker
            ref="person"
            :items="peopleList"
            :selectedIndex="personIndex"
            @selectedIndexChange="personchange"
          />
        </StackLayout>
      </StackLayout>

      <!-- Cover up -->
      <StackLayout id="cover">
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
        <Label text=" " textWrap="true" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
import { getString } from 'tns-core-modules/application-settings';
import { Frame } from 'tns-core-modules/ui/frame';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { Color } from 'tns-core-modules/color';

export default {
  data() {
    return {
      showTag: false,
      showPerson: false,
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
    this.selectedTag = this.$store.state.holidays.indexOf(
      this.$store.state.tagFilter,
    );
    this.selectedPerson = this.peopleList.indexOf(
      this.$store.state.personFilter,
    );
    this.sortSelected = this.$store.state.currentSort;
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
    personLabel() {
      return this.peopleList[this.selectedPerson];
    },
    tagLabel() {
      return this.$store.state.holidays[this.selectedTag];
    },
  },
  methods: {
    ...mapActions(['setSort', 'setTag', 'setPerson', 'filter']),
    toggleTag(changeCover = null) {
      const person = this.$refs.page.nativeView.getViewById('person');
      const picker = this.$refs.page.nativeView.getViewById('tagPicker');
      const cover = this.$refs.page.nativeView.getViewById('cover');
      const row = this.$refs.page.nativeView.getViewById('tagRow');

      if (this.showPerson) this.togglePerson(false);

      if (this.showTag) {
        setTimeout(() => {
          this.showTag = false;
        }, 275);

        person.animate({
          translate: {
            x: 0,
            y: 0,
          },
          duration: 250,
          curve: AnimationCurve.easeInOut,
        });

        if (changeCover) {
          cover.animate({
            translate: {
              x: 0,
              y: 0,
            },
            duration: 250,
            curve: AnimationCurve.easeInOut,
          });
        }

        picker.animate({
          opacity: 0,
          duration: 225,
        });

        row.backgroundColor = new Color(100, 89, 4, 4);
        row.animate({
          backgroundColor: 'white',
          duration: 150,
        });
      } else {
        this.showTag = true;
        person.animate({
          translate: {
            x: 0,
            y: 190,
          },
          duration: 250,
          delay: 50,
          curve: AnimationCurve.easeInOut,
        });

        cover.animate({
          translate: {
            x: 0,
            y: 185,
          },
          duration: 250,
          delay: 50,
          curve: AnimationCurve.easeInOut,
        });

        picker.animate({
          opacity: 1,
          duration: 275,
        });

        row.backgroundColor = new Color(100, 89, 4, 4);
        row.animate({
          backgroundColor: 'white',
          duration: 150,
        });
      }
    },
    togglePerson(changeCover = null) {
      const picker = this.$refs.page.nativeView.getViewById('personPicker');
      const cover = this.$refs.page.nativeView.getViewById('cover');
      const row = this.$refs.page.nativeView.getViewById('personRow');

      if (this.showTag) this.toggleTag(false);

      if (this.showPerson) {
        setTimeout(() => {
          this.showPerson = false;
        }, 275);

        if (changeCover) {
          cover.animate({
            translate: {
              x: 0,
              y: 0,
            },
            duration: 250,
            curve: AnimationCurve.easeInOut,
          });
        }

        picker.animate({
          opacity: 0,
          duration: 225,
        });

        row.backgroundColor = new Color(100, 89, 4, 4);
        row.animate({
          backgroundColor: 'white',
          duration: 250,
        });
      } else {
        this.showPerson = true;
        cover.animate({
          translate: {
            x: 0,
            y: 165,
          },
          duration: 250,
          delay: 50,
          curve: AnimationCurve.easeInOut,
        });

        picker.animate({
          opacity: 1,
          duration: 275,
          delay: 50,
        });

        row.backgroundColor = new Color(100, 89, 4, 4);
        row.animate({
          backgroundColor: 'white',
          duration: 250,
        });
      }
    },
    tagChange(e) {
      this.selectedTag = e.value;
    },
    personchange(e) {
      this.selectedPerson = e.value;
    },
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
      this.selectedTag = 0;
      this.selectedPerson = 0;
      this.setSort('date');
      this.setTag('All');
      this.setPerson('All');
      this.filter();
    },
  },
};
</script>

<style scoped>
.border {
  border-width: 0 0 0.25 0;
  border-color: #590404;
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

#tag {
  background-color: white;
}

#person {
  margin-top: -568px;
  background-color: white;
}

#cover {
  margin-top: -405px;
  background-color: #f0eff4;
}
</style>
