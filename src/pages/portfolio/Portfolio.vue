<template>
  <div id="idpp-body" class="body">
    <div class="loading" v-if="!isPageLoaded">
      <FingerprintSpinner />
    </div>
    <Header pageRoute="/portfolio" />
    <section id="idpp-showcase" class="showcase">
      <div
        ref="mainHeader"
        id="idpp-mainHeader"
        class="idpp-faded idpp-section-header"
      >
        <div ref="mainUpper" class="idpp-header-border"></div>
        <div ref="mainText" class="idpp-header-title">About EELee</div>
        <div ref="mainLower" class="idpp-header-border"></div>
      </div>
      <div
        ref="mainPage"
        id="idpp-mainPage"
        class="idpp-faded idpp-section-page"
      >
        <p id="idpp-mainPar" class="idpp-paragraph">
          EELee App Design is a full stack web app development group, mainly
          focused on designing frontend by modern JavaScript frameworks like
          Vue.js
          <br /><br />
          Scroll down to discover more about our work...
        </p>
      </div>

      <div
        ref="homeHeader"
        id="idpp-homeHeader"
        class="idpp-faded idpp-section-header"
      >
        <div ref="homeUpper" class="idpp-header-border"></div>
        <div ref="homeText" class="idpp-header-title">Home&nbsp;Page</div>
        <div ref="homeLower" class="idpp-header-border"></div>
      </div>
      <div
        ref="homePage"
        id="idpp-homePage"
        class="idpp-faded idpp-section-page d-flex"
      >
        <div
          id="idpp-homeFlexColBox"
          class="
            idpp-page-flexbox
            d-flex
            flex-column
            justify-content-between
            align-items-center
          "
        >
          <p id="idpp-homeFirstPar" class="idpp-paragraph flex-grow-1">
            Two distinct responsive home pages for different screen sizes!
          </p>
          <div
            id="idpp-homeImageContainer"
            class="d-flex justify-content-center align-items-center"
          >
            <div id="idpp-homeMdParentDiv" class="">
              <div id="idpp-homeMdDiv" class="idpp-reflection"></div>
            </div>
            <div id="idpp-homeLgParentDiv" class="">
              <div id="idpp-homeLgDiv" class="idpp-reflection"></div>
            </div>
          </div>
          <p id="idpp-homeSecondPar" class="idpp-paragraph flex-grow-1">
            They both have artistic designs along with animated elements. <br />
            Two samples for clients who are interested in this type of user
            interface design...
          </p>
        </div>
      </div>

      <div
        ref="appHeader"
        id="idpp-appHeader"
        class="idpp-faded idpp-section-header"
      >
        <div ref="appUpper" class="idpp-header-border"></div>
        <div ref="appText" class="idpp-header-title">App&nbsp;Sample</div>
        <div ref="appLower" class="idpp-header-border"></div>
      </div>
      <div
        ref="appPage"
        id="idpp-appPage"
        class="idpp-faded idpp-section-page d-flex"
      >
        <div
          id="idpp-appFlexColBox"
          class="
            idpp-page-flexbox
            d-flex
            flex-column
            justify-content-between
            align-items-center
            flex-grow-1
          "
        >
          <div id="idpp-appTxtImgContainer" class="">
            <div id="idpp-appImageContainer" class="">
              <div id="idpp-appImgDiv" class="idpp-reflection"></div>
            </div>
            <p id="idpp-appFirstPar" class="idpp-paragraph">
              This is the classic "Mine Sweeper" game... But, it has a modern
              design and everything is customizable! <br /><br /><br />
              You can change everything from game-specific numbers, to colors
              and fonts of every element, without disturbing the game play...
              <br /><br />
              It's really nice! Give it a try :)
            </p>
          </div>
        </div>
      </div>

      <div
        ref="portHeader"
        id="idpp-portHeader"
        class="idpp-faded idpp-section-header"
      >
        <div ref="portUpper" class="idpp-header-border"></div>
        <div ref="portText" class="idpp-header-title">Portfolio</div>
        <div ref="portLower" class="idpp-header-border"></div>
      </div>
      <div
        ref="portPage"
        id="idpp-portPage"
        class="idpp-faded idpp-section-page d-flex"
      >
        <div
          id="idpp-portFlexColBox"
          class="
            idpp-page-flexbox
            d-flex
            flex-column
            justify-content-between
            align-items-center
            flex-grow-1
          "
        >
          <div id="idpp-portTxtImgContainer" class="">
            <div id="idpp-portImageContainer" class="">
              <div id="idpp-portImgDiv" class="idpp-reflection"></div>
            </div>
            <p id="idpp-portFirstPar" class="idpp-paragraph">
              The current page icludes really cool effects and animations!
              <br /><br />
              The pictures have 3D effects, and the sections have an effect
              called "Lazy Load", which means that every section will be loaded
              as the page is scrolled and riches to that section's area.
              <br /><br />
              You may also notice the complete responsiveness of the page,
              especially in the alignment of the text and images in each
              section, as you resize the window or change the zoom level of it.
            </p>
          </div>
        </div>
      </div>

      <div
        ref="othersHeader"
        id="idpp-othersHeader"
        class="idpp-faded idpp-section-header"
      >
        <div ref="othersUpper" class="idpp-header-border"></div>
        <div ref="othersText" class="idpp-header-title">Other&nbsp;Pages</div>
        <div ref="othersLower" class="idpp-header-border"></div>
      </div>
      <div
        ref="othersPage"
        id="idpp-othersPage"
        class="idpp-faded idpp-section-page d-flex"
      >
        <div
          id="idpp-othersFlexColBox"
          class="
            idpp-page-flexbox
            d-flex
            flex-column
            justify-content-between
            align-items-center
          "
        >
          <p id="idpp-othersFirstPar" class="idpp-paragraph flex-grow-1">
            You can find three other pages on our website...
          </p>
          <div
            id="idpp-othersImageContainer"
            class="d-flex justify-content-center align-items-center"
          >
            <div id="idpp-othersLeftParentDiv" class="">
              <div id="idpp-othersLeftDiv" class="idpp-reflection"></div>
            </div>
            <div id="idpp-othersMiddleParentDiv" class="">
              <div id="idpp-othersMiddleDiv" class="idpp-reflection"></div>
            </div>
            <div id="idpp-othersRightParentDiv" class="">
              <div id="idpp-othersRightDiv" class="idpp-reflection"></div>
            </div>
          </div>
          <p id="idpp-othersSecondPar" class="idpp-paragraph flex-grow-1">
            Contact, Donate and Order pages also have interesting features that
            you might want in your app too. <br />
            There is a cool slideshow for multipage contents. You can also see
            various types of error messages in these pages and select your
            favourite one for your website.<br /><br />
            If there are any other features that you wanna have on your website,
            we are ready to build them for you :)
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import FingerprintSpinner from "@/components/Loading/FingerprintSpinner.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: "Portfolio",
  components: {
    FingerprintSpinner,
    Header,
    Footer,
  },
  data() {
    return {
      // Loading Variables
      isPageLoaded: false,
      loadMain: false,
      loadHome: false,
      loadApp: false,
      loadPort: false,
      loadOthers: false,

      // Element Object Refs
      sectionPage: Object,
    };
  },

  watch: {
    loadMain(val) {
      if (val) {
        this.$refs.mainPage.classList.remove("idpp-faded");
        this.$refs.mainHeader.classList.remove("idpp-faded");
        this.$refs.mainText.classList.add("fade-in-d500");
        this.$refs.mainUpper.classList.add("slide-in-right");
        this.$refs.mainLower.classList.add("slide-in-left");
        this.$refs.mainPage.classList.add("slide-in-up-d1000");
      }
    },
    loadHome(val) {
      if (val) {
        this.$refs.homeHeader.classList.remove("idpp-faded");
        this.$refs.homePage.classList.remove("idpp-faded");
        this.$refs.homeText.classList.add("fade-in-d500");
        this.$refs.homeUpper.classList.add("slide-in-left");
        this.$refs.homeLower.classList.add("slide-in-right");
        this.$refs.homePage.classList.add("slide-in-right-d1000");
      }
    },
    loadApp(val) {
      if (val) {
        this.$refs.appPage.classList.remove("idpp-faded");
        this.$refs.appHeader.classList.remove("idpp-faded");
        this.$refs.appText.classList.add("fade-in-d500");
        this.$refs.appUpper.classList.add("slide-in-right");
        this.$refs.appLower.classList.add("slide-in-left");
        this.$refs.appPage.classList.add("slide-in-left-d1000");
      }
    },
    loadPort(val) {
      if (val) {
        this.$refs.portHeader.classList.remove("idpp-faded");
        this.$refs.portPage.classList.remove("idpp-faded");
        this.$refs.portText.classList.add("fade-in-d500");
        this.$refs.portUpper.classList.add("slide-in-left");
        this.$refs.portLower.classList.add("slide-in-right");
        this.$refs.portPage.classList.add("slide-in-right-d1000");
      }
    },
    loadOthers(val) {
      if (val) {
        this.$refs.othersPage.classList.remove("idpp-faded");
        this.$refs.othersHeader.classList.remove("idpp-faded");
        this.$refs.othersText.classList.add("fade-in-d500");
        this.$refs.othersUpper.classList.add("slide-in-right");
        this.$refs.othersLower.classList.add("slide-in-left");
        this.$refs.othersPage.classList.add("slide-in-left-d1000");
      }
    },
  },

  methods: {
    // Event Handlers

    onPageLoad() {
            if (document.readyState == "complete") {
        this.isPageLoaded = true;
        document.body.parentElement.style.overflowY = "auto";
        document.querySelectorAll(".header, .showcase, .footer").forEach(el => {
          el.style.visibility = "visible";
        });
        setTimeout(() => {
          this.onLoad();
        }, 500);
      }
    },

    onLoad() {
      this.loadMain = true;
      this.onScroll();
    },

    onScroll() {
      if (
        !this.loadHome &&
        (this.$refs.homeHeader.getBoundingClientRect().top <
          window.innerHeight * 0.5 ||
          this.$refs.homePage.getBoundingClientRect().top <
            window.innerHeight - 0.5 * this.$refs.homePage.offsetWidth)
      ) {
        this.loadHome = true;
      }
      if (
        !this.loadApp &&
        (this.$refs.appHeader.getBoundingClientRect().top <
          window.innerHeight * 0.5 ||
          this.$refs.appPage.getBoundingClientRect().top <
            window.innerHeight - 0.5 * this.$refs.appPage.offsetWidth)
      ) {
        this.loadApp = true;
      }
      if (
        !this.loadPort &&
        (this.$refs.portHeader.getBoundingClientRect().top <
          window.innerHeight * 0.5 ||
          this.$refs.portPage.getBoundingClientRect().top <
            window.innerHeight - 0.5 * this.$refs.portPage.offsetWidth)
      ) {
        this.loadPort = true;
      }
      if (
        !this.loadOthers &&
        (this.$refs.othersHeader.getBoundingClientRect().top <
          window.innerHeight * 0.5 ||
          this.$refs.othersPage.getBoundingClientRect().top <
            window.innerHeight - 0.5 * this.$refs.othersPage.offsetWidth)
      ) {
        this.loadOthers = true;
      }
    },
  },

  created() {
    window.addEventListener("resize", this.onScroll);
    window.addEventListener("scroll", this.onScroll);
    document.addEventListener("readystatechange", this.onPageLoad);
  },

  mounted() {
    document.body.parentElement.style.overflowY = "hidden";
    this.sectionPage = document
      .getElementsByClassName("idpp-section-page")
      .item(0);
    document.querySelectorAll(".hoverable").forEach((element) => {
      element.classList.remove("hoverable");
      element.classList.add("pointer-green");
    });
    if (
      navigator.userAgent.indexOf("Firefox") != -1 ||
      navigator.userAgent.indexOf("OPR") != -1
    ) {
      document.querySelector("#idpp-appTxtImgContainer").style.lineHeight =
        "0.86vw";
      document.querySelector("#idpp-portTxtImgContainer").style.lineHeight =
        "0.86vw";
    }
  },

  beforeUnmount() {
    document.body.parentElement.style.overflowY = "auto";
  },
};
</script>

<style scoped>
@import "assets/css/portfolio.css";
</style>