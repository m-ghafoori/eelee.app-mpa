<template>
  <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 252.667 252.667"
    enable-background="new 0 0 252.667 252.667"
    xml:space="preserve"
    :class="imgClassList"
    @click="onclick"
  >
    <g>
      <circle style="fill: #250266" cx="126.333" cy="126.333" r="126.333" />
      <g>
        <path
          style="fill: #1c7287"
          d="M215.664,37.002c-49.336-49.336-129.326-49.336-178.662,0l89.331,89.331L215.664,37.002z"
        />
        <path
          style="fill: #165c6c"
          d="M126.334,0C94.002,0,61.67,12.334,37.002,37.002l89.331,89.331L126.334,0z"
        />
        <path
          style="fill: #f8b242"
          d="M37.002,215.664c49.336,49.336,129.326,49.336,178.662,0l-89.331-89.331L37.002,215.664z"
        />
        <path
          style="fill: #d09838"
          d="M37.003,215.664c24.668,24.668,57.331,37.002,89.331,37.002V126.333L37.003,215.664z"
        />
        <path
          style="fill: #e45527"
          d="M215.664,37.002l-89.331,89.331l89.331,89.331C265.001,166.328,265.001,86.338,215.664,37.002z"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ColorIcon",

  props: {
    targetSelector: {
      default: "#colorSettingsList",
    },
  },

  data() {
    return {
      isExpanded: false,
      imgClassList: "",
      targetClassList: HTMLCollection,
    };
  },

  watch: {
    isExpanded(val) {
      if (val) {
        this.imgClassList = "ccw-rotation";
        this.targetClassList.remove("invisible", "scale-down-ver-top");
        this.targetClassList.add("scale-up-ver-top");
      } else {
        this.imgClassList = "cw-rotation";
        this.targetClassList.remove("scale-up-ver-top");
        this.targetClassList.add("scale-down-ver-top");
      }
    },
  },

  methods: {
    onclick() {
      this.isExpanded = !this.isExpanded;
    },
  },

  mounted() {
    this.targetClassList = document.querySelector(
      this.targetSelector
    ).classList;
    this.targetClassList.add("invisible", "scale-down-ver-top");
  },
};
</script>

<style scoped>
svg {
  width: calc(4vw + 4vh);
  height: calc(4vw + 4vh);
}
</style>