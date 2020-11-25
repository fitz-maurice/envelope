<template>
  <div class="flex items-center justify-center h-full">
    <div class="flex items-center justify-around bg-bg py-10 w-4/5 rounded">
      <!-- Left -->
      <div class="flex-col p-5 rounded">
        <img
          src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
          alt="envelope"
        />
        <span class="w-full border-b border-gray-800 my-5" />
      </div>
      <!-- Right -->
      <div
        class="w-1/3 rounded p-5 border border-gray-400 flex flex-col items-center justify-center shadow-2xl"
      >
        <div class="flex items-center">
          <envelope class="h-16 w-16" />
          <h1 class="tracking-widest font-semibold text-lg ml-3">| Envelope</h1>
        </div>
        <social-login />
        <div class="flex w-full items-center my-3">
          <span class="w-full border-b-2 border-gray-400" />
          <span class="mx-2">or</span>
          <span class="w-full border-b-2 border-gray-400" />
        </div>
        <sign-up-form />
        <span class="w-full border-b-2 border-gray-400 my-5" />
        <div class="flex flex-col items-center">
          <p>Already have an account?</p>
          <router-link
            to="/login"
            class="text-blue-500 font-semibold tracking-wider"
          >
            Sign in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
