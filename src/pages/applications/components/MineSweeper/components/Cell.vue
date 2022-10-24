<template>
  <div
    class="cell prevent-select"
    :style="cellStyle"
    @click="leftClickEmitter(this.info, e)"
    @contextmenu="rightClickEmitter(this.info, e)"
    @mousedown="preventMouseEvent(e)"
    @mouseenter="preventMouseEvent(e)"
  >
    <span :style="spanStyle">{{ cellLabel }}</span>
  </div>
</template>
<script>
export default {
  name: "Cell",
  props: {
    cell: {},
    defCol: String,
    revCol: String,
    markCol: String,
    bombCol: String,
    minesNumCol: {
      default: "#944a04",
    },
  },
  data() {
    return {
      info: {},
    };
  },
  computed: {
    cellLabel: function () {
      if (!this.info.isMine) {
        if (this.info.minesAround != 0) return `${this.info.minesAround}`;
        else return " ";
      } else return "X";
    },
    visibState: function () {
      var visState = "hidden";
      if (this.info.isRevealed) visState = "visible";
      return visState;
    },
    bgColor: function () {
      var bColor = this.defCol;
      if (this.info.isRevealed) {
        if (this.info.isMine) {
          bColor = this.bombCol;
        } else bColor = this.revCol;
      } else if (this.info.isMarked) bColor = this.markCol;
      return bColor;
    },
    cellStyle: function () {
      return {
        "background-image": `linear-gradient(to bottom right, #fffcf2, ${this.bgColor})`,
      };
    },
    spanStyle: function () {
      return {
        visibility: `${this.visibState}`,
        color: this.minesNumCol,
        "font-weight": "bold",
        "font-size": `2vw`,
      };
    },
  },
  created() {
    this.info = this.cell;
  },

  methods: {
    rightClickEmitter(data, e) {
      e = e || window.event;
      e.preventDefault();
      this.$emit("right-click", data);
    },
    leftClickEmitter(data, e) {
      e = e || window.event;
      e.preventDefault();
      this.$emit("left-click", data);
    },
    preventMouseEvent(e) {
      e = e || window.event;
      e.preventDefault();
    },
  },
};
</script>

<style>
.cell {
  width: calc(1.8vw + 1.8vh);
  height: calc(1.8vw + 1.8vh);
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin: 0.1vw;
  border-radius: 13%;
}
</style>