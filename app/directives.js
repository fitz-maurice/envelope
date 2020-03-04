import Vue from 'nativescript-vue';
import { TapticEngine } from 'nativescript-taptic-engine';

const onTap = ({ view }) => {
  // Get original backgrounColor of view
  const original = view._cssState._appliedPropertyValues['background-color'];

  // Apply clicked color
  view.backgroundColor = '#dddde3';

  // Revert color change
  view.animate({
    backgroundColor: original,
    duration: 250,
  });
};

const giveFeedback = ({ view }) => {
  const tapticEngine = new TapticEngine();
  tapticEngine.selection();
};

export const tapped = Vue.directive('tapped', {
  bind(el) {
    el.nativeView.addEventListener('tap', onTap, this);
  },
});

export const feedback = Vue.directive('feedback', {
  bind(el) {
    el.nativeView.addEventListener('tap', giveFeedback, this);
  },
});
