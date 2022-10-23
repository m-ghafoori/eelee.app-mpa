<template>
  <div ref="numberDiv" class="input-wrapper hoverable" :style="divStyle">
    <span
      class="label-span number-label-span"
      @mousedown="preventDefaultEvents"
      @click="onLabelClick"
      >{{ uniqueLabel }}</span
    >
    <div class="input-div align-items-center">
      <input
        :id="removeSpace(uniqueLabel)"
        class="input"
        v-model="inputValue"
        type="number"
        :name="inputName"
        :min="minValue"
        :max="maxValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keydown="onInputKeyDown"
        @keyup="onInputKeyUp"
      />
      <div class="spinner-box">
        <Spinner
          :isActive="isUpperSpinnerActive"
          :mainColor="mainBorderColor"
          :activeColor="activeBorderColor"
          :hoverColor="spinnerHoverColor"
          @mousedown="onUpperSpinnerMouseDown"
          @mouseup="onUpperSpinnerMouseUp"
          @mouseleave="onUpperSpinnerMouseUp"
          style="transform: rotate(180deg)"
        />
        <Spinner
          :isActive="isLowerSpinnerActive"
          :mainColor="mainBorderColor"
          :activeColor="activeBorderColor"
          :hoverColor="spinnerHoverColor"
          @mousedown="onLowerSpinnerMouseDown"
          @mouseup="onLowerSpinnerMouseUp"
          @mouseleave="onLowerSpinnerMouseUp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
