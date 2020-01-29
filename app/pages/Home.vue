<template>
  <Page
    @loaded="$adService.showBanner()"
    @navigatingFrom="$adService.hideBanner()"
  >
    <!-- Envelope Header -->
    <Header @changeLayout="changeLayout" />
    <!-- Main view -->
    <AbsoluteLayout>
      <ScrollView
        orientation="vertical"
        scrollBarIndicatorVisible="false"
        height="100%"
        width="100%"
      >
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
      </ScrollView>
      <AbsoluteLayout width="100%" marginTop="94%">
        <FlexboxLayout justifyContent="flex-end" width="94%">
          <FabButton
            @onButtonTap="
              $navigateTo(routes.cardCreation, { clearHistory: true })
            "
          />
        </FlexboxLayout>
      </AbsoluteLayout>
    </AbsoluteLayout>
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
      routes,
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
