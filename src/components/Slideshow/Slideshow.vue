<template>
  <div class="slideshow">
    <div :id="`active${uniqueLabel}`" class="slideshow-active">
      <span class="slideshow-title">
        <slot :name="`title${slideNum}`" />
      </span>
      <span class="slideshow-content">
        <slot :name="`content${slideNum}`" />
      </span>
      <div class="slideshow-navigation">
        <span
          :id="`next${uniqueLabel}`"
          class="slideshow-next prevent-select hoverable"
          @mouseover="onNextMouseOver"
          @mouseout="onNextMouseOut"
          @click="onNextClick"
          :style="{ color: nextTextColor }"
        >
          <slot :name="`title${nextNumber(slideNum, slidesNumber, true)}`" />
          <ToRightArrow :imgColor="nextArrowColor" />
        </span>
        <span
          :id="`finish${uniqueLabel}`"
          class="slideshow-finish d-none prevent-select hoverable"
          @click="onFinishClick"
        >
          <slot name="finish" />
        </span>
        <span
          :id="`previous${uniqueLabel}`"
          class="slideshow-previous prevent-select hoverable"
          @mouseover="onPreviousMouseOver"
          @mouseout="onPreviousMouseOut"
          @click="onPreviousClick"
          :style="{ color: previousTextColor }"
        >
          <ToLeftArrow :imgColor="previousArrowColor" />
          <slot
            :name="`title${previousNumber(slideNum, slidesNumber, true)}`"
          />
        </span>
      </div>
    </div>
    <div :id="`inactive${uniqueLabel}`" class="slideshow-inactive d-none">
      <slot name="inactive" />
    </div>
  </div>
</template>

<script>
import ToRightArrow from "./components/ToRightArrow.vue";
import ToLeftArrow from "./components/ToLeftArrow.vue";

export default {
  name: "Slideshow",

  components: {
    ToRightArrow,
    ToLeftArrow,
  },

  props: {
    uniqueLabel: String,
    slidesNumber: Number,
    loopMode: {
      default: true,
    },
    isFinished: {
      default: false,
    },
    nextTextMainColor: {
      default: "#079536",
    },
    nextTextHoverColor: {
      default: "#437bfd",
    },
    nextArrowMainColor: {
      default: "#2bde67",
    },
    nextArrowHoverColor: {
      default: "#ff4180",
    },
    previousTextMainColor: {
      default: "#9920f0",
    },
    previousTextHoverColor: {
      default: "#ff4180",
    },
    previousArrowMainColor: {
      default: "#e436ff",
    },
    previousArrowHoverColor: {
      default: "#51c4c4",
    },
  },

  data() {
    return {
      // windowWidth: Number,
      nextTextColor: "#079536",
      nextArrowColor: "#2bde67",
      previousTextColor: "#9920f0",
      previousArrowColor: "#e436ff",
      slideNum: 1,

      // Elements Object Refs
      activeDiv: Object,
      inactiveDiv: Object,
      previousSpan: Object,
      nextSpan: Object,
      finishSpan: Object,
    };
  },

  watch: {
    slideNum(val) {
      if (!this.loopMode) {
        if (this.slideNum == 1) {
          this.previousSpan.classList.add("d-none");
        } else {
          this.previousSpan.classList.remove("d-none");
        }

        if (this.slidesNumber == val) {
          this.nextSpan.classList.add("d-none");
          this.finishSpan.classList.remove("d-none");
        } else {
          this.finishSpan.classList.add("d-none");
          this.nextSpan.classList.remove("d-none");
        }
      }
    },
    isFinished(val) {
      if (val) {
        this.activeDiv.classList.add("d-none");
        this.inactiveDiv.classList.remove("d-none");
      }
    },
  },

  methods: {
    // Utility Methods

    preventDefaultEvents(e) {
      e = e || window.event;
      e.preventDefault();
    },

    // Returns the previous number within the given range starting from zero or one
    // i.e. for the range 5, it is 1-5 or 0-4
    previousNumber(num, range, fromOne) {
      var diffNum = (num - 1) % range;
      if (fromOne) {
        if (diffNum == 0) {
          diffNum = range;
        }
      }
      return diffNum;
    },

    // Returns the next number within the given range starting from zero or one
    // i.e. for the range 5, it is 1-5 or 0-4
    nextNumber(num, range, fromOne) {
      var diffNum = (num + 1) % range;
      if (fromOne) {
        if (diffNum == 0) {
          diffNum = range;
        }
      }
      return diffNum;
    },

    // Event Handlers

    onNextMouseOver() {
      this.nextTextColor = this.nextTextHoverColor;
      this.nextArrowColor = this.nextArrowHoverColor;
    },
    onNextMouseOut() {
      this.nextTextColor = this.nextTextMainColor;
      this.nextArrowColor = this.nextArrowMainColor;
    },
    onNextClick() {
      this.slideNum = this.nextNumber(this.slideNum, this.slidesNumber, true);
      this.onNextMouseOut();
      this.activeDiv.scrollTop = 0;
    },
    onFinishClick() {
      this.$emit("slideshow-finish");
      // this.isFinished = false;
    },
    onPreviousClick() {
      this.slideNum = this.previousNumber(
        this.slideNum,
        this.slidesNumber,
        true
      );
      this.onPreviousMouseOut();
      this.activeDiv.scrollTop = 0;
    },
    onPreviousMouseOver() {
      this.previousTextColor = this.previousTextHoverColor;
      this.previousArrowColor = this.previousArrowHoverColor;
    },
    onPreviousMouseOut() {
      this.previousTextColor = this.previousTextMainColor;
      this.previousArrowColor = this.previousArrowMainColor;
    },
  },

  mounted() {
    this.activeDiv = document.querySelector(`#active${this.uniqueLabel}`);
    this.inactiveDiv = document.querySelector(`#inactive${this.uniqueLabel}`);
    this.previousSpan = document.querySelector(`#previous${this.uniqueLabel}`);
    this.nextSpan = document.querySelector(`#next${this.uniqueLabel}`);
    this.finishSpan = document.querySelector(`#finish${this.uniqueLabel}`);
    if (!this.loopMode) {
      this.previousSpan.classList.add("d-none");
    }
  },

  emits: ["slideshow-finish"],
};
</script>

