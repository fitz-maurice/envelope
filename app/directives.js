import Vue from 'nativescript-vue';

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

export const tapped = Vue.directive('tapped', {
  bind(el) {
    el.nativeView.addEventListener('tap', onTap, this);
  },
});
