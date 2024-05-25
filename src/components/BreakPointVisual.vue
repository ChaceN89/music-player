<template>
  <div class="fixed top-0 left-0 m-1 p-1 z-50 font-mono text-white h-10 w-10 rounded-full flex items-center justify-center bg-gray-700 xxs:bg-purple-500 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-black">
    <div class="block xxs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">xxs</div>
    <div class="hidden xxs:block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">xs</div>
    <div class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</div>
    <div class="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
    <div class="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">lg</div>
    <div class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</div>
    <div class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</div>
  </div>
</template>

<script>
export default {
  name: 'BreakPointVisual'
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
