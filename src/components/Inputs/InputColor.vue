<template>
  <div class="input-wrapper hoverable">
    <span
      class="label-span color-label-span"
      :style="labelStyle"
      @mousedown="preventDefaultEvents"
      @click="onLabelClick"
      >{{ uniqueLabel }}</span
    >
    <div class="input-div align-items-center">
      <input
        :id="removeSpace(uniqueLabel)"
        class="input hoverable"
        v-model="inputValue"
        :placeholder="placeHolder"
        type="color"
        @mousedown="preventDefaultEvents"
        @click="onInputClick"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputColor",
  props: {
    uniqueLabel: {
      type: String,
      required: true
    },
    eventName: {
      default: "color-change"
    },
    defaultValue: {
      default: "#000"
    },
  },
  data() {
    return {
      inputValue: String,
      placeHolder: String,
      labelColor: "#000",
      labelBorderColor: "#000",
      lastActiveElement: "none",
      docHasFocus: Boolean,
      blurOnMouseDown: false,
      colorInput: Object,
    };
  },
  watch: {
    docHasFocus(val) {
      if (!val) {
        this.blurOnMouseDown = true;
        console.log("watcher called on blurOnMouseDown:", this.blurOnMouseDown);
      }
    },
    inputValue(val) {
      this.$emit(this.eventName, val);
    },
  },
  computed: {
    // Styles

    labelStyle() {
      return {
        color: `${this.labelColor}`,
        "border-color": `${this.labelBorderColor}`,
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

    // Event Handlers

    onLabelClick() {
      if (this.lastActiveElement != this.colorInput.id) {
        this.colorInput.click();
      } else {
        this.colorInput.blur();
      }
    },
    onInputClick(e) {
      if (this.lastActiveElement != this.colorInput.id) {
        this.colorInput.focus();
      } else {
        this.preventDefaultEvents(e);
        this.colorInput.blur();
      }
    },
    onInputFocus() {
      if (!this.blurOnMouseDown) {
        this.labelColor = "#f00";
        this.labelBorderColor = "#f00";
        this.colorInput.parentElement.style.borderColor = "#f00";
        console.log("focus", this.lastActiveElement, this.colorInput.id);
        this.lastActiveElement = this.colorInput.id;
        console.log(`last active set to: ${this.lastActiveElement}`);
      } else {
        this.colorInput.blur();
        setTimeout(() => {
          this.blurOnMouseDown = false;
        }, 50);
      }
    },
    onInputBlur() {
      if (!this.blurOnMouseDown) {
        this.labelColor = "#000";
        this.labelBorderColor = "#000";
        this.colorInput.parentElement.style.borderColor = "#000";
        console.log("blur", this.lastActiveElement, this.colorInput.id);
        this.lastActiveElement = "none";
        console.log(`last active set to: ${this.lastActiveElement}`);
      }
    },
  },
  created() {
    this.inputValue = this.defaultValue;
    this.placeHolder = this.inputValue;
  },
  mounted() {
    this.colorInput = document.getElementById(this.removeSpace(this.uniqueLabel));
    this.docHasFocus = document.hasFocus();
  },
  updated() {
    this.docHasFocus = document.hasFocus();
  },
};
</script>

<style scoped>
div,
span,
input {
  background: transparent;
  min-width: fit-content;
}

input {
  width: 40%;
  height: 80%;
  margin-right: 0.5vw;
}

input:focus,
input:active {
  outline: none !important;
  border-color: red;
  box-shadow: 0 0 0;
}

input[type="color"] {
  appearance: none;
  -webkit-appearance: none;
  border: none;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  border: none;
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
}

.color-label-span {
  justify-content: center;
}
</style>