<template>
  <div id="idpo-body" class="body" @click="onresize">
    <div class="loading" v-if="!isPageLoaded">
      <FingerprintSpinner />
    </div>
    <Header pageRoute="/order" />
    <section
      ref="showcase"
      id="idpo-showcase"
      class="showcase align-items-start"
    >
      <Slideshow
        uniqueLabel="Agreement"
        :slidesNumber="9"
        :loopMode="false"
        :isFinished="isFormSubmitted"
        @slideshow-finish="onSlideshowFinish"
      >
        <template #title1>
          <span>How to Order</span>
        </template>
        <template #content1>
          <span>
            First, you fill our form and tell us what you want... <br />
            Then, we contact you within 2 days... <br />
            If everything was okay, then we have a deal! <br />
          </span>
        </template>
        <template #title2>
          <span>Agreement Template</span>
        </template>
        <template #content2>
          <span>
            Our agreement consist of six sections:<br />
            1- Introducing the client and the project manager <br />
            2- A description of the client's request <br />
            3- Project manager's comments on the client's request <br />
            4- The detailed process of the project, including the timeline and
            payment dues <br />
            5- Legal terms and conditions <br />
            6- Signatures of both parties<br />
            Keep reading to know more about these sections...
          </span>
        </template>
        <template #title3>
          <span>Introduction</span>
        </template>
        <template #content3>
          <span>
            Nothing complicated... Just the names of the two "parties" of the
            agreement, the client and the project manager :)
          </span>
        </template>
        <template #title4>
          <span>Client's Request</span>
        </template>
        <template #content4>
          <span>
            Here you describe your request in details...<br />
            Of course, your ideas will be safe and they will not be disclosed
            anywhere.
          </span>
        </template>
        <template #title5>
          <span>Manager's Comments</span>
        </template>
        <template #content5>
          <span>
            After you tell us your idea, we create a template for the project
            and divide it into "stages".<br />
            For small projects, usually it is two stages, the backend and the
            frontend. But as the project gets sophisticated, the stages will
            increase too.<br />
            Additionally, we may have also some comments on the idea itself,
            like some projections or suggestions.
          </span>
        </template>
        <template #title6>
          <span>Project Process</span>
        </template>
        <template #content6>
          <span>
            In this section, we will agree on the detailed process of project
            completion.<br />
            Every stage should have specific due time and payment to preserve
            everyone's interest.
          </span>
        </template>
        <template #title7>
          <span>Terms and Conditions</span>
        </template>
        <template #content7>
          <span>
            Every agreement must have some terms to determine the commitments of
            every party.<br />
            Both parties want to make sure that they're ideas are safe, and what
            happens if something goes wrong in the process, or even how they can
            cencel the agreement if they changed their mind!<br />
            All of these possible situations should be forseened in this
            section.
          </span>
        </template>
        <template #title8>
          <span>Signatures</span>
        </template>
        <template #content8>
          <span>
            Finally, everyone should sign the agreement, right? :) <br />
            Now, if you want to see a sample agreement, click
            <a href="">here</a>. <br />
            And if you want to take the first step of ordering your own web app,
            please proceed to the next slide...
          </span>
        </template>
        <template #title9>
          <span>Order Your Web App</span>
        </template>
        <template #content9>
          <div>
            Now, before signing any agreement, please tell us how we can help
            you...
          </div>
          <div class="idpo-input-field">
            <span ref="clientRequestLabel">Please describe your idea:</span>
            <textarea
              ref="clientRequestInput"
              id="idpo-clientRequest"
              cols="90"
              rows="10"
              spellcheck="false"
              v-model="clientRequest"
              @click="onClientRequestClick"
              required
            ></textarea>
          </div>
          <div class="idpo-input-field">
            <span ref="projectDurationLabel"
              >How long can you wait (in weeks) to receive it?</span
            >
            <InputNumber
              uniqueLabel="Weeks"
              bgColor="#feeb7d"
              mainColor="#d8215e"
              mainBorderColor="#079536"
              activeColor="#056926"
              activeBorderColor="#d8215e"
              :defaultValue="projectDuration"
              :minValue="1"
              :maxValue="200"
              :fullBorder="true"
              :hideLabel="true"
              eventName="duration-change"
              @duration-change="onDurationChange"
            />
          </div>
          <div class="idpo-input-field">
            <span ref="projectBudgetLabel"
              >Your Budget (in USD) on This Project:</span
            >
            <InputNumber
              uniqueLabel="$"
              bgColor="#feeb7d"
              mainColor="#d8215e"
              mainBorderColor="#079536"
              activeColor="#056926"
              activeBorderColor="#d8215e"
              :defaultValue="projectBudget"
              :minValue="1000"
              :maxValue="10000000"
              :fullBorder="true"
              :hideLabel="true"
              eventName="budget-change"
              @budget-change="onBudgetChange"
            />
          </div>
          <div class="idpo-input-field">
            <span ref="clientEmailLabel">Your Email:</span>
            <input
              type="email"
              ref="clientEmailInput"
              id="idpo-clientEmail"
              spellcheck="false"
              v-model="clientEmail"
              @click="onClientEmailClick"
              required
            />
          </div>
        </template>
        <template #finish>
          <span>Submit</span>
        </template>
        <template #inactive>
          <span
            >Thank you for submitting your information&nbsp;:) <br /><br />
            We'll be in touch with you soon</span
          >
        </template>
      </Slideshow>
    </section>
    <Footer />
  </div>
</template>

