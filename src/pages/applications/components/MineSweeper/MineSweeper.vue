<template>
  <div class="d-flex flex-column align-items-center">
    <section ref="infoSection" class="info animated-bg">
      <span class="counter"
        >Mines Number :&nbsp;<span class="digital">{{
          minesCounter
        }}</span></span
      >
      <Timer
        class="timer"
        :isRunning="isGameRunning"
        :isresetNeeded="resetTimer"
      />
      <span class="counter"
        >{{ marksCounterLabel }}&nbsp;<span class="digital">{{
          marksCounter
        }}</span></span
      >
    </section>
    <hr />
    <section ref="gameSection" class="game d-flex justify-content-between">
      <div id="accountDiv"></div>
      <div id="tableDiv" @contextmenu="preventDefaultEvents">
        <tbody class="hoverable">
          <tr v-for="rowObj in cellsRowFormatArray" :key="rowObj.id">
            <td v-for="obj in rowObj.row" :key="obj.uniqueKey">
              <Cell
                :cell="obj"
                :defCol="defaultColor"
                :revCol="revealedColor"
                :markCol="markedColor"
                :bombCol="bombColor"
                :minesNumCol="minesNumberColor"
                @left-click="onLeftClick"
                @right-click="onRightClick"
              />
            </td>
          </tr>
        </tbody>
      </div>
      <div id="recordDiv"></div>
    </section>

    <NewGame
      label="New Game"
      :rowsNum="rows"
      :colsNum="cols"
      :minesNum="mines"
      @new-game="onNewGame"
    />
    <hr />

    <section ref="settingsSection" class="settings">
      <div id="numberSettings" class="settings-div">
        <NumberIcon />
        <ul id="numberSettingsList" class="settings-list">
          <li>
            <InputNumber
              uniqueLabel="Rows"
              :defaultValue="rows"
              :minValue="1"
              :maxValue="50"
              eventName="rows-change"
              @rows-change="onRowsChange"
            />
          </li>
          <li>
            <InputNumber
              uniqueLabel="Columns"
              :defaultValue="cols"
              :minValue="1"
              :maxValue="20"
              eventName="cols-change"
              @cols-change="onColsChange"
            />
          </li>
          <li>
            <InputNumber
              uniqueLabel="Mines"
              :defaultValue="mines"
              :minValue="minimumMines"
              :maxValue="maximumMines"
              eventName="mines-change"
              @mines-change="onMinesChange"
            />
          </li>
        </ul>
      </div>

      <div id="colorSettings" class="settings-div">
        <ColorIcon />
        <ul id="colorSettingsList" class="settings-list">
          <li>
            <InputColor
              uniqueLabel="Default"
              :defaultValue="defaultColor"
              eventName="def-color-change"
              @def-color-change="onDefColorChange"
            />
          </li>
          <li>
            <InputColor
              uniqueLabel="Revealed"
              :defaultValue="revealedColor"
              eventName="rev-color-change"
              @rev-color-change="onRevColorChange"
            />
          </li>
          <li>
            <InputColor
              uniqueLabel="Marked"
              :defaultValue="markedColor"
              eventName="mark-color-change"
              @mark-color-change="onMarkColorChange"
            />
          </li>
          <li>
            <InputColor
              uniqueLabel="X-Lost"
              :defaultValue="bombLostColor"
              eventName="bomb-lost-color-change"
              @bomb-lost-color-change="onBombLostColorChange"
            />
          </li>
          <li>
            <InputColor
              uniqueLabel="X-Won"
              :defaultValue="bombWonColor"
              eventName="bomb-won-color-change"
              @bomb-won-color-change="onBombWonColorChange"
            />
          </li>
          <li>
            <InputColor
              uniqueLabel="Numbers"
              :defaultValue="minesNumberColor"
              eventName="mines-number-color-change"
              @mines-number-color-change="onMinesNumberColorChange"
            />
          </li>
        </ul>
      </div>

      <div id="fontSettings" class="settings-div">
        <FontIcon />
        <ul id="fontSettingsList" class="settings-list">
          <li>
            <InputFont
              uniqueLabel="Info"
              :selectZIndex="100"
              :selectUpdator="selectElementsUpdator"
              eventName="info-font-change"
              @info-font-change="onInfoFontChange"
            />
          </li>
          <li>
            <InputFont
              uniqueLabel="Table"
              :selectZIndex="99"
              :selectUpdator="selectElementsUpdator"
              eventName="table-font-change"
              @table-font-change="onTableFontChange"
            />
          </li>
          <li>
            <InputFont
              uniqueLabel="Settings"
              :selectZIndex="98"
              :selectUpdator="selectElementsUpdator"
              eventName="settings-font-change"
              @settings-font-change="onSettingsFontChange"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Cell from "./components/Cell.vue";
