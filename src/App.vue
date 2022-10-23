<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  // data() {
  //   return {
  //     isLoaded: false,
  //   };
  // },

  // mounted() {
  //   console.log("mount app", Date.now());
  //   console.log(this.isLoaded);
  //   if (!this.isLoaded) {
  //     this.isLoaded = !this.isLoaded;
  //     console.log(this.isLoaded);
  //   }
  // },
};
</script>

<style scoped>
@import "@/assets/css/loading.css";
@import "@/assets/css/animations.css";
@import "@/assets/css/global.css";
</style>
