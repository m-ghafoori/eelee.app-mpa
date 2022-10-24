<template>
  <div id="idpc-body" class="body">
    <div class="loading" v-if="!isPageLoaded">
      <FingerprintSpinner />
    </div>
    <Header pageRoute="/contact" />
    <section id="idpc-showcase" class="showcase align-items-start">
      <div id="idpc-messagereceived" class="d-none">
        Thanks! <br /><br /><br />
        Your message has been received. <br /><br /><br />
        We will contact you in two days :)
      </div>
      <div id="idpc-contactForm" class="d-flex flex-column align-items-start">
        <p id="idpc-contactPar">
          You can fill the form below or email us to
          <a
            id="idpc-contactEmail"
            href="mailto:manager@eelee.app"
            class="hoverable"
            >"manager@eelee.app"</a
          >
        </p>
        <div class="idpc-clientInfo">
          <span>Name:</span>
          <input
            ref="clientNameInput"
            type="text"
            v-model="clientName"
            spellcheck="false"
            @click="onClientNameClick"
          />
        </div>
        <div class="idpc-clientInfo">
          <span>Email:</span>
          <input
            ref="clientEmailInput"
            type="email"
            v-model="clientEmail"
            spellcheck="false"
            @click="onClientEmailClick"
          />
        </div>
        <div
          id="idpc-messageDiv"
          class="d-flex flex-column justify-content-between align-items-center"
        >
          <textarea
            ref="clientMessageInput"
            cols="90"
            rows="10"
            v-model="clientMessage"
            spellcheck="false"
            @click="onClientMessageClick"
          ></textarea>
          <div
            id="idpc-messageButtons"
            class="d-flex justify-content-between align-items-center"
          >
            <div class="d-flex justify-content-between align-items-center">
              <span
                id="idpc-attachFile"
                class="hoverable"
                @click="onAttachClick"
                >Attach</span
              >
              <input id="idpc-attachInput" type="file" @change="onFileUpload" />
              <p id="idpc-fileNamePar">{{ fileName }}</p>
            </div>
            <span
              id="idpc-sendMessage"
              class="hoverable"
              @click="onSendMessageClick"
              >Send</span
            >
          </div>
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
  name: "Contact",
  components: {
    FingerprintSpinner,
    Header,
    Footer,
  },
  data() {
    return {
      clientName: "",
      clientEmail: "",
      clientLastEnteredEmail: "",
      clientMessage: "",
      fileName: "",
      attachedFile: { name: "" },
      isPageLoaded: false,
      showNoNameError: false,
      showNoEmailError: false,
      showInvalidEmailError: false,
      showNoMessageError: false,

      // Element Objects Refs
      messagereceived: Object,
      contactForm: Object,
      attachInput: Object,
      messageButtons: Object,
      fileNamePar: Object,
    };
  },

  watch: {
    clientEmail(val) {
      if (
        val != "Email is required." &&
        val != `"${this.clientLastEnteredEmail}" is not a valid email.`
      )
        this.clientLastEnteredEmail = val;
    },
    showNoNameError(val) {
      if (val) {
        this.clientName = "Name is required.";
        this.$refs.clientNameInput.style.color = "#ff0000";
      } else {
        this.clientName = "";
        this.$refs.clientNameInput.style.color = "#0b7a62";
      }
    },
    showNoEmailError(val) {
      if (val) {
        this.clientEmail = "Email is required.";
        this.$refs.clientEmailInput.style.color = "#ff0000";
      } else {
        this.clientEmail = "";
        this.$refs.clientEmailInput.style.color = "#0b7a62";
      }
    },
    showInvalidEmailError(val) {
      if (val) {
        if (this.clientLastEnteredEmail != "")
          this.clientEmail = `"${this.clientLastEnteredEmail}" is not a valid email.`;
        this.$refs.clientEmailInput.style.color = "#ff0000";
      } else {
        this.clientEmail = this.clientLastEnteredEmail;
        this.$refs.clientEmailInput.style.color = "#0b7a62";
      }
    },
    showNoMessageError(val) {
      if (val) {
        this.clientMessage = "Message is required.";
        this.$refs.clientMessageInput.style.color = "#ff0000";
      } else {
        this.clientMessage = "";
        this.$refs.clientMessageInput.style.color = "#0b7a62";
      }
    },
  },

  methods: {
    // Main Functionality

    // Updates the fileName to fit the textarea
    fileNameUpdator() {
      if (this.fileName == "") {
      } else {
        if (
          this.fileNamePar.offsetWidth / this.messageButtons.offsetWidth <
            0.3 &&
          this.fileName != this.attachedFile.name
        )
          this.fileName = this.attachedFile.name;
        if (
          this.fileNamePar.offsetWidth / this.messageButtons.offsetWidth >
          0.45
        ) {
          var lastCharIndex = this.fileName.lastIndexOf(".");
          var namePart = this.fileName.substr(0, lastCharIndex - 3);
          var extentionPart = this.fileName.substr(
            lastCharIndex,
            this.fileName.length - lastCharIndex
          );
          this.fileName = `${namePart}${extentionPart}`;
        } else if (this.fileName != this.attachedFile.name) {
          var lastCharIndex = this.fileName.lastIndexOf(".");
          var namePart = this.fileName.substr(0, lastCharIndex - 3);
          var extentionPart = this.fileName.substr(
            lastCharIndex,
            this.fileName.length - lastCharIndex
          );
          this.fileName = `${namePart}...${extentionPart}`;
        }
      }
    },

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
    onFileUpload($event) {
      this.attachedFile = $event.target.files[0];
      this.fileName = this.attachedFile.name;
    },
    onAttachClick() {
      this.attachInput.click();
    },
    onClientNameClick() {
      if (this.showNoNameError) this.showNoNameError = false;
    },
    onClientEmailClick() {
      if (this.showNoEmailError) this.showNoEmailError = false;
      if (this.showInvalidEmailError) this.showInvalidEmailError = false;
    },
    onClientMessageClick() {
      if (this.showNoMessageError) this.showNoMessageError = false;
    },
    onSendMessageClick() {
      if (this.clientName == "") this.showNoNameError = true;
      if (this.clientEmail == "") this.showNoEmailError = true;
      if (this.clientMessage == "") this.showNoMessageError = true;
      if (!this.$refs.clientEmailInput.validity.valid && this.clientEmail != "")
        this.showInvalidEmailError = true;
      if (
        !this.showNoNameError &&
        !this.showNoEmailError &&
        !this.showNoMessageError &&
        this.$refs.clientEmailInput.validity.valid
      ) {
        var messageFormData = new FormData();
        messageFormData.append("name", this.clientName);
        messageFormData.append("email", this.clientEmail);
        messageFormData.append("message", this.clientMessage);
        messageFormData.append("attachment", this.attachedFile);
        this.contactForm.classList.remove("d-flex");
        this.contactForm.classList.add("d-none");
        this.messagereceived.classList.remove("d-none");
      }
    },
  },

  created() {
    document.addEventListener("readystatechange", this.onPageLoad);
  },

  mounted() {
    this.$refs.clientNameInput.style.color = "#0b7a62";
    this.$refs.clientEmailInput.style.color = "#0b7a62";
    this.$refs.clientMessageInput.style.color = "#0b7a62";
    this.messagereceived = document.querySelector("#idpc-messagereceived");
    this.contactForm = document.querySelector("#idpc-contactForm");
    this.attachInput = document.querySelector("#idpc-attachInput");
    this.messageButtons = document.querySelector("#idpc-messageButtons");
    this.fileNamePar = document.querySelector("#idpc-fileNamePar");
    document.querySelectorAll(".hoverable").forEach((element) => {
      element.classList.remove("hoverable");
      element.classList.add("pointer-green");
    });
  },

  updated() {
    this.fileNameUpdator();
  },
};
</script>

<style scoped>
@import "assets/css/contact.css";
</style>