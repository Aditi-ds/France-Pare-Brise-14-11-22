import * as React from "react";
import Hours from "../commons/hours";
import Address from "../commons/Address";
import Phone from "../commons/phone";
import CustomMap from "../locationDetails/CustomMap";
import GetDirection from "../commons/GetDirection";
import Cta from "../commons/cta";
import OpenCloseStatus from "../commons/OpenCloseStatus";
import { Link, useAnalytics } from "@yext/pages/components";
type props = {
  prop: any;
  coords: any;
  address: any;
  phone: any;
  hours: any;
  c_appointment: any;

  timezone: any;
};
var LOCATION: any = null;
var url: any = "";
var currentLatitude: any = 0.0;
var currentLongitude: any = 0.0;
const LocationInformation = (data: props) => {
  const [time, setTime] = React.useState({});
  const [hours, setHours] = React.useState({});
  const [displayCoordinate, setdisplayCoordinate] = React.useState({});
  const [coordinates, setCoordinate] = React.useState({});
  const [ClosingTime, setClosingTime] = React.useState("");
  const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
  const [address_str, serAddress_str] = React.useState("");
  const [currentLocationLatLng, setCurrentLocationLatLng] =
    React.useState(null);

  React.useEffect(() => {
    getString();
    setTime(data.prop);
    setCoordinate(data.coords);
    let key: any = Object.values(data.prop)[0];
    setClosingTime(key.openIntervals[0].end);

    // getCurrentLocationLatLng();
  }, [setCurrentLocationLatLng]);
  // const getCurrentLocationLatLng = () => {
  //   navigator?.geolocation.getCurrentPosition(
  //     ({ coords: { latitude: lat, longitude: lng } }) => {
  //       const pos: any = { lat, lng };

  //       setCurrentLocationLatLng(pos);
  //       LOCATION = pos;
  //     }
  //   );
  // };

  function getString() {
    let address_string = "";
    address_string =
      "France Pair Brise" +
      "," +
      data.address.line1 +
      "," +
      data.address.line2 +
      "," +
      data.address.city +
      "," +
      data.address.region +
      "," +
      data.address.postalCode +
      "," +
      regionNames.of(data.address.countryCode);
    console.log(address_string, 'address_string')
    address_string = address_string.replace("undefined,", "");
    serAddress_str(address_string);
    console.log(address_string, "address_string");
  }
  const conversionDetails = {
    cid: "e1cd62c2-74f9-4d8a-ade1-b8e9001c4df4",
    cv: "1",
  };
  const conversionDetails_phone = {
    cid: "17620319-c59b-4719-9732-eaaf0ff35a3a",
    cv: "2",
  };
  return (
    <>
      <div className="location-information">
        <div className="container-fluid ml-12">
          <div className="boxes">
            <div className="location_details">
              <div className="box store-info ">
                <div className="inner-box">
                  <h4 className="font-semibold">Informations sur le magasin</h4>
                  <div className="store-address flex flex-row">
                    <Address address={data.address} />
                  </div>
                  <div className="store-phone flex flex-row">
                    <Phone phone={data.phone} />
                  </div>
                  <div className="OpenCloseStatus" >
                    <p className={" icon-row"}>
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.106" height="19.106" viewBox="0 0 19.106 19.106">
                          <path d="M170.493,161.44a9.053,9.053,0,1,0,9.053,9.053A9.058,9.058,0,0,0,170.493,161.44Zm.24.628a8.423,8.423,0,0,1,8.183,8.114h-1.45a.312.312,0,0,0,0,.624h1.45a8.423,8.423,0,0,1-8.183,8.112v-1.453h0a.312.312,0,0,0-.624,0v1.448a8.422,8.422,0,0,1-8.037-8.106h1.45a.312.312,0,0,0,0-.624h-1.45a8.423,8.423,0,0,1,8.037-8.109v1.448a.312.312,0,0,0,.624,0Zm-.311,3.14a.312.312,0,0,0-.313.313v5.434l-2.609,2.367a.313.313,0,0,0,.419.463l2.712-2.461h0a.312.312,0,0,0,.1-.231v-5.573a.312.312,0,0,0-.311-.313Z" transform="translate(-160.94 -160.94)" fill="#cc0c1f" stroke="#cc0c1f" stroke-width="1" fill-rule="evenodd" />
                        </svg>
                      </div>
                      <OpenCloseStatus timezone={data.timezone} hours={data.hours} ></OpenCloseStatus></p>
                    {/* <div className={data.timeStatus + " daylist"} ><Hours key="" hours={data.hours} /></div> */}
                  </div>
                  <div className="store-link flex flex-row mt-2 ">
                    <div className="ctaBtn">
                      {displayCoordinate ?
                        <GetDirection buttonText="Obtenir l'itinéraire" address={data.address} />
                        : <GetDirection address={data.address} buttonText="Obtenir l'itinéraire" />}
                    </div>
                  </div>
                  <div className="ml-4 mb-3 mt-3">
                    <Cta buttonText={data.c_appointment} url="#"></Cta>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationInformation;
