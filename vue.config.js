module.exports = {
    pages: {
      index: {
        entry: "./src/main.js",
        title: "EELee App Design",
        chunks: ["chunk-vendors", "chunk-common", "index"],
      },
      portfolio: {
        entry: "./src/pages/portfolio/main.js",
        title: "EELee - Portfolio",
        chunks: ["chunk-vendors", "chunk-common", "portfolio"],
      },
      applications: {
        entry: "./src/pages/applications/main.js",
        title: "EELee - MineSweeper",
        chunks: ["chunk-vendors", "chunk-common", "applications"],
      },
      donate: {
        entry: "./src/pages/donate/main.js",
        title: "EELee - Donate Us",
        chunks: ["chunk-vendors", "chunk-common", "donate"],
      },
      order: {
        entry: "./src/pages/order/main.js",
        title: "EELee - Order Now!",
        chunks: ["chunk-vendors", "chunk-common", "order"],
      },
      contact: {
        entry: "./src/pages/contact/main.js",
        title: "EELee - Contact Us",
        chunks: ["chunk-vendors", "chunk-common", "contact"],
      },
    }
  }
  