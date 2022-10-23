<template>
  <div class="breeding-rhombus-spinner" :style="spinnerStyle">
    <div
      class="rhombus"
      v-for="(rs, index) in rhombusesStyles"
      :key="index"
      :style="rs"
      :class="`child-${index + 1}`"
    ></div>
    <div class="rhombus big" :style="bigRhombusStyle"></div>
  </div>
</template>

<script>
export default {
  name: "BreedingRhombusSpinner",

  props: {
    animationDuration: {
      type: Number,
      default: 2500,
    },
    size: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: "#a2e5ff",
    },
  },

  data() {
    return {
      animationBaseName: "breeding-rhombus-spinner-animation-child",
      rhombusesNum: 8,
    };
  },

  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}vh`,
        width: `${this.size}vh`,
      };
    },

    rhombusStyle() {
      return {
        height: `${this.size / 7.5}vh`,
        width: `${this.size / 7.5}vh`,
        animationDuration: `${this.animationDuration}ms`,
        top: `${this.size / 2.3077}vh`,
        left: `${this.size / 2.3077}vh`,
        backgroundColor: this.color,
      };
    },

    rhombusesStyles() {
      const rhombusesStyles = [];
      const delayModifier = this.animationDuration * 0.05;

      for (let i = 1; i <= this.rhombusesNum; i++) {
        rhombusesStyles.push(
          Object.assign(
            {
              animationDelay: `${delayModifier * (i + 1)}ms`,
            },
            this.rhombusStyle
          )
        );
      }

      return rhombusesStyles;
    },

    bigRhombusStyle() {
      return {
        height: `${this.size / 3}vh`,
        width: `${this.size / 3}vh`,
        animationDuration: `${this.animationDuration}`,
        top: `${this.size / 3}vh`,
        left: `${this.size / 3}vh`,
        backgroundColor: this.color,
      };
    },
  },

  mounted() {
    console.log("mount breed");
  },
};
</script>

<style scoped>
.breeding-rhombus-spinner {
  position: relative;
  transform: rotate(45deg);
}

.breeding-rhombus-spinner,
.breeding-rhombus-spinner * {
  box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus {
  animation-duration: 2000ms;
  background-color: #ff1d5e;
  position: absolute;
  animation-iteration-count: infinite;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n + 0) {
  margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
  animation-name: breeding-rhombus-spinner-animation-child-1;
  animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
  animation-name: breeding-rhombus-spinner-animation-child-2;
  animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
  animation-name: breeding-rhombus-spinner-animation-child-3;
  animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
  animation-name: breeding-rhombus-spinner-animation-child-4;
  animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
  animation-name: breeding-rhombus-spinner-animation-child-5;
  animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
  animation-name: breeding-rhombus-spinner-animation-child-6;
  animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
  animation-name: breeding-rhombus-spinner-animation-child-7;
  animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
  animation-name: breeding-rhombus-spinner-animation-child-8;
  animation-delay: calc(100ms * 8);
}

.breeding-rhombus-spinner .rhombus.big {
  animation-duration: 2000ms;
  background-color: #ff1d5e;
  animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
  animation-delay: 0.5s;
}

@keyframes breeding-rhombus-spinner-animation-child-1 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(-325%, -325%);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(0, -325%);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(325%, -325%);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(325%, 0);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(325%, 325%);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(0, 325%);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(-325%, 325%);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
  10% {
    opacity: 0.1;
  }
  50% {
    transform: translate(-325%, 0);
    opacity: 1;
  }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
  50% {
    transform: scale(0.5);
  }
}
</style>
