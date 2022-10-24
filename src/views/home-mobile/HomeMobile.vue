<template>
  <div id="idpm-body" class="pointer-gold" @click="skipInitAnimations">
    <div class="loading" v-if="!isPageLoaded">
      <BreedingRhombusSpinner />
    </div>
    <div
      ref="mainContainer"
      id="idpm-mainContainer"
      class="d-flex flex-column justify-content-start"
    >
      <div ref="bodyCover" id="idpm-bodyCover"></div>
      <header
        id="idpm-header"
        class="d-flex justify-content-center footer-shadow"
      >
        <div ref="headerCover" id="idpm-headerCover"></div>
        <span ref="logoLeft" id="idpm-logoLeft" class="invisible">ee</span>
        <span ref="logoMoon" id="idpm-logoMoon" class="invisible">f </span>
        <span ref="logoRight" id="idpm-logoRight" class="invisible">ee</span>
      </header>

      <section
        id="idpm-showcase"
        class="d-flex flex-column justify-content-start align-items-center"
      >
        <div ref="orderDiv" id="idpm-orderDiv" class="invisible">
          <a href="/order" title="Click to Order" class="hoverable">
            Need A Web App ???
          </a>
        </div>

        <div
          id="idpm-centralDiv"
          class="d-flex justify-content-between align-items-start"
        >
          <div class="d-flex flex-column justify-content-between">
            <div
              ref="navbar"
              id="idpm-navbar"
              class="invisible d-flex flex-column justify-content-end"
            >
              <a
                id="idpm-portNav"
                title="App Sample"
                href="/applications"
                class="idpm-nav-link footer-shadow hoverable"
                >App</a
              >
              <a
                id="idpm-appNav"
                title="Portfolio"
                href="/portfolio"
                class="idpm-nav-link footer-shadow hoverable"
                >Portfolio</a
              >
            </div>
            <span v-show="isPageLoaded" id="idpm-skipAnimations" class=""
              ><span>Tap on screen<br />To skip animations</span></span
            >
          </div>

          <div id="idpm-donateDiv" class="invisible">
            <a
              href="/donate"
              id="idpm-donateLink"
              class="hoverable d-flex justify-content-center"
            >
              <DonationStone />
            </a>
          </div>

          <div class="d-flex flex-column justify-content-between">
            <div
              id="idpm-orderCentral"
              class="d-flex justify-content-around align-items-center"
            >
              <a
                ref="orderRight"
                id="idpm-orderRight"
                title="Order Now!"
                href="/order"
                class="footer-shadow hoverable align-self-start"
              >
                <span
                  ref="orderRightTop"
                  id="idpm-orderRightTop"
                  class="invisible"
                  >Click to <br
                /></span>
                <span
                  ref="orderRightStar"
                  id="idpm-orderRightStar"
                  class="invisible"
                  >c</span
                >
                <span
                  ref="orderRightBottom"
                  id="idpm-orderRightBottom"
                  class="invisible"
                  >RDER</span
                >
              </a>
            </div>
            <a
              id="idpm-footerNote"
              href="/portfolio"
              title="About Us"
              class="hoverable"
              >&copy; 2022 - EELee App Design</a
            >
          </div>
        </div>
      </section>

      <Footer
        :reload="true"
        iconBasicColor="#f00"
        iconGradientColor="#ffe56f"
        iconHoverColor="#ffe56f"
        linkedinBgMainColor="#f00"
        noteClassList="d-none"
        flexDirection="row-reverse"
        telegramAlign="end"
        emailAlign="start"
        linkedinAlign="end"
        :linkedinClassList="linkedinClassList"
        :emailClassList="emailClassList"
        :telegramClassList="telegramClassList"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BreedingRhombusSpinner from "@/components/Loading/BreedingRhombusSpinner.vue";
import Footer from "@/components/Footer/Footer.vue";
import DonationStone from "./components/DonationStone.vue";

