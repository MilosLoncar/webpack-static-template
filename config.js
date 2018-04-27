const pages = [
  {
    hash: true,
    title: "Smart Chain Technology - Home",
    filename: "index.html",
    inject: "body",
    meta: {
      viewport: "width=device-width, initial-scale=1"
    },
    template: __dirname + "/src/html/index.handlebars"
  },
  {
    hash: true,
    title: "Smart Chain Technology - About",
    filename: "about.html",
    inject: "body",
    excludeChunks: ["home"],
    meta: {
      viewport: "width=device-width, initial-scale=1"
    },
    template: __dirname + "/src/html/about.handlebars"
  }
];

module.exports = pages;
