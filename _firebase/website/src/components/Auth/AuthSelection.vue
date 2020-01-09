<template>
  <div
    class="mx-auto w-1/4 rounded p-5 border bg-white flex flex-col items-center justify-center"
  >
    <p class="font-semibold">This is the login page</p>
    <social-login />
    <span>OR</span>
    <sign-up-form />
    <span class="w-full border-b border-grey-800 my-5" />
    <div class="flex flex-col items-center">
      <p>Already have an account?</p>
      <router-link to="/login" class="text-blue-500 font-semibold">
        Log In
      </router-link>
    </div>
  </div>
</template>
