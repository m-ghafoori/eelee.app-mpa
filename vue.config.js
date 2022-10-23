module.exports = {
    pages: {
      index: {
        entry: "./src/main.js",
        title: "EELee App Design",
        chunks: ["chunk-vendors", "chunk-common", "index"],
      },
      contact: "./src/pages/contact/main.js",
    //   "order": {
    //     entry: "./src/pages/order/main.js",
    //     // template: "public/order.html",
    //     // filename: "order.html",
    //     title: "Order",
    //     chunks: ["chunk-vendors", "chunk-common", "order"],
    //   },
      // index: './src/main.js',
      // home: './src/pages/home/main.js',
      // contact: './src/pages/contact/main.js',
      // order: './src/pages/order/main.js',
    }
  }
  