export default {
  name: "HomeMobile",

  components: {
    BreedingRhombusSpinner,
    Footer,
    DonationStone,
  },

  data() {
    return {
      readyStateCounter: 1,
      linkedinClassList: "invisible footer-shadow pointer-white",
      emailClassList: "invisible footer-shadow pointer-white",
      telegramClassList: "invisible footer-shadow pointer-white",
      isPageLoaded: false,
      areAnimationsOver: false,

      // Timeout References
      cloudMoveRef: Function,
      logoLeftRef: Function,
      logoMoonRef: Function,
      logoRightRef: Function,
      bodyCoverFirstRef: Function,
      bodyCoverSecondRef: Function,
      donateFirstRef: Function,
      donateSecondRef: Function,
      orderDivFirstRef: Function,
      orderDivSecondRef: Function,
      orderRightStarRef: Function,
      orderRightTextRef: Function,
      navbarRef: Function,
      linkedinNavRef: Function,
      emailNavRef: Function,
      telegramNavRef: Function,

      // Element Object References
      mainContainer: Object,
      donateLink: Object,
      skipAnimations: Object,
      footer: Object,

      // Arrays
      initVisibleElemsList: Array,
      timeoutRefsList: Array,
    };
  },

  watch: {
    areAnimationsOver(val) {
      if (val) {
        this.donateDiv.classList.remove("wc-both");
        requestAnimationFrame(() => {
          this.skipAnimations.classList.add("fade-skip");
        });
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.skipAnimations.classList.add("invisible");
          });
        }, 2000);
        document.querySelectorAll(".footer-appear").forEach((element) => {
          requestAnimationFrame(() => {
            element.classList.remove("footer-appear");
            element.classList.add("footer-shadow");
          });
        });
      }
    },
  },

  methods: {
    // Utility Methods

    // Returns the next number within the given range starting from zero or one
    // i.e. for the range 5, it is 1-5 or 0-4
    nextNumber(num, range, fromOne) {
      var diffNum = (num + 1) % range;
      if (fromOne) {
        if (diffNum == 0) {
          diffNum = range;
        }
      }
      return diffNum;
    },

    onresize() {
      requestAnimationFrame(() => {
        this.mainContainer.style.setProperty("width", `${window.innerWidth}px`);
        this.mainContainer.style.setProperty(
          "height",
          `${window.innerHeight}px`
        );
      });
    },

    // Main Functionality

    // Starts initial appearance animations
    startAnimations() {
      this.headerCloudMove();
      this.logoInitAppear();
      this.bodyCoverFade();
      this.donateDivInitBounce();
      this.orderDivInitAppear();
      this.footerInitAppear();
      this.navbarInitAppear();
      this.orderRightInitAppear();
    },

    // Skips initial animations and shows running home page
    skipInitAnimations() {
      if (this.isPageLoaded && !this.areAnimationsOver) {
        this.timeoutRefsList = [
          this.cloudMoveRef,
          this.logoLeftRef,
          this.logoMoonRef,
          this.logoRightRef,
          this.bodyCoverFirstRef,
          this.bodyCoverSecondRef,
          this.donateFirstRef,
          this.donateSecondRef,
          this.orderDivFirstRef,
          this.orderDivSecondRef,
          this.orderRightStarRef,
          this.orderRightTextRef,
          this.navbarRef,
          this.linkedinNavRef,
          this.emailNavRef,
          this.telegramNavRef,
        ];
        this.timeoutRefsList.forEach((ref) => {
          clearTimeout(ref);
        });
        document.querySelectorAll(".invisible").forEach((element) => {
          requestAnimationFrame(() => {
            element.classList.remove("invisible");
          });
        });
        this.initVisibleElemsList.forEach((element) => {
          requestAnimationFrame(() => {
            element.classList.add("invisible");
          });
        });
        requestAnimationFrame(() => {
          this.footer.style.visibility = "visible";
          this.$refs.orderDiv.classList.remove("order-central-appear");
          this.$refs.orderDiv.classList.add("order-central-shine");
        });
        this.areAnimationsOver = true;
      }
    },

    // Initial Header Cloud Move Effect
    headerCloudMove() {
      requestAnimationFrame(() => {
        this.footer.style.visibility = "visible";
        this.$refs.headerCover.classList.add("cloud-move");
      });
      this.cloudMoveRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.$refs.headerCover.classList.add("d-none");
        });
      }, 10000);
    },

    // Initial Logo Appearance
    logoInitAppear() {
      this.logoLeftRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.$refs.logoLeft.classList.remove("invisible");
          this.$refs.logoLeft.classList.add("star-appear");
        });
        this.logoMoonRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.$refs.logoMoon.classList.remove("invisible");
            this.$refs.logoMoon.classList.add("star-appear");
          });
          this.logoRightRef = setTimeout(() => {
            requestAnimationFrame(() => {
              this.$refs.logoRight.classList.remove("invisible");
              this.$refs.logoRight.classList.add("star-appear");
            });
          }, 1000);
        }, 1000);
      }, 500);
    },

    // Initial bodyCover Fade Effect
    bodyCoverFade() {
      this.bodyCoverFirstRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.$refs.bodyCover.classList.add("fade-cover");
        });
        this.bodyCoverSecondRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.$refs.bodyCover.classList.add("d-none");
          });
        }, 6000);
      }, 4000);
    },

    // Initial donateLink Bounce
    donateDivInitBounce() {
      this.donateFirstRef = setTimeout(() => {
        this.donateDiv.classList.add("wc-both");
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.donateDiv.classList.remove("invisible");
            this.donateDiv.classList.add("donate-bounce-out");
            this.donateSecondRef = setTimeout(() => {
              requestAnimationFrame(() => {
                this.donateDiv.classList.remove("donate-bounce-out");
                this.donateDiv.classList.add("donate-bounce-in");
              });
            }, 1500);
          });
        }, 2000);
      }, 7000);
    },

    // Initial orderDiv Appearance
    orderDivInitAppear() {
      this.orderDivFirstRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.$refs.orderDiv.classList.remove("invisible");
          this.$refs.orderDiv.classList.add("order-central-appear");
        });
        this.orderDivSecondRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.$refs.orderDiv.classList.remove("order-central-appear");
            this.$refs.orderDiv.classList.add("order-central-shine");
          });
        }, 4000);
      }, 5500);
    },

    // Initial orderRight Appearance
    orderRightInitAppear() {
      this.orderRightStarRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.$refs.orderRightStar.classList.remove("invisible");
          this.$refs.orderRightStar.classList.add("star-appear");
        });
        this.orderRightTextRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.$refs.orderRightTop.classList.remove("invisible");
            this.$refs.orderRightBottom.classList.remove("invisible");
            this.$refs.orderRightTop.classList.add("star-appear");
            this.$refs.orderRightBottom.classList.add("star-appear");
          });
        }, 2500);
      }, 12500);
    },

    // Initial Footer Appearance
    footerInitAppear() {
      this.emailNavRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.emailClassList = "footer-appear pointer-white";
        });
        this.telegramNavRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.telegramClassList = "footer-appear pointer-white";
          });
          this.linkedinNavRef = setTimeout(() => {
            requestAnimationFrame(() => {
              this.linkedinClassList = "footer-appear pointer-white";
            });
          }, 500);
        }, 500);
      }, 6000);
    },

    // Initial navbar Appearance
    navbarInitAppear() {
      this.navbarRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.$refs.navbar.classList.remove("invisible");
          this.$refs.navbar.classList.add("star-appear");
        });
        this.areAnimationsOver = true;
      }, 16500);
    },

    // Event Handlers

    onPageLoad() {
      this.isPageLoaded = true;
      this.startAnimations();
    },
  },

  created() {
    window.addEventListener("resize", this.onresize);
    document.addEventListener("readystatechange", this.onPageLoad);
  },

  mounted() {
    this.mainContainer = document.querySelector("#idpm-mainContainer");
    this.mainContainer.style.setProperty("width", `${window.innerWidth}px`);
    this.mainContainer.style.setProperty("height", `${window.innerHeight}px`);
    this.donateDiv = document.querySelector("#idpm-donateDiv");
    this.skipAnimations = document.querySelector("#idpm-skipAnimations");
    this.footer = document.querySelector(".footer");
    this.initVisibleElemsList = [
      this.$refs.bodyCover,
      this.$refs.headerCover,
      this.skipAnimations,
    ];
    document.querySelectorAll(".hoverable").forEach((element) => {
      element.classList.remove("hoverable");
      element.classList.add("pointer-white");
    });
  },
};
</script>

<style scoped>
@import "assets/css/home-mobile.css";
</style>
