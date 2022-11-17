import * as React from "react";
import bannerImage from "../../images/francepare1.png";
import { Link } from "@yext/pages/components";
export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};
type props = {
  Name: any;
  TagLine: any;
  BackgroundImage: any;
  CtaButton: any;
  c_facebook: any;
  c_instagram: any;
  c_linkedin: any;
};
type Banner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
};

const Banner = (Data: props) => {
  const conversionDetails_primaryCTA = {
    cid: "dc6937a6-345d-4c0f-b63f-79be3c29d7bc",
    cv: "3",
  };
  return (
    <>
      <div className="  container-fluid bg-gray-200 relative text-3xl font-bold text-black  flex items-center justify-center flex-col gap-x-14 gap-y-10 md:flex-row">
        <img
          className="hero-img opacity-40 container-fluid"
          src={
            Data.BackgroundImage ? Data.BackgroundImage : bannerImage
          }
          alt="banner"
        />
        <div className="container-fluid text-center absolute">
          <h3>{Data.Name ? Data.Name : ""}</h3>
          <p className="text-base mt-2">{Data.TagLine ? Data.TagLine : ""}</p>

          {Data.CtaButton ? (
            <>
              {Data.CtaButton.label && Data.CtaButton.link ? (
                <div className="cta_btn">
                  <Link
                    rel="noopener noreferrer"
                    conversionDetails={conversionDetails_primaryCTA}
                    href={
                      Data.CtaButton.linkType == "PHONE"
                        ? `tel:${Data.CtaButton.link}`
                        : Data.CtaButton.link
                    }
                    className="button"
                    target={
                      Data.CtaButton.linkType == "PHONE"
                        ? "_self"
                        : Data.CtaButton.link == "#"
                          ? "_self"
                          : "_blank"
                    }
                  >
                    {Data.CtaButton ? Data.CtaButton.label : ""}
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          <div className="flex flex-row ml-12">
            <div className="w-10">
              {Data.c_facebook?.link ? (
                <>
                  <a
                    href={
                      Data.c_facebook.link
                        ? Data.c_facebook.link
                        : ""
                    }
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M17.857,2.25H2.143A2.143,2.143,0,0,0,0,4.393V20.107A2.143,2.143,0,0,0,2.143,22.25H8.27v-6.8H5.458v-3.2H8.27V9.811C8.27,7.036,9.922,5.5,12.452,5.5a17.039,17.039,0,0,1,2.479.216V8.443h-1.4a1.6,1.6,0,0,0-1.8,1.729V12.25H14.8l-.491,3.2H11.73v6.8h6.127A2.143,2.143,0,0,0,20,20.107V4.393A2.143,2.143,0,0,0,17.857,2.25Z"
                        transform="translate(0 -2.25)"
                        fill="#000000"
                      />
                    </svg>
                  </a>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="w-10">
              {Data.c_instagram?.link ? (
                <>
                  <a
                    href={
                      Data.c_instagram.link
                        ? Data.c_instagram.link
                        : ""
                    }
                    target="_blank"
                  >
                    <svg width="26" height="26" viewBox="0 0 26 26">
                      <path
                        d="M22.962,10.98H20.7a7.986,7.986,0,1,1-15.448,0H2.994V21.962a1,1,0,0,0,1,1H21.962a1,1,0,0,0,1-1Zm0-6.988a1,1,0,0,0-1-1H18.968a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2.994a1,1,0,0,0,1-1ZM12.978,7.986a4.992,4.992,0,1,0,4.992,4.991,4.991,4.991,0,0,0-4.992-4.991m9.984,17.97H2.994a3,3,0,0,1-2.994-3V2.994A2.994,2.994,0,0,1,2.994,0H22.962a2.994,2.994,0,0,1,2.994,2.994V22.959a3,3,0,0,1-2.994,3"
                        fill="#000000"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="w-10">
              {Data.c_linkedin?.link ? (
                <>

                  <a
                    href={
                      Data.c_linkedin.link
                        ? Data.c_linkedin.link
                        : ""
                    }
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="19.507"
                      viewBox="0 0 24 19.507"
                    >
                      <path
                        d="M23.953,4.57a10,10,0,0,1-2.825.775,4.958,4.958,0,0,0,2.163-2.723,10.163,10.163,0,0,1-3.127,1.184A4.92,4.92,0,0,0,11.78,8.288,13.938,13.938,0,0,1,1.64,3.162,4.822,4.822,0,0,0,.974,5.637a4.921,4.921,0,0,0,2.188,4.1A4.9,4.9,0,0,1,.934,9.117v.06A4.923,4.923,0,0,0,4.88,14a5,5,0,0,1-2.212.085,4.936,4.936,0,0,0,4.6,3.417,9.867,9.867,0,0,1-6.1,2.1A10.444,10.444,0,0,1,0,19.544a14,14,0,0,0,7.557,2.209,13.9,13.9,0,0,0,14-13.985c0-.21,0-.42-.015-.63A9.935,9.935,0,0,0,24,4.59Z"
                        transform="translate(0 -2.246)"
                        fill="#000000"
                      />
                    </svg>
                  </a>

                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* {Data.CtaButton ? (
            <div className="cta_btn mt-2">
              <Link
                rel="noopener noreferrer"
                conversionDetails={conversionDetails_primaryCTA}
                href={Data.CtaButton ? Data.CtaButton.link : "#"}
                className="bg-[#001f46] text-white text-sm p-4 hover:bg-white border-solid border-2 border-[#001f46] hover:text-[#001f46] mt-4"
              >
                {Data.CtaButton ? Data.CtaButton.label : ""}
              </Link>
            </div>
          ) : (
            <></>
          )} */}

      </div>
    </>
  );
};

export default Banner;
