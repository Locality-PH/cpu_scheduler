import React from 'react'
import { Layout } from 'antd';
import { Route, Switch } from "react-router-dom";
import routes from "../router.js";

const {  Content } = Layout;


const content = () => {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
       
          if (prop.layout === "/cpu") {
     
            return (
              <Route
                path={prop.layout + prop.path}
                render={(props) => <prop.component {...props} />}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };
    return (
        <div>
             <Content 
          className="site-layout-background content-font"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 800,
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" , 
            borderRadius: "16px",
            
          }}
        >
            <Switch>{getRoutes(routes)}</Switch>
        
          
        </Content>
        </div>
    )
}

export default content
