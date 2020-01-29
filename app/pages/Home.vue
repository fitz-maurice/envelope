<template>
  <Page
    @loaded="$adService.showBanner()"
    @navigatingFrom="$adService.hideBanner()"
  >
    <!-- Envelope Header -->
    <Header @changeLayout="changeLayout" />
    <AbsoluteLayout>
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

    <!-- Main view -->
    <ScrollView orientation="vertical" scrollBarIndicatorVisible="false">
      <WrapLayout :orientation="layout.orientation">
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
        <Image
          :width="layout.width"
          height="100"
          src="~/assets/envelope.png"
        ></Image>
      </WrapLayout>

      <AbsoluteLayout marginTop="94%" marginLeft="80%">
        <FabButton
          @onButtonTap="
            $navigateTo(routes.cardCreation, { clearHistory: true })
          "
        />
      </AbsoluteLayout>
    </ScrollView>
  </Page>
</template>

<script>
import routes from '~/router';
import Header from '~/components/Header';
import FabButton from '~/components/FabButton';

export default {
  components: {
    Header,
    FabButton,
  },
  data() {
    return {
      layout: {
        width: '49.9%',
        orientation: 'horizontal',
      },
    };
  },
  methods: {
    changeLayout(payload) {
      this.layout = {
        width: payload ? '100%' : '49.9%',
        orientation: payload ? 'vertical' : 'horizontal',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  margin: 0;
  padding: 0;
}
.center {
  margin: 0 auto;
}
</style>
