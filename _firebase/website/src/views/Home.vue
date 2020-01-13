<template>
  <div class="h-full">
    <auth-selection v-if="!loggedIn" />
    <card-list v-if="user" :user="user" />
    <span v-if="user && !user.emailVerified">
      Email address is not verified
    </span>
  </div>
</template>

<script>
// import fire from '@/firebase';

export default {
  props: {
    user: Object,
    loggedIn: Boolean,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.query.mode === 'verifyEmail') vm.user.reload();
    });
  },
};
</script>
