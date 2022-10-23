<template>
  <svg
    ref="linkedinSvg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style="width: calc(2.2vw + 2.2vh); height: calc(2.2vw + 2.2vh)"
  >
    <radialGradient id="linkedinGradient" r="0.9">
      <stop offset="0%" :stop-color="centralColor" />
      <stop offset="100%" :stop-color="surroundingColor" />
    </radialGradient>
    <title>Linkedin</title>
    <path
      fill="url(#linkedinGradient)"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    />
  </svg>
</template>

<script>
export default {
  name: "Linkedin",
  props: {
    // imgWidth: {
    //   default: 38,
    // },
    basicColor: {
      default: "#0d8a6f",
    },
    gradientColor: {
      default: "unset",
    },
    bgColor: {
      default: "transparent",
    },
  },

  data() {
    return {
      surroundingColor: String,
      centralColor: String,
    };
  },

  watch: {
    basicColor(val) {
      this.surroundingColor = val;
      if (this.gradientColor == "unset") this.centralColor = val;
    },
    gradientColor(val) {
      if (this.gradientColor != "unset") this.centralColor = val;
    },
    bgColor(val) {
      this.$refs.linkedinSvg.style.background = `radial-gradient(${val}, transparent 95%)`;
    },
  },

  mounted() {
    this.surroundingColor = this.basicColor;
    this.gradientColor == "unset"
      ? (this.centralColor = this.basicColor)
      : (this.centralColor = this.gradientColor);
    this.$refs.linkedinSvg.style.background = `radial-gradient(${this.bgColor}, transparent 95%)`;
  },
};
</script>

<style>
</style>