<style scoped>
.slideshow {
  width: 100%;
  background: #f9da2d;
  font-size: calc(1.6vw + 1.6vh + 1px);
  border: 1vh double #d8215e;
  border-radius: calc(1vw + 1vh);
}

.slideshow-active {
  width: 100%;
  height: 50vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.slideshow-title {
  width: 100%;
  height: fit-content;
  background: #f9da2d;
  font-family: "Gluten";
  font-weight: 500;
  color: #d8215e;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: calc(1vw + 1vh);
}

.slideshow-content {
  width: 100%;
  height: fit-content;
  position: relative;
  font-family: "Tajawal", sans-serif;
  color: #0101a9;
  line-height: calc(2.5vw + 2.5vh);
  padding: calc(0.5vw + 0.5vh) calc(1.5vw + 1.5vh);
  margin: 0;
}

.slideshow-navigation {
  background: #f9da2d;
  width: 100%;
  height: fit-content;
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.slideshow-navigation span {
  width: fit-content;
  height: fit-content;
  font-family: "Julius Sans One", sans-serif;
  font-size: calc(1.2vw + 1.2vh + 0.5px);
  white-space: nowrap;
}

.slideshow-next {
  position: relative;
  right: 0;
  padding: calc(1vw + 1vh) 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
}

.slideshow-finish {
  position: relative;
  right: 0;
  background: #079536;
  font-weight: 800;
  color: #fff;
  border-radius: calc(1vw + 1vh);
  padding: 1.5vh;
  margin: calc(1vw + 1vh) calc(2vw + 2vh);
  align-self: flex-end;
}

.slideshow-finish:hover {
  background: #d8215e;
}

.slideshow-finish:active {
  background: #23a3f3;
}

.slideshow-previous {
  position: relative;
  left: 0;
  padding: calc(1vw + 1vh) 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
}

.slideshow-inactive {
  width: 70vw;
  height: fit-content;
  font-family: "Julius Sans One", sans-serif;
  font-weight: 900;
  line-height: calc(1.5vw + 1.5vh);
  color: #079536;
  text-align: center;
  padding: calc(1.5vw + 1.5vh);
}
</style>