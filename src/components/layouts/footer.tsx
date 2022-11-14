import * as React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { cookieText } from "../../config/globalConfig";
import logo from "../../images/logo-white.png"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footerLogo">
            <img className="logo" src={logo} alt="Logo France pare-brise" />
          </div>

          <div className="footer-info">
            <p>Nos conseillers sont à votre écoute</p>

            <p>du lundi au samedi de 7h à 21h&nbsp;</p>

            <p>et le&nbsp;dimanche de 10h à 18h.</p>
          </div>
          <div className="footer-contact">
            <a
              href="/contact"
              className="button secondary"
              data-event="Footer"
              data-category="InteractionFooter"
              data-label="Nous_Contacter"
            >
              NOUS CONTRACTER
            </a>
          </div>
        </div>
        <div className="separator"></div>
        <div className="footer-nav">
          <div className="column"
          >
            <h4>Services Clients</h4>

            <ul className="">
              <li>
                <a
                  href="/services/vehicule-pret"
                >
                  Prêt de véhicule
                </a>
              </li>
              <li>
                <a
                  href="/services/remplacement-pare-brise-domicile"
                >
                  Service à domicile{" "}
                </a>
              </li>
              <li>
                <a
                  href="/services/demarches-administratives"
                >
                  Démarches administratives
                </a>
              </li>
              <li>
                <a href="/faq" >
                  FAQ
                </a>
              </li>
              <li>
                <a href="/pare-brise" >
                  Trouver un centre
                </a>
              </li>
              <li>
                <a href="/contact" >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="column"
          >
            <h4>
              A propos de France pare-brise
            </h4>

            <ul className="">
              <li>
                <a href="/reseau" >
                  Une marque du groupe Saint-Gobain
                </a>
              </li>
              <li>
                <a
                  href="/reseau/valeurs-engagements"

                >
                  Nos valeurs
                </a>
              </li>
              <li>
                <a
                  href="/nous-rejoindre"

                >
                  Nous rejoindre
                </a>
              </li>
            </ul>
          </div>
          <div className="column"
          >
            <h4>Informations légales</h4>

            <ul className="">
              <li>
                <a
                  href="/mentions-legales"

                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/sitemap" >
                  Plan du site
                </a>
              </li>
            </ul>






            <div

              className="social-links"
            >
              <h4 className="">Nous suivre</h4>

              <ul className="follow-us ">
                <li>
                  <a href="#" target="_blank">
                    <span className="icon-fbk text-white bg-white"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                  >
                    <span className="icon-linkedin"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                  >
                    <span className="icon-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CookieConsent
        buttonText={"Accept"}
        buttonStyle={{
          marginLeft: "100px",
        }}

      >
        <p>
          {cookieText}
          <a className="text-[#164787]" href="https://www.franceparebrise.fr/mentions-legales">
            cookies policy
          </a>
          .
        </p>
      </CookieConsent>
    </footer>
  );
};
export default Footer;
