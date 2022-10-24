<template>
  <header class="header">
    <a
      ref="logo"
      href="/"
      class="logo hoverable"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      @mousedown="onMouseDown"
      >EELee</a
    >
    <div class="header-nav">
      <VerticalMenu
        :mainColor="logoMainColor"
        :hoverColor="logoHoverColor"
      />
      <ul class="nav-ul">
        <li>
          <a href="/" class="nav-link hoverable">Home</a>
        </li>
        <li>
          <a href="/portfolio" class="nav-link hoverable"
            >Portfolio</a
          >
        </li>
        <li>
          <a href="/applications" class="nav-link hoverable">App</a>
        </li>
        <li>
          <a href="/donate" class="nav-link hoverable"
            >Donate</a
          >
        </li>
        <li>
          <a href="/order" class="nav-link hoverable"
            >Order Now!</a
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import VerticalMenu from "./components/VerticalMenu.vue";

export default {
  name: "Header",

  components: {
    VerticalMenu,
  },

  props: {
    pageRoute: {
      default: "none" ,
    },
    logoMainColor: {
      default: "#b42857",
    },
    logoHoverColor: {
      default: "#2ec7a6",
    },
    logoActiveColor: {
      default: "#5eecf9",
    },
    navLinkMainColor: {
      default: "#0d8a6f",
    },
    navLinkHoverColor: {
      default: "#fb4a85",
    },
    navLinkActiveColor: {
      default: "#49a8f0",
    },
  },

  methods: {
    // Event Handlers

    onMouseOver($event) {
      if ($event.target.classList.contains("logo"))
        $event.target.style.color = this.logoHoverColor;
      else $event.target.style.color = this.navLinkHoverColor;
    },
    onMouseOut($event) {
      if ($event.target.classList.contains("logo"))
        $event.target.style.color = this.logoMainColor;
      else $event.target.style.color = this.navLinkMainColor;
    },
    onMouseDown($event) {
      if ($event.target.classList.contains("logo"))
        $event.target.style.color = this.logoActiveColor;
      else $event.target.style.color = this.navLinkActiveColor;
    },
  },

  mounted() {
    document.querySelector(".logo").style.color = this.logoMainColor;
    document.querySelectorAll(".nav-link").forEach((el) => {
      if (el.getAttribute("href") == this.pageRoute) el.parentElement.remove();
      else {
        el.style.color = this.navLinkMainColor;
        el.addEventListener("mouseover", this.onMouseOver);
        el.addEventListener("mouseout", this.onMouseOut);
        el.addEventListener("mousedown", this.onMouseDown);
      }
    });
  },
};
</script>

<style>
.header {
  width: 100vw;
  height: 10vh;
  position: fixed;
  margin-bottom: 2vh;
  z-index: 200;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  visibility: hidden;
}

.logo {
  width: fit-content;
  height: fit-content;
  font-family: "Fredericka the Great", cursive;
  font-weight: 1000;
  font-size: calc(3vw + 1vh);
  padding-left: calc(2vw + 2vh);
  padding-right: 2vw;
  text-decoration: none;
}

.header-nav {
  height: fit-content;
  max-height: fit-content;
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
}

.vertical-nav {
  flex-direction: column !important;
  flex-grow: unset !important;
  width: fit-content !important;
  align-self: flex-start !important;
  padding-top: calc(5vh - 2.5vw) !important;
}

.nav-ul {
  height: 100%;
  position: relative;
  margin: 0;
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.nav-ul li {
  width: fit-content;
  height: fit-content;
  margin: auto 0;
  font-size: calc(1.5vw + 1.5vh);
}

.vertical-ul {
  width: calc(100% - 3vw - 3vh) !important;
  height: 60vh !important;
  flex-direction: column !important;
  align-items: flex-end !important;
  align-self: flex-start !important;
}

.vertical-ul * {
  font-size: calc(2.5vw + 2.5vh) !important;
}

.nav-link {
  min-width: fit-content;
  font-family: "Poiret One", cursive;
  font-weight: 1000;
  margin: 1vw 0 1vw 4vw;
  text-decoration: none;
  white-space: nowrap;
}
</style>