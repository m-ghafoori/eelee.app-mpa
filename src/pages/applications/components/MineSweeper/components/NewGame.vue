<template>
  <button class="new-game hoverable" @click="onclick">
    {{ label }}
  </button>
</template>

<script>
import startNewGame from "../assets/js/tableGenerator";

export default {
  name: "NewGame",
  props: {
    label: String,
    rowsNum: Number,
    colsNum: Number,
    minesNum: Number,
  },
  data() {
    return {
      newCellsArray: Array,
      minesNumber: Number,
    };
  },
  methods: {
    onclick() {
      try {
        this.newCellsArray = startNewGame(
          this.rowsNum,
          this.colsNum,
          this.minesNum
        );
        this.minesNumber = this.minesNum;
      } catch (error) {
        console.log(error);
      }
      this.$emit("new-game", this.newCellsArray, this.minesNumber);
    },
  },
};
</script>

<style scoped>
button {
  background: orange;
  border: 0.1vw solid orange;
  border-radius: 50%;
  font-family: inherit;
  font-size: calc(1vw + 1.5vh);
  padding: 1vw 2vw;
  margin: 2vh 0;
}

button:active {
  color: #f34fff;
}
</style>