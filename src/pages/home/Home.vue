<template>
  <div id="idph-bodyDiv" class="pointer-white">
    <div class="loading" v-if="!isPageLoaded">
      <OrbitSpinner />
    </div>
    <div id="idph-mainContainer" class="invisible d-flex flex-column">
      <header
        id="idph-header"
        class="d-flex align-items-center"
        @mouseenter="headerMouseEnter"
        @mouseleave="headerMouseLeave"
      >
        <a
          id="idph-logo"
          class="invisible hoverable animate__animated"
          href="/portfolio"
          @mouseenter="logoMouseEnter"
          @mouseleave="logoMouseLeave"
          >EELee</a
        >
        <div id="idph-headerNavbar" class="invisible d-flex align-items-center">
          <a
            id="idph-appNav"
            class="idph-nav-link hoverable animate__animated"
            href="/applications"
          >
            App
          </a>
          <a
            id="idph-portNav"
            class="idph-nav-link hoverable animate__animated"
            href="/portfolio"
          >
            Portfolio
          </a>
          <a
            id="idph-donateNav"
            class="idph-nav-link hoverable animate__animated"
            href="/donate"
          >
            Donate
          </a>
          <a
            id="idph-orderNav"
            class="idph-nav-link hoverable animate__animated"
            href="/order"
          >
            Let's App!
          </a>
        </div>
      </header>

      <section id="idph-showcase" class="showcase">
        <div id="idph-orderDiv" class="animate__animated animate__slower">
          <a
            id="idph-orderLink"
            class="invisible hoverable animate__animated"
            href="/order"
            @mouseenter="orderLinkMouseEnter"
            @mouseleave="orderLinkMouseLeave"
            >Need A Modern Website ???</a
          >
          <span id="idph-orderMessage" class="invisible animate__animated"
            >Click To Get One . . .</span
          >
        </div>

        <div
          id="idph-skipAnimations"
          class="hoverable vibrate-1"
          @mouseenter="onSkipAnimationsMouseEnter"
          @mouseleave="onSkipAnimationsMouseLeave"
          @click="onSkipAnimationsClick"
        >
          Skip Initial Animations >>>
        </div>
      </section>

      <Footer
        :reload="true"
        iconBasicColor="#0072b1"
        iconHoverColor="#f9f9f9"
        noteMainColor="#1369b9"
        noteHoverColor="#f9f9f9"
        :footerClassList="footerClassList"
        :footerNavClassList="footerNavClassList"
        :linkedinClassList="linkedinClassList"
        :emailClassList="emailClassList"
        :telegramClassList="telegramClassList"
        :emitEvents="true"
        @footer-mouse-enter="onFooterMouseEnter"
        @footer-mouse-leave="onFooterMouseLeave"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import OrbitSpinner from "@/components/Loading/OrbitSpinner.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: "Home",

  components: {
    OrbitSpinner,
    Footer,
  },
  data() {
    return {
      isPageLoaded: false,

      //#mainContainer Variables
      mainContainerInitRef: Function,

      //#header Variables
      headerInitRef: Function,
      headerNavsInitRef: Function,
      headerLoopInitIntervalRef: Function,
      headerLoopIntervalRef: Function,
      headerInitWindref: Function,
      logoTimeoutRef: Function,
      appNavTimeoutRef: Function,
      portNavTimeoutRef: Function,
      donateNavTimeoutRef: Function,
      orderNavTimeoutRef: Function,

      //#orderDiv Variables
      orderLinkInitRef: Function,
      linkAnimationList: [
        "animate__shakeX",
        "animate__shakeY",
        "animate__swing",
        "animate__flip",
      ],
      linkAnimationIndex: 0,
      linkIntervalRef: Function,

      //Footer Variables
      footerClassList: "vibrate-1",
      footerNavClassList: "invisible",
      linkedinClassList: "",
      emailClassList: "",
      telegramClassList: "",
      footerNavInitRef: Function,
      footerFirstIntervalRef: Function,
      footerSecondIntervalRef: Function,

      //Elements Object References
      mainContainer: Object,
      headerNavbar: Object,
      logo: Object,
      appNav: Object,
      portNav: Object,
      donateNav: Object,
      orderNav: Object,
      orderDiv: Object,
      skipAnimations: Object,

      //Arrays
      headerNavsList: Array,
      initTimeoutRefsList: Array,
      timeoutRefsList: Array,
      intervalRefsList: Array,
    };
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

    // Creates wind effect on header icons with customizable delays
    windEffect(initialDelay, beforeApp, beforePort, beforeDonate, beforeOrder) {
      this.logoTimeoutRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.logo.classList.toggle("shake-top");
        });

        this.appNavTimeoutRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.appNav.classList.toggle("shake-top");
          });

          this.portNavTimeoutRef = setTimeout(() => {
            requestAnimationFrame(() => {
              this.portNav.classList.toggle("shake-top");
            });

            this.donateNavTimeoutRef = setTimeout(() => {
              requestAnimationFrame(() => {
                this.donateNav.classList.toggle("shake-top");
              });

              this.orderNavTimeoutRef = setTimeout(() => {
                requestAnimationFrame(() => {
                  this.orderNav.classList.toggle("shake-top");
                });
              }, beforeOrder);
            }, beforeDonate);
          }, beforePort);
        }, beforeApp);
      }, initialDelay);
    },

    // Clears wind effect timeouts
    clearWindEffect() {
      clearTimeout(this.logoTimeoutRef);
      clearTimeout(this.orderNavTimeoutRef);
      clearTimeout(this.donateNavTimeoutRef);
      clearTimeout(this.portNavTimeoutRef);
      clearTimeout(this.appNavTimeoutRef);
      clearInterval(this.headerLoopIntervalRef);
      this.headerNavsList.forEach((item) => {
        requestAnimationFrame(() => {
          item.classList.remove("shake-top");
        });
      });
    },

    // Main Functionality

    // Starts initial appearance animations
    startAnimations() {
      this.mainContainerInitAppear();
      this.headerInitAppear();
      this.headerInitWind();
      this.headerAnimationLoop();
      this.orderLinkInitAppear();
      this.footerNavInitAppear();
    },

    // Loads home page with running animation without replaying initial animations,
    // when resizing the window
    showRunningHome() {
      this.timeoutRefsList = [
        this.logoTimeoutRef,
        this.appNavTimeoutRef,
        this.portNavTimeoutRef,
        this.donateNavTimeoutRef,
        this.orderNavTimeoutRef,
      ];
      this.intervalRefsList = [
        this.headerLoopIntervalRef,
        this.headerLoopInitIntervalRef,
        this.linkIntervalRef,
        this.footerFirstIntervalRef,
        this.footerSecondIntervalRef,
      ];
      this.initTimeoutRefsList = [
        this.mainContainerInitRef,
        this.headerInitRef,
        this.headerInitWindref,
        this.headerNavsInitRef,
        this.footerNavInitRef,
        this.orderLinkInitRef,
      ];
      document.querySelectorAll(".invisible").forEach((element) => {
        element.classList.remove("invisible");
      });
      this.timeoutRefsList.forEach((ref) => {
        clearTimeout(ref);
      });
      this.intervalRefsList.forEach((ref) => {
        clearInterval(ref);
      });
      this.initTimeoutRefsList.forEach((ref) => {
        clearTimeout(ref);
      });
      this.headerMouseLeave();
      this.orderLinkMouseLeave();
      this.onFooterMouseLeave();
    },

    // Starts mainContainer animation
    mainContainerInitAppear() {
      this.mainContainerInitRef = setTimeout(() => {
        requestAnimationFrame(() => {
          document.querySelectorAll(".showcase, .footer").forEach((el) => {
            el.style.visibility = "visible";
          });
          this.mainContainer.classList.remove("invisible");
          this.mainContainer.classList.add(
            "d-flex",
            "flex-column",
            "img-focus-in"
          );
        });
      }, 300);
    },

    // Initial Header Animations
    headerInitAppear() {
      this.headerInitRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.logo.classList.remove("invisible");
          this.logo.classList.add("text-focus-in");
        });
        this.headerNavsInitRef = setTimeout(() => {
          requestAnimationFrame(() => {
            for (let i = 1; i < this.headerNavsList.length; i++) {
              this.headerNavbar.classList.remove("invisible");
              this.headerNavsList[i].classList.add("tracking-in-expand");
            }
          });
        }, 3300);
      }, 1500);
    },

    // Sets the first wind effect on header
    headerInitWind() {
      this.headerInitWindref = setTimeout(() => {
        this.headerNavsList.forEach((item) => {
          requestAnimationFrame(() => {
            item.classList.remove(
              "tracking-in-expand",
              "animate__swing",
              "shake-top",
              "text-focus-in"
            );
          });
        });
        this.windEffect(100, 800, 400, 400, 400);
      }, 14500);
    },

    // Header Running Animation Loop
    headerAnimationLoop() {
      this.headerLoopInitIntervalRef = setInterval(() => {
        this.windEffect(1000, 900, 450, 450, 450);
      }, 17000);
    },

    // Initial footerUl Animation
    footerNavInitAppear() {
      this.footerNavInitRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.footerNavClassList = "bounce-in-left";
        });

        this.footerFirstIntervalRef = setInterval(() => {
          requestAnimationFrame(() => {
            this.footerNavClassList = "bounce-out-left";
          });

          this.footerSecondIntervalRef = setTimeout(() => {
            requestAnimationFrame(() => {
              this.footerNavClassList = "bounce-in-left";
            });
          }, 6000);
        }, 32000);
      }, 3000);
    },

    // Initial orderLink Animation
    orderLinkInitAppear() {
      this.orderLinkInitRef = setTimeout(() => {
        requestAnimationFrame(() => {
          this.orderDiv.firstElementChild.classList.remove("invisible");
          this.orderDiv.firstElementChild.classList.add(
            "animate__slower",
            "animate__zoomInUp"
          );
        });

        setTimeout(() => {
          requestAnimationFrame(() => {
            this.skipAnimations.classList.remove("vibrate-1");
            this.skipAnimations.classList.add(
              "tracking-out-contract-bck-bottom"
            );
          });
          setTimeout(() => {
            requestAnimationFrame(() => {
              this.skipAnimations.classList.add("invisible");
            });
          }, 1000);
        }, 3000);

        this.linkIntervalRef = setInterval(() => {
          requestAnimationFrame(() => {
            this.orderDiv.firstElementChild.classList.remove(
              "animate__slower",
              "animate__zoomInUp"
            );
            this.orderDiv.firstElementChild.classList.remove(
              this.linkAnimationList[this.linkAnimationIndex]
            );
            this.linkAnimationIndex = this.nextNumber(
              this.linkAnimationIndex,
              this.linkAnimationList.length,
              false
            );
            this.orderDiv.firstElementChild.classList.add(
              this.linkAnimationList[this.linkAnimationIndex]
            );
          });
        }, 25000);
      }, 7500);
    },

    // Event Handlers

    onPageLoad() {
      if (document.readyState == "complete") {
        this.isPageLoaded = true;
        this.startAnimations();
      }
    },

    onresize() {
      this.mainContainer.style.setProperty("width", `${window.innerWidth}px`);
      this.mainContainer.style.setProperty("height", `${window.innerHeight}px`);
    },

    // Header Section Handlers

    // Stops header animation loop
    headerMouseEnter() {
      clearInterval(this.headerLoopInitIntervalRef);
      this.clearWindEffect();
    },

    // Resets the header animation loop
    headerMouseLeave() {
      this.headerLoopIntervalRef = setInterval(() => {
        this.headerNavsList.forEach((item) => {
          requestAnimationFrame(() => {
            item.classList.remove(
              "tracking-in-expand",
              "animate__swing",
              "shake-top"
            );
          });
        });
        this.windEffect(1000, 1000, 500, 500, 500);
      }, 13000);
    },

    logoMouseEnter() {
      requestAnimationFrame(() => {
        this.logo.classList.remove("animate__swing", "text-focus-in");
        this.logo.classList.add("pulsate-fwd-internal");
      });
    },

    logoMouseLeave() {
      requestAnimationFrame(() => {
        this.logo.classList.remove("pulsate-fwd-internal");
        this.logo.classList.add("animate__swing");
      });
    },

    // Showcase Section Handlers
    // orderDiv Handlers

    orderLinkMouseEnter() {
      clearInterval(this.linkIntervalRef);
      requestAnimationFrame(() => {
        this.orderDiv.firstElementChild.classList.remove(
          this.linkAnimationList[this.linkAnimationIndex],
          "animate__slower",
          "animate__zoomInUp"
        );
        this.orderDiv.firstElementChild.classList.add("scale-up-center");
        this.orderDiv.lastElementChild.classList.remove(
          "invisible",
          "animate__zoomOut"
        );
        this.orderDiv.lastElementChild.classList.add("animate__flash");
      });
    },

    orderLinkMouseLeave() {
      requestAnimationFrame(() => {
        this.orderDiv.firstElementChild.classList.remove("scale-up-center");
        this.orderDiv.firstElementChild.classList.add("scale-down-center");
        this.orderDiv.lastElementChild.classList.remove("animate__flash");
        this.orderDiv.lastElementChild.classList.add("animate__zoomOut");
      });
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.orderDiv.firstElementChild.classList.remove("scale-down-center");
        });
      }, 400);

      this.linkIntervalRef = setInterval(() => {
        requestAnimationFrame(() => {
          this.orderDiv.firstElementChild.classList.remove(
            "animate__slower",
            "animate__zoomInUp"
          );
          this.orderDiv.firstElementChild.classList.remove(
            this.linkAnimationList[this.linkAnimationIndex]
          );
          this.linkAnimationIndex = this.nextNumber(
            this.linkAnimationIndex,
            this.linkAnimationList.length,
            false
          );
          this.orderDiv.firstElementChild.classList.add(
            this.linkAnimationList[this.linkAnimationIndex]
          );
        });
      }, 25000);
    },

    // skipAnimations Handlers

    onSkipAnimationsMouseEnter() {
      requestAnimationFrame(() => {
        this.skipAnimations.classList.remove("vibrate-1", "scale-down-center");
        this.skipAnimations.classList.add("scale-up-center");
      });
    },
    onSkipAnimationsMouseLeave() {
      requestAnimationFrame(() => {
        this.skipAnimations.classList.remove("scale-up-center");
        this.skipAnimations.classList.add("scale-down-center");
      });
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.skipAnimations.classList.remove("scale-down-center");
          this.skipAnimations.classList.add("vibrate-1");
        });
      }, 500);
    },
    onSkipAnimationsClick() {
      this.showRunningHome();
      requestAnimationFrame(() => {
        this.skipAnimations.classList.remove("scale-up-center");
        this.skipAnimations.classList.add("puff-out-hor");
      });
      setTimeout(() => {
        this.skipAnimations.classList.add("invisible");
      }, 1500);
    },

    // Footer Section Handlers

    onFooterMouseEnter(navLink) {
      clearInterval(this.footerFirstIntervalRef);
      clearInterval(this.footerSecondIntervalRef);
      requestAnimationFrame(() => {
        this.footerClassList = "";
        this.footerNavClassList = "";
      });
      if (navLink == "linkedin")
        requestAnimationFrame(() => {
          this.linkedinClassList =
            "pointer-gold animate__animated animate__headShake";
        });
      if (navLink == "email")
        requestAnimationFrame(() => {
          this.emailClassList =
            "pointer-gold animate__animated animate__headShake";
        });
      if (navLink == "telegram")
        requestAnimationFrame(() => {
          this.telegramClassList =
            "pointer-gold animate__animated animate__headShake";
        });
    },
    onFooterMouseLeave(navLink) {
      requestAnimationFrame(() => {
        this.footerClassList = "vibrate-1";
      });
      if (navLink == "linkedin")
        requestAnimationFrame(() => {
          this.linkedinClassList = "pointer-gold";
        });
      if (navLink == "email")
        requestAnimationFrame(() => {
          this.emailClassList = "pointer-gold";
        });
      if (navLink == "telegram")
        requestAnimationFrame(() => {
          this.telegramClassList = "pointer-gold";
        });
      this.footerFirstIntervalRef = setInterval(() => {
        requestAnimationFrame(() => {
          this.footerNavClassList = "bounce-out-left";
        });

        this.footerSecondIntervalRef = setTimeout(() => {
          requestAnimationFrame(() => {
            this.footerNavClassList = "bounce-in-left";
          });
        }, 5000);
      }, 15000);
    },
  },

  created() {
    window.addEventListener("resize", this.onresize);
    document.addEventListener("readystatechange", this.onPageLoad);
  },

  mounted() {
    document.body.parentElement.style.overflowY = "hidden";
    this.mainContainer = document.querySelector("#idph-mainContainer");
    this.mainContainer.style.setProperty("width", `${window.innerWidth}px`);
    this.mainContainer.style.setProperty("height", `${window.innerHeight}px`);
    this.headerNavbar = document.querySelector("#idph-headerNavbar");
    this.logo = document.querySelector("#idph-logo");
    this.appNav = document.querySelector("#idph-appNav");
    this.portNav = document.querySelector("#idph-portNav");
    this.donateNav = document.querySelector("#idph-donateNav");
    this.orderNav = document.querySelector("#idph-orderNav");
    this.orderDiv = document.querySelector("#idph-orderDiv");
    this.skipAnimations = document.querySelector("#idph-skipAnimations");
    this.headerNavsList = [
      this.logo,
      this.appNav,
      this.portNav,
      this.donateNav,
      this.orderNav,
    ];
    document.querySelectorAll(".hoverable").forEach((element) => {
      element.classList.remove("hoverable");
      element.classList.add("pointer-gold");
    });
  },

  beforeUnmount() {
    document.body.parentElement.style.overflowY = "auto";
  },
};
</script>

<style scoped>
@import "assets/css/home.css";
</style>
