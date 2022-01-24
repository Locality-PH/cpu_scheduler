
import Landing from "./pages/home.js";
// eslint-disable-next-line
import About from "./pages/about.js";

const dashboardRoutes = [

  {
    path: "/cpu-calculator",
    name: "cpu-calculator",
    component: Landing,
    layout: "/cpu",
  },
  
 
];

export default dashboardRoutes;