<script>
import FingerprintSpinner from "@/components/Loading/FingerprintSpinner.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import Slideshow from "@/components/Slideshow/Slideshow.vue";
import InputNumber from "@/components/Inputs/InputNumber.vue";

export default {
  name: "Order",

  components: {
    FingerprintSpinner,
    Header,
    Footer,
    Slideshow,
    InputNumber,
  },

  data() {
    return {
      windowWidth: Number,
      isPageLoaded: false,
      clientRequest: "",
      clientEmail: "",
      projectBudget: 4000,
      projectDuration: 4,

      // Error Handling Vars
      noRequestError: false,
      noEmailError: false,
      invalidEmailError: false,
      isFormSubmitted: false,
    };
  },

  watch: {
    noRequestError(val) {
      if (val) {
        this.$refs.clientRequestLabel.classList.add("idpo-input-field-error");
        this.$refs.clientRequestLabel.innerHTML = "Error: Message is required.";
        this.$refs.clientRequestInput.classList.add("idpo-input-error");
        this.$refs.clientRequestInput.parentElement.style.borderColor = "#f00";
      } else {
        this.$refs.clientRequestLabel.classList.remove(
          "idpo-input-field-error"
        );
        this.$refs.clientRequestLabel.innerHTML = "Please describe your idea:";
        this.$refs.clientRequestInput.classList.remove("idpo-input-error");
        this.$refs.clientRequestInput.parentElement.style.borderColor =
          "#daa520";
      }
    },
    noEmailError(val) {
      if (val) {
        this.$refs.clientEmailLabel.classList.add("idpo-input-field-error");
        this.$refs.clientEmailLabel.innerHTML = "Error: Email is required.";
        this.$refs.clientEmailInput.classList.add("idpo-input-error");
        this.$refs.clientEmailInput.parentElement.style.borderColor = "#f00";
      } else {
        this.$refs.clientEmailLabel.classList.remove("idpo-input-field-error");
        this.$refs.clientEmailLabel.innerHTML = "Your Email:";
        this.$refs.clientEmailInput.classList.remove("idpo-input-error");
        this.$refs.clientEmailInput.parentElement.style.borderColor = "#daa520";
      }
    },
    invalidEmailError(val) {
      if (val) {
        this.$refs.clientEmailLabel.classList.add("idpo-input-field-error");
        this.$refs.clientEmailLabel.innerHTML = `Error: "${this.clientEmail}" is not a valid email.`;
        this.$refs.clientEmailInput.classList.add("idpo-input-error");
        this.$refs.clientEmailInput.parentElement.style.borderColor = "#f00";
      } else {
        this.$refs.clientEmailLabel.classList.remove("idpo-input-field-error");
        this.$refs.clientEmailLabel.innerHTML = "Your Email:";
        this.$refs.clientEmailInput.classList.remove("idpo-input-error");
        this.$refs.clientEmailInput.parentElement.style.borderColor = "#daa520";
      }
    },
  },

  methods: {
    // Event Handlers

    onPageLoad() {
      if (document.readyState == "complete") {
        this.isPageLoaded = true;
        document.querySelectorAll(".header, .showcase, .footer").forEach(el => {
          el.style.visibility = "visible";
        });
      }
    },

    onresize() {
      if (window.innerWidth / window.innerHeight <= 1) {
        document.querySelectorAll(".idpo-input-field").forEach((element) => {
          element.classList.add("flex-column", "align-items-start");
        });
        if (document.querySelector("#idpo-clientEmail"))
          document.querySelector("#idpo-clientEmail").style.width = "90%";
        if (
          document.querySelector(".slideshow-next").offsetWidth >
          this.$refs.showcase.offsetWidth
        )
          this.$refs.showcase.style.width = `${
            document.querySelector(".slideshow-next").offsetWidth
          }px`;
        if (
          document.querySelector(".slideshow-previous").offsetWidth >
          this.$refs.showcase.offsetWidth
        )
          this.$refs.showcase.style.width = `${
            document.querySelector(".slideshow-previous").offsetWidth
          }px`;
      } else {
        document.querySelectorAll(".idpo-input-field").forEach((element) => {
          element.classList.remove("flex-column", "align-items-start");
        });
        if (document.querySelector("#idpo-clientEmail"))
          document.querySelector("#idpo-clientEmail").style.width = "60%";
      }
    },

    // Order Form
    onClientRequestClick() {
      this.noRequestError = false;
    },
    onClientEmailClick() {
      this.noEmailError = false;
      this.invalidEmailError = false;
    },
    onDurationChange(val) {
      this.projectDuration = val;
    },
    onBudgetChange(val) {
      this.projectBudget = val;
    },
    onSlideshowFinish() {
      if (this.clientRequest == "") this.noRequestError = true;
      if (this.clientEmail == "") this.noEmailError = true;
      if (!this.$refs.clientEmailInput.validity.valid && !this.noEmailError)
        this.invalidEmailError = true;
      if (
        !this.noRequestError &&
        !this.noEmailError &&
        !this.invalidEmailError
      ) {
        var formData = new FormData();
        formData.append("request", this.clientRequest);
        formData.append("duration", this.projectDuration);
        formData.append("budget", this.projectBudget);
        formData.append("email", this.clientEmail);
        for (const entry of formData.entries()) {
          console.log(entry);
        }
        this.isFormSubmitted = true;
      }
    },
  },

  created() {
    window.addEventListener("resize", this.onresize);
    document.addEventListener("readystatechange", this.onPageLoad)
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
@import "assets/css/order.css";
</style>
