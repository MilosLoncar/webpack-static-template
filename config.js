const fs = require('fs');
const data = require("./config.json");

let pages = [];

for (let i = 0; i < data.header.length; i++) {
  let obj = {};
  let page = data.header[i].charAt(0).toLowerCase() + data.header[i].slice(1);
  let meta = { ...data.meta
  }

  let templateData = data[data.page[i]];
  let chunks = data[data.page[i]];
  obj.hash = true;
  obj.pages = data.page;
  obj.header = data.header;
  obj.filename = data.page[i] + ".html";
  obj.inject = "body";
  obj.meta = meta;
  obj.excludeChunks = chunks.excludeChunks;
  obj.template = __dirname + "/src/html/" + data.page[i] + ".pug";
  obj[data.page[i]] = {
    ...templateData
  }

  pages.push(obj);
}


//create .pug files

for (let i = 0; i < data.header.length; i++) {
  fs.open(`${__dirname}/src/html/${data.page[i]}.pug`, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        return;
      }

      throw err;
    }

  });
}

console.log(pages);


module.exports = pages;