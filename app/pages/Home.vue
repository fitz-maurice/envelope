<template>
  <Page
    @loaded="$adService.showBanner()"
    @navigatingFrom="$adService.hideBanner()"
  >
    <!-- Envelope Header -->
    <Header @changeLayout="changeLayout" />

    <ScrollView orientation="vertical">
      <StackLayout>
        <Label v-if="!layout" text="Row" height="70" />
        <Label v-else text="Grid" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
        <Label text="Hello World" height="70" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import routes from '~/router';
import Header from '~/components/Header';

export default {
  components: {
    Header,
  },
  data() {
    return {
      layout: false,
    };
  },
  methods: {
    changeLayout(payload) {
      this.layout = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
