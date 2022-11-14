// src/template/404.tsx
import * as React from "react";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import logo from "../images/logo.jpg"
import favicon from "../images/favicon.png";
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";

import "../index.css";

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};




// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "404 | France Pare Brise",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
   
    ],
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = () => {
  return (
    <> 
    <Header/>
    {/* style={{ textAlign: "center" }} */}
    <div className="content w-full  bg-slate-50 grid grid-cols-2 gap-6  h-[500px] mt-56 ml-32 text-[#001f46]">
        <div className="four-sec ">
          <h1 className="  font-family: Avenir-Black,Arial,sans-serif font-extrabold text-9xl mb-14 " >
           
           <b>404</b> 
          </h1>

          <p className="pt-3 pb-4 text-[35px] mb-14 ">
          Désolé, la page que vous recherchez n'existe plus.
          </p>
          <a className="button1 " href="https://www.franceparebrise.fr/">
          RETOUR À L'ACCUEIL
          </a>
        </div>
        <div>
          <img src={logo} alt="" height="600" width="500" className="mt-32"/>
        </div>
      </div>
  <Footer/>
  </>
    
  );
};

export default FourOhFour;
