module.exports = function(config) {
  config.set({
    basePath: "",

    frameworks: ["jasmine"],

    files: [
      { pattern: "src/js/popup.js", watched: true, included: true },
      "tests/**/*_spec.js"
    ],

    exclude: [],

    reporters: ["spec"],

    plugins: [
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-spec-reporter"
    ],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ["Chrome"],

    singleRun: false,

    concurrency: Infinity
  });
};
