<template>
  <span ref="menuButton" class="menu-button d-none">
    <svg
      ref="menuImg"
      id="menuImg"
      class="menu-img hoverable"
      @click="onMenuButtonClick"
      @mouseenter="onMenuImgMouseEnter"
      @mouseleave="onMenuImgMouseLeave"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 25 25"
      style="enable-background: new 0 0 25 25; width: 5vw; height: 5vw"
      xml:space="preserve"
    >
      <g class="menu-img">
        <path
          class="menu-img"
          :fill="imgColor"
          d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
		c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
		c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
        />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  name: "VerticalMenu",

  props: {
    switchingAspectRatio: {
      default: 1,
    },
    mainColor: String,
    hoverColor: String,
  },

  data() {
    return {
      windowWidth: Number,
      windowHeight: Number,
      imgColor: "#b42857",
      isMenuExpanded: false,
      isMounted: false,
      bodyDiv: Object,
      header: Object,
      logo: Object,
      headerNav: Object,
      navUl: Object,
      showcase: Object,
    };
  },

  watch: {
    showVerticalMenu(val) {
      setTimeout(() => {
        this.headerNavDisplay();
      }, 30);
      if (!val) this.isMenuExpanded = false;
    },

    isMenuExpanded(val) {
      if (val) {
        this.imgColor = this.hoverColor;
        this.headerNav.style.maxHeight = "unset";
        this.navUl.classList.remove("d-none", "scale-down-ver-top");
        this.navUl.classList.add("scale-up-ver-top");
        this.showcase.style.opacity = "0.1";
      } else {
        this.navUl.classList.remove("scale-up-ver-top");
        this.navUl.classList.add("scale-down-ver-top");
        this.showcase.style.opacity = "1";
        this.imgColor = this.mainColor;
        this.headerNav.style.maxHeight = "5vw";
      }
    },
  },

  computed: {
    showVerticalMenu() {
      return this.windowWidth / this.windowHeight <= this.switchingAspectRatio;
    },
  },

  methods: {
    // Triggers window width on resize
    onresize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },

    // Determines how header navbar should be displayed
    headerNavDisplay() {
      if (this.isMounted) {
        this.headerNav.style.maxHeight = "fit-content";
        if (this.showVerticalMenu) {
          this.headerNav.classList.add("vertical-nav");
          this.navUl.classList.add("vertical-ul");
          if (!this.isMenuExpanded) this.navUl.classList.add("d-none");
          this.$refs.menuButton.classList.remove("d-none");
        } else {
          this.headerNav.classList.remove("vertical-nav");
          this.navUl.classList.remove(
            "d-none",
            "scale-down-ver-top",
            "vertical-ul"
          );
          this.$refs.menuButton.classList.add("d-none");
          this.imgColor = this.mainColor;
        }
      }
    },

    // Event Handlers

    onBodyDivClick($event) {
      if (this.isMenuExpanded) {
        if (
          !$event.target.classList.contains("nav-link") &&
          !$event.target.classList.contains("menu-img")
        ) {
          this.isMenuExpanded = false;
        }
      }
    },
    onMenuButtonClick() {
      this.isMenuExpanded = !this.isMenuExpanded;
    },
    onMenuImgMouseEnter() {
      this.imgColor = this.hoverColor;
    },
    onMenuImgMouseLeave() {
      if (!this.isMenuExpanded) this.imgColor = this.mainColor;
    },
  },

  created() {
    window.addEventListener("resize", this.onresize);
  },

  beforeMount() {
    this.onresize();
  },

  mounted() {
    this.imgColor = this.mainColor;
    this.logo = document.querySelector(".logo");
    this.bodyDiv = document.querySelector(".body");
    this.header = document.querySelector(".header");
    this.headerNav = document.querySelector(".header-nav");
    this.navUl = document.querySelector(".nav-ul");
    this.showcase = document.querySelector(".showcase");
    this.bodyDiv.addEventListener("click", this.onBodyDivClick);
    this.isMounted = true;
    this.headerNavDisplay();
    this.onresize();
  },
};
</script>

<style>
.menu-button {
  width: 5vw;
  height: 10vw;
  display: flex;
  align-items: flex-start;
  margin: auto calc(3vw + 3vh) auto 0;
  align-self: flex-end;
}
</style>