<script>
export default {
  functional: true,
  render(h, context) {
    const data = {
      props: {
        name: 'fade',
        mode: 'out-in',
        duration: 200,
      },
      on: {
        beforeEnter: el => {
          el.style.opacity = 0;
        },
        afterEnter: el => {
          el.style.opacity = 1;
          el.style.transition = 'all 0.2s';
        },
        beforeLeave: el => {
          el.style.opacity = 0;
          el.style.transition = 'all 0.2s';
        },
      },
    };
    return h('transition', data, context.children);
  },
};
</script>
