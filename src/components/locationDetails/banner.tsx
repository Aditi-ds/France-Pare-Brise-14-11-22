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
          className="hero-img opacity-40 w-full container-fluid"
          src={
            Data.BackgroundImage ? Data.BackgroundImage : bannerImage
          }
          alt="banner"
        />
        <div className="container-fluid text-center absolute">
          <h3>{Data.Name ? Data.Name : ""}</h3>
          <p className="text-base mt-2">{Data.TagLine ? Data.TagLine : ""}</p>
          {Data.CtaButton ? (
            <div className="cta_btn mt-2">
              <Link
                rel="noopener noreferrer"
                conversionDetails={conversionDetails_primaryCTA}
                href={Data.CtaButton ? Data.CtaButton.link : "#"}
                className="bg-[#001f46] text-white text-sm p-4 hover:bg-white border-solid border-2 border-[#001f46] mt-4"
              >
                {Data.CtaButton ? Data.CtaButton.label : ""}
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
