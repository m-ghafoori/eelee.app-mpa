<template>
  <div id="idpa-body" class="body">
    <div class="loading" v-if="!isPageLoaded">
      <FingerprintSpinner />
    </div>
    <Header
      pageRoute="/applications"
      logoHoverColor="#ff711f"
      logoActiveColor="#ff1ff0"
      navLinkActiveColor="#ff1ff0"
    />
    <section id="idpa-showcase" class="showcase">
      <MineSweeper />
    </section>
    <Footer noteHoverColor="#ff711f" />
  </div>
</template>

<script>
import FingerprintSpinner from "@/components/Loading/FingerprintSpinner.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import MineSweeper from "./components/MineSweeper/MineSweeper.vue";

export default {
  name: "AppLications",
  components: {
    FingerprintSpinner,
    Header,
    Footer,
    MineSweeper,
  },

  data() {
    return {
      isPageLoaded: false,
    };
  },

  methods: {
    // Event Handlers

    onPageLoad() {
      if (document.readyState == "complete") {
        this.isPageLoaded = true;
        document.body.parentElement.style.overflowY = "auto";
        document
          .querySelectorAll(".header, .showcase, .footer")
          .forEach((el) => {
            el.style.visibility = "visible";
          });
        setTimeout(() => {
          this.onLoad();
        }, 2000);
      }
    },
  },

  created() {
    document.addEventListener("readystatechange", this.onPageLoad);
  },

  mounted() {
    document.querySelectorAll(".hoverable").forEach((element) => {
      element.classList.remove("hoverable");
      element.classList.add("pointer-green");
    });
  },
};
</script>

<style>
@import "./assets/css/applications.css";
</style>
