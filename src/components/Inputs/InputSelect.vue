<template>
  <div class="input-div flex-column">
    <span
      :id="`selected${removeSpace(uniqueLabel)}`"
      class="select-selected-span"
      tabindex="0"
      @mousedown="preventDefaultEvents"
      @click="onSelectedSpanClick"
      @focus="onSelectedSpanFocus"
      @blur="onSelectedSpanBlur"
      ><span
        :id="`selected${removeSpace(uniqueLabel)}Option`"
        class="select-selected-option"
        >{{ selectedText }}</span
      >
      <Spinner :isActive="isExpanded" :isRotated="isExpanded" />
    </span>
    <ul
      :id="`${removeSpace(uniqueLabel)}DataUl`"
      class="invisible d-flex flex-column scale-down-ver-top"
      :style="dataUlStyle"
    >
      <li
        v-for="item in dataListArray"
        :key="item.index"
        :id="`${removeSpace(uniqueLabel)}${removeSpace(item)}`"
        :style="{ 'border-color': dataUlBorderColor }"
        @mousedown="preventDefaultEvents"
        @click="onDataItemClick(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "InputSelect",
  components: {
    Spinner,
  },
  props: {
    uniqueLabel: {
      type: String,
      required: true
    },
    dataListArray: Array,
    zIndex: Number,
    updatorNum: Number,
  },
  data() {
    return {
      selectedValue: String,
      selectedText: "Select",
      dataUlBorderColor: "#000",
      isExpanded: false,
      lastActiveElement: "none",
      docHasFocus: Boolean,
      blurOnMouseDown: false,
      selectedSpan: Object,
      selectedOption: Object,
      dataUl: Object,
    };
  },
  watch: {
    selectedValue(val) {
      this.$emit("selected-changed", val);
    },
    updatorNum() {
      this.selectedText = this.selectedValue;
    },
    docHasFocus(val) {
      if (!val) {
        this.blurOnMouseDown = true;
        console.log("watcher called on blurOnMouseDown:", this.blurOnMouseDown);
      }
    },
  },
  computed: {
    dataUlStyle() {
      return {
        "border-color": this.dataUlBorderColor,
        "z-index": this.zIndex,
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
    selectedTextUpdator() {
      if (
        this.selectedOption.offsetWidth / this.selectedSpan.offsetWidth >
        0.7
      ) {
        this.selectedText = `${this.selectedText.substr(
          0,
          this.selectedText.length - 4
        )}...`;
      }
    },
    // Event Handlers

    onresize() {
      this.selectedText = this.selectedValue;
      this.selectedTextUpdator();
    },
    onSelectedSpanClick() {
      if (this.lastActiveElement == this.selectedSpan.id) {
        console.log(
          `onSelectSpanClick: lastActive: ${this.lastActiveElement}, this id:${this.selectedSpan.id}`
        );
        this.selectedSpan.blur();
      } else {
        console.log(
          `onSelectSpanClick: lastActive: ${this.lastActiveElement}, this id:${this.selectedSpan.id}`
        );
        this.selectedSpan.focus();
      }
    },
    onDataItemClick(item) {
      this.selectedValue = item.toString();
      this.selectedText = this.selectedValue;
    },
    onSelectedSpanFocus() {
      if (!this.blurOnMouseDown) {
        this.isExpanded = true;
        this.selectedSpan.style.color = "#f00";
        this.selectedSpan.parentElement.style.borderColor = "#f00";
        this.lastActiveElement = this.selectedSpan.id;
        // First we should check to collapse any other input list that is already expanded
        if (document.querySelector(".select-open")) {
          document
            .querySelector(".select-open")
            .classList.remove("scale-up-ver-top");
          document
            .querySelector(".select-open")
            .classList.add("scale-down-ver-top");
          document
            .querySelector(".select-open")
            .classList.remove("select-open");
        }
        // Now we expand the current input list
        this.dataUlBorderColor = "#f00";
        this.dataUl.classList.remove("invisible", "scale-down-ver-top");
        this.dataUl.classList.add("scale-up-ver-top");
        this.dataUl.classList.add("select-open");
        this.$emit("selected-focused");
      } else {
        this.selectedSpan.blur();
        setTimeout(() => {
          this.blurOnMouseDown = false;
        }, 50);
      }
    },
    onSelectedSpanBlur() {
      if (!this.blurOnMouseDown) {
        this.isExpanded = false;
        this.selectedSpan.style.color = "#000";
        this.selectedSpan.parentElement.style.borderColor = "#000";
        this.lastActiveElement = "none";
        // Collapse the current input list
        this.dataUlBorderColor = "#000";
        this.dataUl.classList.remove("scale-up-ver-top");
        this.dataUl.classList.add("scale-down-ver-top");
        this.dataUl.classList.remove("select-open");
        this.$emit("selected-blured");
      }
    },
  },
  mounted() {
    this.selectedSpan = document.getElementById(
      `selected${this.removeSpace(this.uniqueLabel)}`
    );
    this.selectedOption = document.getElementById(
      `selected${this.removeSpace(this.uniqueLabel)}Option`
    );
    this.dataUl = document.getElementById(
      `${this.removeSpace(this.uniqueLabel)}DataUl`
    );
    this.selectedValue = this.dataListArray[0];
    this.selectedText = this.selectedValue;
    this.docHasFocus = document.hasFocus();
  },
  created() {
    window.addEventListener("resize", this.onresize);
  },
  updated() {
    this.selectedTextUpdator();
    this.docHasFocus = document.hasFocus();
  },
  emits: ["selected-changed", "selected-focused", "selected-blured"],
};
</script>

<style scoped>
.select-selected-span {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  background: transparent;
  outline: none;
  padding: 0.3vw 0.3vw 0.3vw 0.6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-selected-option {
  white-space: nowrap;
}

ul {
  width: 50%;
  position: absolute;
  top: 100%;
  border: 0.2vw solid;
  border-top: 0;
  border-bottom: 0;
  border-radius: 0 0 1vw 1vw;
  background: repeating-linear-gradient(
    to bottom right,
    rgb(255, 202, 230) 48%,
    #d4ffff 68%,
    rgb(255, 202, 230) 88%
  );
}

span {
  padding: 2%;
}

li {
  width: 100% !important;
  height: fit-content !important;
  margin: 0.5vw 0 0 0 !important;
  border-bottom: 0.1vw solid red;
  padding: 2%;
  overflow-wrap: break-word;
}

li:nth-last-of-type(1) {
  border-bottom: 0;
}

li:hover {
  color: red;
}
</style>