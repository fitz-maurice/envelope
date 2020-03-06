import Vue from 'nativescript-vue';
import { TapticEngine } from 'nativescript-taptic-engine';

const giveFeedback = () => {
  const tapticEngine = new TapticEngine();
  tapticEngine.selection();
};

export const tapped = Vue.directive('tapped', {
  bind(el, binding, vnode) {
    el.nativeView.addEventListener(
      'tap',
      ({ view }) => {
        // Get original backgrounColor of view
        const original = vnode.context.$root.darkMode ? '#212121' : 'white';

        // Apply clicked color
        view.backgroundColor = vnode.context.$root.darkMode
          ? '#313131'
          : '#dddde3';

        // Revert color change
        view.animate({
          backgroundColor: original,
          duration: 250,
        });
      },
      this,
    );
  },
});

export const feedback = Vue.directive('feedback', {
  bind(el) {
    el.nativeView.addEventListener('tap', giveFeedback, this);
  },
});
