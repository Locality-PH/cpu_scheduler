require("babel-register");

const router = require("./component/shared-component/router").default;
const Sitemap = require("../").default;
const domain = windows.localtion.host;
new Sitemap(router).build(`http://${domain}`).save("./sitemap.xml");
