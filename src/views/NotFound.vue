<template>
  <div id="idpn-body" class="body">
    <div class="loading" v-if="!isPageLoaded">
      <FingerprintSpinner />
    </div>
    <Header />
    <section class="showcase">
      <h1>Page Not Found</h1>
    </section>
    <Footer />
  </div>
</template>

<script>
import FingerprintSpinner from "@/components/Loading/FingerprintSpinner.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: "NotFound",
  components: {
    FingerprintSpinner,
    Header,
    Footer,
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
        document
          .querySelectorAll(".header, .showcase, .footer")
          .forEach((el) => {
            el.style.visibility = "visible";
          });
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

<style scoped>
#idpn-body {
  background: #fff;
}

h1 {
  position: relative;
  top: 35vh;
  font-family: "Gluten", cursive;
  font-size: calc(2.5vw + 2.5vh);
  font-weight: 200;
  color: #e60000;
}
</style>