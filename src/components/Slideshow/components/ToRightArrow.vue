<template>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="calc(2vw + 2vh + 1px)"
    height="calc(1.5vw + 1.5vh + 0.75px)"
    viewBox="0 0 297 297"
    style="enable-background: new 0 0 297 297"
    xml:space="preserve"
  >
    <g>
      <polygon
        :fill="imgColor"
        points="33,66 0,66 66,148 0,231 33,231 99,148 	"
      />
      <polygon
        :fill="imgColor"
        points="83,66 50,66 116,148 50,231 83,231 149,148 	"
      />
      <polygon
        :fill="imgColor"
        points="133,66 100,66 166,148 100,231 133,231 199,148 	"
      />
      <polygon
        :fill="imgColor"
        points="231,66 149,66 215,148 149,231 231,231 297,148 	"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "ToRightArrow",
  props: {
    imgColor: {
      default: "#2bde67",
    },
  },
};
</script>

<style>
</style>