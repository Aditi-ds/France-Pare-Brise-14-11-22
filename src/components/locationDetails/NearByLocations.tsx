import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import Address from "../commons/Address";
import Phone from "../commons/phone";
// import Opening from "../components/openClose";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import OpenCloseStatus from "../commons/OpenCloseStatus";
// import Hours from "../components/hours";
// const metersToMiles = (meters: number) => {
//   const miles = meters * 0.000621371;
//   return miles.toFixed(2);
// }

const metersToMiles = (kilometers: number) => {
  const miles = kilometers * 0.62137119;
  return miles.toFixed(2);
}

type props = {
  prop: any;
  // parents: any;
  baseUrl: any;
  coords: any;
  slug: any;
  // what3WordsAddress: any;
};
// const timezone="";
const NearByLocation = (entities: props) => {

  const [data, setData] = useState([]);
  const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
  useEffect(() => {
    console.log(entities.slug, 'kjfddgldj')
    let distance: any = []
    let arr: any = []
    entities.prop.response.distances.map((i: any) => {
      distance.push(i.distanceKilometers)
    })
    entities.prop.response.entities.map((i: any, index: any) => {
      arr.push({
        slug: i.slug,
        address: i.address,
        hours: i.hours,
        geocodedCoordinate: i.geocodedCoordinate,
        mainPhone: i.mainPhone,
        name: i.name,
        yextDisplayCoordinate: i.yextDisplayCoordinate,
        distance: distance[index]
      })
    })

    // console.log(entities.prop.response, 'abc')
    console.log(arr, 'arr')
    setData(arr);
  }, [setData]);
  const conversionDetails = {
    cid: "e801ea67-1c6e-4815-baac-e61a111e9f77",
    cv: "1",
  };
  const conversionDetails_phone = {
    cid: "de598c07-b53c-407a-89f8-adc289ae9d62",
    cv: "2",
  };
  function getDirectionUrl(entitiy: any) {
    var origin: any = null;
    if (entitiy.address.city) {
      origin = entitiy.address.city;
    } else if (entitiy.address.region) {
      origin = entitiy.address.region;
    } else {
      origin = entitiy.address.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        // var message_string =
        //   "Unable to determine your location. please share your location";
        // if (confirm(message_string) != true) {
        //   var getDirectionUrl =
        //     "https://www.google.com/maps/dir/?api=1&destination=" +
        //     entitiy.yextDisplayCoordinate.latitude +
        //     "," +
        //     entitiy.yextDisplayCoordinate.longitude +
        //     "&origin=" +
        //     origin;

        //   window.open(getDirectionUrl, "_blank");
        // } else {
        //   return false;
        // }
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          entitiy.yextDisplayCoordinate.latitude +
          "," +
          entitiy.yextDisplayCoordinate.longitude +
          "&origin=" + origin;

        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            entitiy.yextDisplayCoordinate.latitude +
            "," +
            entitiy.yextDisplayCoordinate.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  }


  return (
    <>
      <div className="nearby-sec">
        <div className="container">
          <div className="w-full text-center">
            <h2 className="sec_heading text-3xl mb-4 text-[#001f46]">Emplacements à proximité</h2>
          </div>
          <Splide
            id="splide-nearby"
            options={{
              rewind: false,

              type: "slide",

              perPage: 3,
              perMove: 1,
              arrows: false,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 1,
                  drag: true,
                  pagination: true,
                  arrows: true,
                  type: "splide",
                },
                575: {
                  arrows: false,
                },
              },
            }}
          >
            {data &&
              data.map((e: any, index: any) => {
                var origin: any = null;
                if (e.address.city) {
                  origin = e.address.city;
                } else if (e.address.region) {
                  origin = e.address.region;
                } else {
                  origin = e.address.country;
                }

                if (entities.slug != e.slug && e.closed != true) {

                  let addressString = "";
                  let addressLines = e.address?.line1 + ", " + e.address?.line2;

                  if (addressLines.length > 42) {
                    addressString += e.address?.line1 + " <br />";
                    let addressLine = e.address?.line2 + ", " + e.address?.city + ", ";
                    if (addressLine.length > 42) {
                      addressString += e.address?.line2 + ", " + e.address?.city + ",<br />";
                      addressString += e.address?.postalCode + ", " + regionNames.of(e.address?.countryCode);
                    } else {
                      addressString += e.address?.line2 + ", " + e.address?.city + ", " + e.address?.postalCode + "<br />";
                      addressString += regionNames.of(e.address?.countryCode);
                    }

                  } else {
                    let line2 = "";
                    if (e.address?.line2 != undefined) {
                      line2 = ", " + e.address?.line2 + ", ";
                    }
                    addressString += e.address?.line1 + ", " + line2 + "<br />";
                    addressString += e.address?.city + ", " + e.address?.postalCode + "<br />";
                    addressString += regionNames.of(e.address?.countryCode);
                  }

                  if (entities.slug != e.slug && e.closed != true) {
                    return (
                      <SplideSlide key={index}>
                        <div className="near-location">
                          <h4 className="flex flex-row mb-2 space-x-4">
                            <a href={`/${e.slug}.html`}>{e.name}</a>
                            <h6 className="ml-6 mt-2 text-[#001f46]">
                              {metersToMiles(e.distance)} mi
                            </h6>
                          </h4>
                          <div className="store-address flex flex-row space-x-4">
                            <Address address={e.address} />
                          </div>
                          <div className="store-phone flex flex-row space-x-4">
                            <Phone phone={e.mainPhone} />
                          </div>
                          <div className="OpenCloseStatus" >
                            <a className={" icon-row"} href="javascript:void(0);"   >
                              <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19.106" height="19.106" viewBox="0 0 19.106 19.106">
                                  <path d="M170.493,161.44a9.053,9.053,0,1,0,9.053,9.053A9.058,9.058,0,0,0,170.493,161.44Zm.24.628a8.423,8.423,0,0,1,8.183,8.114h-1.45a.312.312,0,0,0,0,.624h1.45a8.423,8.423,0,0,1-8.183,8.112v-1.453h0a.312.312,0,0,0-.624,0v1.448a8.422,8.422,0,0,1-8.037-8.106h1.45a.312.312,0,0,0,0-.624h-1.45a8.423,8.423,0,0,1,8.037-8.109v1.448a.312.312,0,0,0,.624,0Zm-.311,3.14a.312.312,0,0,0-.313.313v5.434l-2.609,2.367a.313.313,0,0,0,.419.463l2.712-2.461h0a.312.312,0,0,0,.1-.231v-5.573a.312.312,0,0,0-.311-.313Z" transform="translate(-160.94 -160.94)" fill="#cc0c1f" stroke="#cc0c1f" stroke-width="1" fill-rule="evenodd" />
                                </svg>
                              </div>
                              <OpenCloseStatus timezone={e.timezone} hours={e.hours} deliveryHours={{}}></OpenCloseStatus></a>
                            {/* <div className={data.timeStatus + " daylist"} ><Hours key="" hours={data.hours} /></div> */}
                          </div>
                          
                          <div className="store-link flex flex-row space-x-4">
                            <Link
                              data-ya-track="directions"
                              className="bg-[#001f46] text-white text-sm hover:bg-white border-solid border-2 p-3 border-[#001f46] hover:text-[#001f46]"
                              onClick={() => getDirectionUrl(e)}
                              href="javascript:void(0);"
                              rel="noopener noreferrer"
                              conversionDetails={conversionDetails}
                            >
                              Obtenir des directions
                            </Link>

                            <a className="view-details bg-[#001f46] text-white text-sm p-4 hover:bg-white border-solid border-2 border-[#001f46] hover:text-[#001f46] mt-4" href={`/${e.slug}.html`}>
                              Voir les détails
                            </a>
                          </div>
                        </div>

                      </SplideSlide>
                    );
                  }
                }
              })}
          </Splide>
        </div>
      </div>
    </>
  );
};
export default NearByLocation;