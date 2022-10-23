<template>
  <div class="orbit-spinner" :style="spinnerStyle">
    <div class="orbit one" :style="orbitStyle"></div>
    <div class="orbit two" :style="orbitStyle"></div>
    <div class="orbit three" :style="orbitStyle"></div>
  </div>
</template>

<script>
export default {
  name: "OrbitSpinner",

  props: {
    animationDuration: {
      type: Number,
      default: 1400,
    },
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: "#ff5810",
    },
  },

  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}vh`,
        width: `${this.size}vh`,
      };
    },

    orbitStyle() {
      return {
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`,
      };
    },
  },

  mounted() {
    console.log("mount orbit");
  },
};
</script>

<style scoped>
.orbit-spinner,
.orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  border-radius: 50%;
  perspective: 80vh;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 0.8vh solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 0.8vh solid #ff1d5e;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 0.8vh solid #ff1d5e;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
