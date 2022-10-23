<template>
  <div>
    <span class="counter"
      >Time :&nbsp;<span class="digital">{{ elapsedSeconds }}</span></span
    >
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    isRunning: Boolean,
    isresetNeeded: Boolean,
  },
  data() {
    return {
      elapsedSeconds: 0,
      intervalReference: Function,
    };
  },
  watch: {
    isRunning(val) {
      if (val) this.startTimer();
      else this.stopTimer();
    },
    isresetNeeded(val) {
      if (val) this.resetTimer();
    },
  },
  methods: {
    elapsedTime() {
      this.elapsedSeconds++;
    },
    startTimer() {
      this.intervalReference = setInterval(this.elapsedTime, 1000);
    },
    stopTimer() {
      clearInterval(this.intervalReference);
    },
    resetTimer() {
      if (this.isRunning) this.stopTimer();
      this.elapsedSeconds = 0;
    },
  },
};
</script>