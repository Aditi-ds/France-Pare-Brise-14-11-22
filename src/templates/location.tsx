import * as React from "react";
import Banner from "../components/locationDetails/banner";
import About from "../components/locationDetails/about";
import Opening from "../components/commons/OpenCloseStatus";
import Cta from "../components/commons/cta";
import Address from "../components/commons/Address";
import PhotoGallery from "../components/locationDetails/PhotoGallery";
import NearByLocation from "../components/locationDetails/NearByLocations";
import { nearByLocation } from "../types/nearByLocation";
import LocationInformation from "../components/locationDetails/LocationInformation";
import Hours from "../components/commons/hours";
import Faqs from "../components/locationDetails/Faqs";
// import PageLayout from "../components/layouts/PageLayout";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import CustomMap from "../components/locationDetails/CustomMap";
import favicon from "../images/favicon.png";
import bannerImage from "../images/francepare1.png";
import IframeMap from "../components/locationDetails/dynamicMap";
import BreadCrumbs from "../components/layouts/BreadCrumbs";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { Link, useAnalytics } from "@yext/pages/components";
import Example from "../components/locationDetails/menu";
import "../types/i18n.tsx";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import "../index.css";
import { useState } from 'react';

import Service from "../components/locationDetails/service";
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import {
  Template,
  GetPath,
  GetRedirects,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
// import { stagingBaseUrl } from "../constants";

var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    filter: {
      entityTypes: ["location"],
      savedFilterIds: ["1097497922"]
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_menu",
      "address",
      "mainPhone",
      "description",
      "neighborhood",
      "hours",
      "c_title",
      "c_primaryCTA",
      "photoGallery",
      "c_backgroundImage",
      "c_aboutSection",
      "c_bannerButton",
      "c_service",
      "c_glazingServices",
      "c_vechileTypes",
      "c_additionalServices",
      "slug",
      "c_labels",
      "paymentOptions",
      "geocodedCoordinate",
      "c_appointment",
      "c_servicesfrance.c_categoryType",
      "c_servicesfrance.name",
      "c_servicesfrance.slug",
      "c_servicesfrance.c_categoryIcon",
      "yextDisplayCoordinate",
      "c_metaTags",
      "c_ogMetaTag",
      "c_twitterTag",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
    ],
    localization: {
      locales: ["fr"],
      primary: false
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  var name: any = document.name.toLowerCase();
  var string: any = name.toString();
  let result: any = string.replaceAll(" ", "-");
  if (!document.slug) {
    url = `${document.id}-${result}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }

  return url;
};
/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({ relativePrefixToRoot, path, document }): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    //metaTags
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
          
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.description ? document.description : ""
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "title",
          content: `${document.c_metaTags.title ? document.c_metaTags.title : ""
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: `${document.c_metaTags.author ? document.c_metaTags.author : ""
            }`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${document.c_metaTags.robot ? document.c_metaTags.robot : ""
            }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href:
            "https://master-unlovely--lurch--evoke-sbx-pgsdemo-com.sbx.preview.pagescdn.com/"+
            ` ${document.c_canonical ? document.c_canonical : ""}`,
        },
      },

      ///og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: "https://master-unlovely--lurch--evoke-sbx-pgsdemo-com.sbx.preview.pagescdn.com/" + currentUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_ogMetaTag.ogdescription ? document.c_ogMetaTag.ogdescription : ""
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.c_ogMetaTag.ogtitle ? document.c_ogMetaTag.ogtitle : ""}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",

          content: `${document.c_ogMetaTag.image ? document.c_ogMetaTag.image.url : ""}`,
        },
      },



      /// twitter tag
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: document.c_twitterTag.twittercard,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: "https://master-unlovely--lurch--evoke-sbx-pgsdemo-com.sbx.preview.pagescdn.com/" + currentUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: document.description,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${document.c_twitterTag.twitterimage ? document.c_twitterTag.twitterimage.url : ""}`,
        },
      },
    ],
  };
};

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch?radius=500&location=${data.document.yextDisplayCoordinate.latitude},${data.document.yextDisplayCoordinate.longitude}&filter={}&api_key=6ed44a1dc3fe08dd7146a0ff738a4d5e&v=20181201&resolvePlaceholders=true&entityTypes=location&limit=3`
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  externalApiData,
  document,
  __meta,
}) => {
  const {
    name,
    _site,
    c_menu,
    address,
    description,
    neighborhood,
    openTime,
    hours,
    mainPhone,
    c_title,
    c_backgroundImage,
    c_bannerButton,
    c_servicesfrance,
    c_primaryCTA,
    c_aboutSection,
    c_service,
    c_glazingServices,
    photoGallery,
    c_vechileTypes,
    coordinates,
    c_additionalServices,
    geocodedCoordinate,
    yextDisplayCoordinate,
    c_appointment,
    services,
    covidMessaging,
    c_featuredFAQs,
    timezone,
    dm_directoryParents,
    paymentOptions
  } = document;

  // var formattedPhone = formatPhoneNumber(mainPhone);
  const { t, i18n } = useTranslation();
  const [time, setTime] = React.useState({});
  const [delHours, setDelHours] = React.useState({});
  const [closingTime, setClosingTime] = React.useState("");

  const [selectedTab, setSelectedTab] = useState('tab-1');
  return (
    <>
      <Header c_menu={_site.c_menu} />
        <Banner
          Name={name}
          TagLine={c_title}
          CtaButton={c_primaryCTA}
          // BackgroundImage={photoGallery?.image?.url}
          BackgroundImage={
            c_backgroundImage ? c_backgroundImage.url : bannerImage
          }
        />
        <BreadCrumbs
          name={name}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
          address={address}
        ></BreadCrumbs>
        <div>
          <div className="grid grid-cols-3 gap-4 mr-6 mt-6">
            <LocationInformation
              prop={hours}
              coords={yextDisplayCoordinate}
              address={address}
              phone={mainPhone}
              hours={hours}
              timezone={timezone}
              c_appointment={c_appointment.label}
            />
             <div ><Hours title="Hours" hours={hours} /></div> 
         <div> <CustomMap prop={yextDisplayCoordinate} /></div>  
          </div>
        </div>
        {c_aboutSection.title ? (
          <About c_aboutSection={c_aboutSection}/>
        ) : (
          <></>
        )}
    
        <Service servicefrance={c_servicesfrance}></Service>
        {/* service */}
        {/* <section className="text-#000 text-center mt-4">
          <h2 className="text-3xl font-bold text-[#001f46]">{"Services proposés"}</h2>
          <div className="grid grid-cols-2 gap-4 mb-7">
            <div>
                <img src={c_service[0].image.url} className="mx-auto shadow-lg mt-6 mb-4" alt="" />
                <a href="https://www.franceparebrise.fr/prestation/poids-lourd" className="font-bold mb-2"> {c_service[0].text}</a>
            </div>
            <div>
                <img src={c_service[1].image.url} className="mx-auto shadow-lg mt-6 mb-4" alt="" />
                <a href="https://www.franceparebrise.fr/prestation/poids-lourd" className="font-bold mb-2"> {c_service[1].text}</a>
            </div>
          </div>
        </section> */}
        {/* end */}
        <NearByLocation
          prop={externalApiData}
          baseUrl={relativePrefixToRoot}
          coords={yextDisplayCoordinate}
          slug={document.slug} />
        <div className="text-center mt-4 ">
          <Cta buttonText={c_bannerButton.label} url={c_bannerButton.link}></Cta>
        </div>
        {/* <Footer Footer={_site.c_footerFPB} /> */}
      {/* </PageLayout> */}
    </>
  );
};

export default Location;