import NewGame from "./components/NewGame.vue";
import InputFont from "@/components/Inputs/InputFont.vue";
import InputNumber from "@/components/Inputs/InputNumber.vue";
import InputColor from "@/components/Inputs/InputColor.vue";
import FontIcon from "@/components/SettingsIcons/FontIcon.vue";
import NumberIcon from "@/components/SettingsIcons/NumberIcon.vue";
import ColorIcon from "@/components/SettingsIcons/ColorIcon.vue";
import Timer from "@/components/Timer.vue";
import startNewGame from "./assets/js/tableGenerator";

export default {
  name: "MineSweeper",
  components: {
    Cell,
    InputNumber,
    InputColor,
    InputFont,
    FontIcon,
    NumberIcon,
    ColorIcon,
    Timer,
    NewGame,
  },
  data() {
    return {
      cellsRowFormatArray: Array,
      minesCounter: Number,
      rows: 10,
      cols: 10,
      mines: 20,
      cellSize: 25,
      selectElementsUpdator: 0,
      defaultColor: "#ff7f50",
      revealedColor: "#9acd32",
      markedColor: "#914d03",
      bombLostColor: "#ff0000",
      bombWonColor: "#00ffff",
      minesNumberColor: "#944a04",
      isGameRunning: false,
      isGameOver: false,
      resetTimer: false,
      tableDiv: Object,
      timer: Object,
    };
  },
  watch: {
    rows() {
      this.mines = this.minimumMines;
    },
    cols() {
      this.mines = this.minimumMines;
    },
    isGameRunning(val) {
      val && this.timer.classList.add("running");
    },
  },
  computed: {
    didPlayerWin() {
      var logArray = [0];
      this.cellsRowFormatArray.forEach((rowObj) => {
        rowObj.row.forEach((cell) => {
          if (!cell.isRevealed && !cell.isMine) {
            logArray.push(1);
          }
        });
      });
      var logResult = this.sumArrayElements(logArray);
      return logResult == 0;
    },
    bombColor() {
      return this.didPlayerWin ? this.bombWonColor : this.bombLostColor;
    },
    marksCounter() {
      var counter = 0;
      this.cellsRowFormatArray.forEach((rowObj) => {
        rowObj.row.forEach((cell) => {
          cell.isMarked && counter++;
        });
      });
      return counter;
    },
    maximumMines() {
      return this.rows * this.cols - 1;
    },
    minimumMines() {
      return Math.ceil(this.maximumMines / 5);
    },
    marksCounterLabel() {
      return !this.isGameOver ? "Marked Cells :" : "Wrong Marks :";
    },
  },
  methods: {
    // Utility Methods

    preventDefaultEvents(e) {
      e = e || window.event;
      e.preventDefault();
    },

    sumArrayElements(array) {
      var reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      var sum = array.reduce(reducer);
      return sum;
    },
    checkArraysEquality(first, second) {
      var duplicationFounderArray = [0];
      var logSum = 0;
      var loopRange = Math.max(first.length, second.length);
      for (let i = 0; i < loopRange; i++) {
        first[i] != second[i]
          ? duplicationFounderArray.push(1)
          : duplicationFounderArray.push(0);
      }

      logSum = this.sumArrayElements(duplicationFounderArray);
      return logSum == 0;
    },

    // Main Functionality

    toggleMarker(cell) {
      cell.isRevealed ? {} : (cell.isMarked = !cell.isMarked);
    },
    findMines(clickedCell) {
      if (clickedCell.isRevealed) {
      } else {
        if (clickedCell.isMarked) {
        } else {
          clickedCell.isRevealed = true;
          if (clickedCell.isMine) {
            this.gameOver();
            console.log("game over");
          } else {
            clickedCell.visibState = "visible";
            if (this.didPlayerWin) {
              console.log(`You Won !!!`);
              this.gameOver();
            } else if (clickedCell.minesAround == 0) {
              clickedCell.neighborCells.forEach((neighbor) => {
                this.cellsRowFormatArray.forEach((rowObj) => {
                  rowObj.row.forEach((cell) => {
                    if (this.checkArraysEquality(neighbor, cell.address)) {
                      this.findMines(cell);
                    }
                  });
                });
              });
            }
          }
        }
      }
    },
    gameOver() {
      this.cellsRowFormatArray.forEach((rowObj) => {
        rowObj.row.forEach((cell) => {
          if (cell.isMine) {
            cell.isMarked = false;
            cell.isRevealed = true;
            cell.visibState = "visible";
          }
        });
      });
      this.isGameRunning = false;
      this.isGameOver = true;
      this.timer.classList.remove("running");
      this.didPlayerWin
        ? this.timer.classList.add("won")
        : this.timer.classList.add("lost");
    },

    // Event Handlers

    onresize() {
      if (window.innerWidth / window.innerHeight > 1.5)
        this.$refs.infoSection.classList.remove("flex-column");
      else this.$refs.infoSection.classList.add("flex-column");
      if (window.innerWidth / window.innerHeight > 1) {
        document.querySelectorAll(".settings-div").forEach((element) => {
          element.style.width = "30%";
        });
        this.$refs.settingsSection.classList.remove(
          "flex-column",
          "align-items-center"
        );
      } else {
        document.querySelectorAll(".settings-div").forEach((element) => {
          element.style.width = "50%";
        });
        this.$refs.settingsSection.classList.add(
          "flex-column",
          "align-items-center"
        );
      }
    },
    onLeftClick(data) {
      if (!this.isGameOver) {
        if (!this.isGameRunning) {
          this.resetTimer = false;
          this.isGameRunning = true;
        }
        this.findMines(data);
      }
    },
    onRightClick(data) {
      !this.isGameOver && this.toggleMarker(data);
    },
    onNewGame(array, minesN) {
      this.resetTimer = true;
      this.isGameOver = false;
      this.isGameRunning = false;
      this.cellsRowFormatArray = array;
      this.minesCounter = minesN;
      this.timer.classList.remove("running", "won", "lost");
    },
    onRowsChange(data) {
      this.rows = data;
    },
    onColsChange(data) {
      this.cols = data;
    },
    onMinesChange(data) {
      this.mines = data;
    },
    onDefColorChange(color) {
      this.defaultColor = `${color}`;
    },
    onRevColorChange(color) {
      this.revealedColor = `${color}`;
    },
    onMarkColorChange(color) {
      this.markedColor = `${color}`;
    },
    onBombLostColorChange(color) {
      this.bombLostColor = `${color}`;
    },
    onBombWonColorChange(color) {
      this.bombWonColor = `${color}`;
    },
    onMinesNumberColorChange(color) {
      this.minesNumberColor = `${color}`;
    },
    onInfoFontChange(font) {
      this.$refs.infoSection.style.fontFamily = font;
      this.selectElementsUpdator++;
    },
    onTableFontChange(font) {
      this.$refs.gameSection.style.fontFamily = font;
      document.querySelector(".new-game").style.fontFamily = font;
      this.selectElementsUpdator++;
    },
    onSettingsFontChange(font) {
      this.$refs.settingsSection.style.fontFamily = font;
      this.selectElementsUpdator++;
    },
  },
  created() {
    window.addEventListener("resize", this.onresize);
    try {
      this.cellsRowFormatArray = startNewGame(this.rows, this.cols, this.mines);
      this.minesCounter = this.mines;
    } catch (error) {
      console.log(error.message);
    }
  },
  mounted() {
    this.tableDiv = document.querySelector("#tableDiv");
    this.timer = document.querySelector(".timer");
    this.onresize();
  },
};
</script>

<style scoped>
td {
  padding: 0.1vw;
}

hr {
  width: 100%;
  border: 0;
  border-top: 0.2vw solid #fff;
  margin: 1vw;
}

/* Classes */

.info {
  width: 56%;
  padding: 0.25% 2%;
  margin: auto;
  border-radius: 1.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings {
  width: 80vw;
  height: fit-content;
  font-size: calc(1.2vw + 1.2vh);
  display: flex;
  justify-content: space-around;
}

.settings-div {
  margin: 2vh 1vw 0 1vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.settings-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-top: 2vh;
}

.settings-list li {
  width: 100%;
  height: calc(2.5vw + 2.5vh);
  margin-bottom: calc(0.8vw + 0.8vh);
}

.settings-list li:nth-of-type(1) .input-wrapper {
  border-top: calc(0.1vw + 0.2vh) solid !important;
}

.settings-list li:nth-last-of-type(1) .input-wrapper {
  border-bottom: calc(0.1vw + 0.2vh) solid !important;
}

/* ID Tags */

#accountDiv,
#recordDiv {
  width: 10vw;
}

#tableDiv {
  margin: 2vw;
  font-family: inherit;
}
</style>