export default {
  name: "InputNumber",
  components: {
    Spinner,
  },
  props: {
    uniqueLabel: {
      type: String,
      required: true
    },
    eventName: {
      default: "number-change",
    },
    inputName: {
      default: "",
    },
    bgColor: {
      default: "transparent",
    },
    mainColor: {
      default: "#000",
    },
    mainBorderColor: {
      default: "#000",
    },
    activeColor: {
      default: "#f00",
    },
    activeBorderColor: {
      default: "#f00",
    },
    spinnerHoverColor: {
      default: "#f34fff",
    },
    defaultValue: {
      default: 1,
    },
    minValue: {
      default: -1000000000,
    },
    maxValue: {
      default: 1000000000,
    },
    // Style Options
    fullBorder: {
      default: false,
    },
    hideLabel: {
      default: false,
    },
    inputFirst: {
      default: false,
    },
  },
  data() {
    return {
      inputValue: Number,
      docHasFocus: Boolean,
      textColor: "#000",
      borderColor: "#000",
      lastActiveElement: "none",
      blurOnMouseDown: false,
      isUpperSpinnerActive: false,
      isLowerSpinnerActive: false,
      incrementTimeoutRef: Function,
      decrementTimeoutRef: Function,
      incrementIntervalRef: Function,
      decrementIntervalRef: Function,
      numberInput: Object,
    };
  },
  watch: {
    docHasFocus(val) {
      if (!val) {
        this.blurOnMouseDown = true;
      }
    },
    defaultValue(val) {
      this.inputValue = val;
    },
    inputValue(val) {
      this.$emit(this.eventName, val);
    },
    isUpperSpinnerActive(val) {
      if (val) {
        if (this.inputValue < this.maxValue) this.inputValue++;
        this.incrementTimeoutRef = setTimeout(() => {
          this.incrementIntervalRef = setInterval(() => {
            if (this.inputValue < this.maxValue) this.inputValue++;
          }, 125);
        }, 500);
      } else {
        clearTimeout(this.incrementTimeoutRef);
        clearInterval(this.incrementIntervalRef);
      }
    },
    isLowerSpinnerActive(val) {
      if (val) {
        if (this.inputValue > this.minValue) this.inputValue--;
        this.decrementTimeoutRef = setTimeout(() => {
          this.decrementIntervalRef = setInterval(() => {
            if (this.inputValue > this.minValue) this.inputValue--;
          }, 125);
        }, 500);
      } else {
        clearTimeout(this.decrementTimeoutRef);
        clearInterval(this.decrementIntervalRef);
      }
    },
    hideLabel(val) {
      val
        ? this.$refs.numberDiv.classList.add("hide-label")
        : this.$refs.numberDiv.classList.remove("hide-label");
    },
    inputFirst(val) {
      val
        ? this.$refs.numberDiv.classList.add("input-first")
        : this.$refs.numberDiv.classList.remove("input-first");
    },
  },
  computed: {
    filteredValue() {
      var filtered = Math.max(this.minValue, this.inputValue);
      return Math.min(this.maxValue, filtered);
    },

    // Styles

    divStyle() {
      return {
        color: `${this.textColor}`,
        "background-color": `${this.bgColor}`,
        "border-width": `${this.fullBorder ? "calc(0.1vw + 0.2vh)" : "0 calc(0.1vw + 0.2vh)"}`,
        "border-radius": `${this.fullBorder ? "calc(0.5vw + 0.5vh)" : "0"}`,
        "border-color": `${this.borderColor}`,
        "border-style": "solid",
      };
    },
  },
  methods: {
    // Utility Methods

    preventDefaultEvents(e) {
      e = e || window.event;
      e.preventDefault();
    },
    removeSpace(str) {
      str = str.replace(/ /g, "");
      return str;
    },
    colorChanger(color, border) {
      this.textColor = color;
      this.borderColor = border;
    },

    // Event Handlers

    onLabelClick() {
      if (this.lastActiveElement != this.numberInput.id) {
        this.numberInput.focus();
      } else {
        this.numberInput.blur();
      }
    },
    onInputFocus() {
      if (!this.blurOnMouseDown) {
        this.colorChanger(this.activeColor, this.activeBorderColor);
        this.lastActiveElement = this.numberInput.id;
      } else {
        this.numberInput.blur();
        setTimeout(() => {
          this.blurOnMouseDown = false;
        }, 50);
      }
    },
    onInputBlur() {
      if (!this.blurOnMouseDown) {
        this.colorChanger(this.mainColor, this.mainBorderColor);
        this.lastActiveElement = "none";
      }
      if (this.inputValue !== this.filteredValue) this.inputValue = this.filteredValue;
    },
    onInputKeyDown(e) {
      if (e.key == "ArrowUp") {
        this.onUpperSpinnerMouseDown(e);
      }
      if (e.key == "ArrowDown") {
        this.onLowerSpinnerMouseDown(e);
      }
    },
    onInputKeyUp(e) {
      if (e.key == "ArrowUp") {
        this.onUpperSpinnerMouseUp(e);
      }
      if (e.key == "ArrowDown") {
        this.onLowerSpinnerMouseUp(e);
      }
    },
    onUpperSpinnerMouseDown(e) {
      this.preventDefaultEvents(e);
      this.isUpperSpinnerActive = true;
      this.numberInput.focus();
    },
    onUpperSpinnerMouseUp(e) {
      this.preventDefaultEvents(e);
      this.isUpperSpinnerActive = false;
    },
    onLowerSpinnerMouseDown(e) {
      this.preventDefaultEvents(e);
      this.isLowerSpinnerActive = true;
      this.numberInput.focus();
    },
    onLowerSpinnerMouseUp(e) {
      this.preventDefaultEvents(e);
      this.isLowerSpinnerActive = false;
    },
  },

  mounted() {
    this.inputValue = this.defaultValue;
    this.numberInput = document.getElementById(
      this.removeSpace(this.uniqueLabel)
    );
    this.docHasFocus = document.hasFocus();
    this.colorChanger(this.mainColor, this.mainBorderColor);
    this.hideLabel && this.$refs.numberDiv.classList.add("hide-label");
    this.inputFirst && this.$refs.numberDiv.classList.add("input-first");
  },
  updated() {
    this.docHasFocus = document.hasFocus();
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 100%;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  border: 0;
  margin-right: 0.2vh;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input:focus,
input:active {
  outline: none !important;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  appearance: none;
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.number-label-span {
  justify-content: center;
}

.spinner-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

/* Options Classes */

.full-border {
  border-top: 0.4vh solid !important;
  border-bottom: 0.4vh solid !important;
  border-radius: 1vh !important;
}

.hide-label .label-span {
  display: none !important;
}

.hide-label .input-div {
  flex-grow: 1 !important;
}

.input-first {
  flex-direction: row-reverse !important;
}

.input-first .input-div {
  flex-direction: row-reverse !important;
}
</style>