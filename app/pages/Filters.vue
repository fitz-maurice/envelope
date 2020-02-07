<template>
  <Page ref="page">
    <!-- Action Bar -->
    <ActionBar title="Filter" class="title" />

    <!-- Main Layout -->
    <StackLayout>
      <Label text="Hello World!" textWrap="true" />
      <Label text="Hello World!" textWrap="true" />
      <Label text="Hello World!" textWrap="true" />
      <Label text="Hello World!" textWrap="true" />
      <Label text="Hello World!" textWrap="true" />
    </StackLayout>
  </Page>
</template>

<script>
// import moment from 'moment';
// import routes from '@/router';
// import { mapActions } from 'vuex';
// import { Frame } from 'tns-core-modules/ui/frame';

export default {
  data() {
    return {
      foo: 'bar',
    };
  },
  methods: {
    // ...mapActions(['deleteCard']),
    hello() {
      alert('In editing mode...');
    },
  },
};
</script>

<style scoped>
.title {
  background-color: #590404;
  border-radius: 9999px;
  vertical-align: center;
  color: white;
  text-align: center;
  font-size: 18;
}
</style>
