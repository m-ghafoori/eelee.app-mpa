<template>
  <div class="input-wrapper hoverable" @mouseleave="onDivMouseLeave">
    <span
      :id="`${removeSpace(uniqueLabel)}LabelSpan`"
      class="label-span font-label-span"
      :style="labelStyle"
      @mousedown="preventDefaultEvents"
      @click="onLabelClick"
      >{{ uniqueLabel }}</span
    >
    <InputSelect
      :uniqueLabel="uniqueLabel"
      :dataListArray="fontsArray"
      :zIndex="selectZIndex"
      :updatorNum="selectUpdator"
      @selected-changed="onSelectedChanged"
      @selected-focused="onSelectFocus"
      @selected-blured="onSelectBlur"
    />
  </div>
</template>

<script>
import InputSelect from "@/components/Inputs/InputSelect.vue";

export default {
  name: "InputFont",
  components: {
    InputSelect,
  },
  props: {
    uniqueLabel: {
      type: String,
      required: true
    },
    eventName: {
      default: "font-change"
    },
    selectZIndex: {
      default: 100
    },
    selectUpdator: {
      default: 0
    },
  },
  data() {
    return {
      labelSpan: Object,
      selectInput: Object,
      labelColor: "black",
      labelBorderColor: "black",
      lastActiveElement: "none",
      fontsArray: ["Baloo", "Gluten", "Josefin Slab"],
    };
  },
  computed: {
    // Styles

    labelStyle() {
      return {
        outline: "none",
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
    onDivMouseLeave() {
      setTimeout(() => {
        this.selectInput.blur();
      }, 300);
    },
    onLabelClick() {
      if (this.lastActiveElement == this.selectInput.id) {
        this.selectInput.blur();
      } else {
        this.selectInput.focus();
      }
    },
    onSelectedChanged(val) {
      this.$emit(this.eventName, val);
    },
    onSelectFocus() {
      this.labelColor = "red";
      this.labelBorderColor = "red";
      console.log("focus", this.lastActiveElement, this.selectInput.id);
      this.lastActiveElement = this.selectInput.id;
      console.log(`last active set to: ${this.lastActiveElement}`);
    },
    onSelectBlur() {
      this.labelColor = "black";
      this.labelBorderColor = "black";
      console.log("blur", this.lastActiveElement, this.selectInput.id);
      this.lastActiveElement = "none";
      console.log(`last active set to: ${this.lastActiveElement}`);
    },
  },
  mounted() {
    this.labelSpan = document.getElementById(
      `${this.removeSpace(this.uniqueLabel)}LabelSpan`
    );
    this.selectInput = document.getElementById(
      `selected${this.removeSpace(this.uniqueLabel)}`
    );
  },
};
</script>

<style scoped>
div,
span {
  background: transparent;
}

.font-label-span {
  padding-left: 1vh;
  justify-content: flex-start;
}

.input-select {
  position: absolute;
  height: 100%;
}
</style>