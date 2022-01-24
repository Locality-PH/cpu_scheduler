// require("@babel/register").transform("code", {
//   presets: ["es2015", "react"],
// });
// const router = require("./src/index.js").default;
// const Sitemap = require("react-router-sitemap").default;
// const domain = windows.localtion.host;

// new Sitemap(router)
//   .build(`http://cpu-scheduler-ph.gq/`)
//   .save("./public/sitemap.xml");
import Generator from "react-router-sitemap-generator";
const router = require("./src/index.js").default;
const generator = new Generator(`http://cpu-scheduler-ph.gq/`, router, {
  lastmod: new Date().toISOString().slice(0, 10),
  changefreq: "monthly",
  priority: 0.8,
});
generator.save("public/sitemap.xml");
