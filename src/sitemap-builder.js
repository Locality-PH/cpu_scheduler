require("babel-register")({
  presets: ["es2020", "react"],
});

const router = require("./index.js").default;
const Sitemap = require("react-router-sitemap").default;
const domain = windows.localtion.host;

new Sitemap(router).build(`http://${domain}`).save("./public/sitemap.xml");
