//  export default Header;
import * as React from "react";
import logo from "../../images/logo.svg"

// type Link = {
//   label: string;
//   url: string;
// };

type services = {
  c_menu: any;
};

// const links: Link[] = [
//   {
//     label: "Home",
//     url: "/",
//   },
//   {
//     label: "Menu",
//     url: "#",
//   },
//   {
//     label: "Delivery & Collection",
//     url: "#",
//   },
//   {
//     label: "A Celebration of Flavour",
//     url: "#",
//   },
//   {
//     label: "E-gifts",
//     url: "#",
//   },
//   {
//     label: "Christmas",
//     url: "#",
//   },
//   {
//     label: "Working with us",
//     url: "#",
//   }
// ];

// const Header = () => {
//   const linkDoms = links.map((link) => (
//     <a className="navbar-item" href={link.url} >
//       <span>{link.label}</span>
//     </a>
//   ));

  const Header = (props: services) => {
    const { c_menu } = props;


    return (
      <>

        <div id="header" className="header-nav">

          <div className="header-content">
            <div className="header-content-left">
              {/* <button type="button" className="humburger-button"> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24">
                <g transform="translate(-82.5 -650.5)">
                  <line x2="31" transform="translate(83.5 651.5)" fill="none" stroke="#001f46" stroke-linecap="square" stroke-width="2" />
                  <line x2="31" transform="translate(83.5 662.5)" fill="none" stroke="#001f46" stroke-linecap="square" stroke-width="2" />
                  <line x2="31" transform="translate(83.5 673.5)" fill="none" stroke="#001f46" stroke-linecap="square" stroke-width="2" />
                </g>
              </svg>

              {/* </button> */}

            </div>
            <div className="header-content-middle">
              <a className="logo" href="/">
                <img className="" src={logo} alt="Logo France Pare-Brise" />
              </a>
            </div>
            <div className="header-content-right">
              <a href="#" className="button before-icon" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="12.254" height="12.254" viewBox="0 0 12.254 12.254">
                <path id="download" d="M209.815,206.673a9.072,9.072,0,0,1-1.824-.517,1.049,1.049,0,0,0-.894.049,1.025,1.025,0,0,0-.52.718.665.665,0,0,1-.324.5.566.566,0,0,1-.508-.072,11.2,11.2,0,0,1-4.007-4.006.566.566,0,0,1-.072-.509.667.667,0,0,1,.5-.323,1.036,1.036,0,0,0,.768-1.414,9.065,9.065,0,0,1-.517-1.824,1.027,1.027,0,0,0-1.116-.863l-1.334.126h0a1.7,1.7,0,0,0-1.5,2.062,13.26,13.26,0,0,0,10.02,10.02,1.7,1.7,0,0,0,2.064-1.516l.125-1.319a1.03,1.03,0,0,0-.863-1.116Z" transform="translate(-198.43 -198.411)" />
              </svg>
              {c_menu?.cta?.label}</a>
              <a href="#" className="button secondary" target="_self">{c_menu?.button?.label}</a>
            </div>

          </div>
        </div>



      </>
    );
  };

  export default Header;