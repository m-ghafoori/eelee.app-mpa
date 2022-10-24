<template>
  <footer :class="`footer ${footerClassList}`">
    <div :class="`footer-nav ${footerNavClassList}`">
      <a
        href="https://www.linkedin.com/in/m-ghafoori"
        target="blank"
        :class="`hoverable align-self-${linkedinAlign} ${linkedinClassList}`"
        @mouseenter="onLinkedinMouseEnter"
        @mouseleave="onLinkedinMouseLeave"
      >
        <Linkedin
          :basicColor="linkedinIconColor"
          :gradientColor="iconGradientColor"
          :bgColor="linkedinBgColor"
        />
      </a>
      <a
        href="/contact"
        :class="`hoverable align-self-${emailAlign} ${emailClassList}`"
        @mouseenter="onEmailMouseEnter"
        @mouseleave="onEmailMouseLeave"
      >
        <Email
          :basicColor="emailIconColor"
          :gradientColor="iconGradientColor"
        />
      </a>
      <a
        href="https://t.me"
        target="blank"
        :class="`hoverable align-self-${telegramAlign} ${telegramClassList}`"
        @mouseenter="onTelegramMouseEnter"
        @mouseleave="onTelegramMouseLeave"
      >
        <Telegram
          :basicColor="telegramIconColor"
          :gradientColor="iconGradientColor"
        />
      </a>
    </div>
    <a
      href="/portfolio"
      title="About Us"
      :class="`footer-note hoverable ${noteClassList}`"
      @mouseenter="onNoteMouseEnter"
      @mouseleave="onNoteMouseLeave"
      >&copy; 2022 - EELee App Design</a
    >
  </footer>
</template>

<script>
import Linkedin from "./components/Linkedin.vue";
import Email from "./components/Email.vue";
import Telegram from "./components/Telegram.vue";

export default {
  name: "Footer",
  components: {
    Linkedin,
    Email,
    Telegram,
  },
  props: {
        reload: {
      default: false ,
    },
    iconBasicColor: {
      default: "#0d8a6f",
    },
    iconGradientColor: {
      default: "unset",
    },
    iconHoverColor: {
      default: "#fb4a85",
    },
    linkedinBgMainColor: {
      default: "transparent",
    },
    linkedinBgHoverColor: {
      default: "transparent",
    },
    flexDirection: {
      default: "row",
    },
    linkedinAlign: {
      default: "center",
    },
    emailAlign: {
      default: "center",
    },
    telegramAlign: {
      default: "center",
    },
    footerClassList: {
      default: "",
    },
    footerNavClassList: {
      default: "",
    },
    linkedinClassList: {
      default: "",
    },
    emailClassList: {
      default: "",
    },
    telegramClassList: {
      default: "",
    },
    noteClassList: {
      default: "",
    },
    noteMainColor: {
      default: "#d8215e",
    },
    noteHoverColor: {
      default: "#2ec7a6",
    },
    emitEvents: {
      default: false,
    },
  },

  data() {
    return {
      isMounted: false,
      windowWidth: Number,
      windowHeight: Number,
      linkedinIconColor: String,
      linkedinBgColor: String,
      emailIconColor: String,
      telegramIconColor: String,
      html: Object,
      footer: Object,
      footerNav: Object,
      footerNote: Object,
    };
  },

  watch: {
    wideHome() {
      if (this.reload && this.isMounted) window.location.reload();
    },
  },

  computed: {
    wideHome() {
      return (
        this.windowWidth / this.windowHeight > 1
      );
    },
  },

  methods: {
    // Event Handlers

    onresize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      if (this.isMounted) {
        if (this.windowHeight / this.windowWidth < 0.38) {
          this.footer.classList.add("d-none");
        } else this.footer.classList.remove("d-none");
      }
    },
    onLinkedinMouseEnter() {
      if (this.emitEvents) this.$emit("footer-mouse-enter", "linkedin");
      this.linkedinIconColor = this.iconHoverColor;
      this.linkedinBgColor = this.linkedinBgHoverColor;
    },
    onLinkedinMouseLeave() {
      if (this.emitEvents) this.$emit("footer-mouse-leave", "linkedin");
      this.linkedinIconColor = this.iconBasicColor;
      this.linkedinBgColor = this.linkedinBgMainColor;
    },
    onEmailMouseEnter() {
      if (this.emitEvents) this.$emit("footer-mouse-enter", "email");
      this.emailIconColor = this.iconHoverColor;
    },
    onEmailMouseLeave() {
      if (this.emitEvents) this.$emit("footer-mouse-leave", "email");
      this.emailIconColor = this.iconBasicColor;
    },
    onTelegramMouseEnter() {
      if (this.emitEvents) this.$emit("footer-mouse-enter", "telegram");
      this.telegramIconColor = this.iconHoverColor;
    },
    onTelegramMouseLeave() {
      if (this.emitEvents) this.$emit("footer-mouse-leave", "telegram");
      this.telegramIconColor = this.iconBasicColor;
    },
    onNoteMouseEnter() {
      this.footerNote.style.color = this.noteHoverColor;
    },
    onNoteMouseLeave() {
      this.footerNote.style.color = this.noteMainColor;
    },
  },

  created() {
    window.addEventListener("resize", this.onresize);
  },

  beforeMount() {
    this.onresize();
  },
  mounted() {
    this.html = document.body.parentElement;
    this.footer = document.querySelector(".footer");
    this.footerNav = document.querySelector(".footer-nav");
    this.footerNote = document.querySelector(".footer-note");
    this.footerNav.style.flexDirection = `${this.flexDirection}`;
    if (this.wideHome) {
      this.footer.style.width = "40%";
      this.footerNote.style.fontSize = "1.7vw";
    }
    this.footerNote.style.color = this.noteMainColor;
    this.linkedinIconColor = this.iconBasicColor;
    this.linkedinBgColor = this.linkedinBgMainColor;
    this.emailIconColor = this.iconBasicColor;
    this.telegramIconColor = this.iconBasicColor;
    this.isMounted = true;
    this.onresize();
  },
  emits: ["footer-mouse-enter", "footer-mouse-leave"],
};
</script>

<style>
.footer {
  width: calc(30vw + 10vh);
  height: calc(5vw + 11vh);
  position: absolute;
  bottom: 0;
  align-self: center;
  padding-bottom: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  visibility: hidden;
}

.footer-nav {
  width: 100%;
  height: 60%;
  margin-bottom: 1vh;
  display: flex;
  justify-content: space-between;
}

.footer-note {
  width: fit-content;
  text-decoration: none;
  font-family: "Gluten", cursive;
  font-size: calc(1.2vw + 1.2vh);
  white-space: nowrap;
  padding-top: calc(0.3vw + 1.8vh);
}
</style>