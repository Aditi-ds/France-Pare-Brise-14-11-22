import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from '..//../components/commons/hours';
import Address from "..//../components/commons/Address";
import GetDirection from "../commons/GetDirection";
import phonePin from "..//../images/icons8-call-80.png";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import Phone from "../commons/phone";
// import { useTranslation } from 'react-i18next';
const metersToMiles = (meters: number) => {
  const miles = meters * 0.0006213712;
  return miles.toFixed(2);
}


// const { t, i18n } = useTranslation();
const LocationCard: CardComponent<Location> = ({ result }) => {
  const { address, hours, mainPhone, timezone, c_labels } = result.rawData;
  const formattedPhone = formatPhoneNumber(mainPhone) ;

  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  }
  console.log((result.distance ?? 0),"hfuieefhioewf")
  return (
    
<div className={`location result onhighLight`} id={`result-${result.index}`}>
      <h1 className=""><a href={`${result.rawData.slug}.html`}>{result.rawData.name}</a> <p className="miles"><svg xmlns="http://www.w3.org/2000/svg" width="13.977" height="18" viewBox="0 0 13.977 18">
  <path d="M5.822,16.657C.911,9.663,0,8.945,0,6.375A6.432,6.432,0,0,1,6.488,0a6.432,6.432,0,0,1,6.488,6.375c0,2.57-.911,3.288-5.822,10.282A.82.82,0,0,1,5.822,16.657Zm.667-7.626a2.657,2.657,0,1,0-2.7-2.656A2.68,2.68,0,0,0,6.488,9.031Z" transform="translate(0.5 0.5)" fill="none" stroke="#233867" stroke-width="1"/>
</svg> {metersToMiles(result.distance ?? 0)} mi</p></h1>
    
      <Address address={address} />
      <div className="icon-row location-phone onhighLight">
      <Phone phone={result.rawData.mainPhone} country="france"/>
      </div>

      <div className="OpenCloseStatus" >
        <a className={timeStatus + " icon-row"} href="javascript:void(0);" onClick={onOpenHide}  >
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="19.106" height="19.106" viewBox="0 0 19.106 19.106">
              <path d="M170.493,161.44a9.053,9.053,0,1,0,9.053,9.053A9.058,9.058,0,0,0,170.493,161.44Zm.24.628a8.423,8.423,0,0,1,8.183,8.114h-1.45a.312.312,0,0,0,0,.624h1.45a8.423,8.423,0,0,1-8.183,8.112v-1.453h0a.312.312,0,0,0-.624,0v1.448a8.422,8.422,0,0,1-8.037-8.106h1.45a.312.312,0,0,0,0-.624h-1.45a8.423,8.423,0,0,1,8.037-8.109v1.448a.312.312,0,0,0,.624,0Zm-.311,3.14a.312.312,0,0,0-.313.313v5.434l-2.609,2.367a.313.313,0,0,0,.419.463l2.712-2.461h0a.312.312,0,0,0,.1-.231v-5.573a.312.312,0,0,0-.311-.313Z" transform="translate(-160.94 -160.94)" fill="#cc0c1f" stroke="#cc0c1f" stroke-width="1" fill-rule="evenodd" />
            </svg>
          </div>
           <OpenCloseStatus timezone={timezone} hours={hours} deliveryHours={{}}></OpenCloseStatus></a>
        <div className={timeStatus + " daylist"} ><Hours key={result.rawData.id} hours={hours} /></div>
      </div>

      <div className="buttons">
        <div className="ctaBtn">
        {result.rawData.displayCoordinate?
        <GetDirection label={c_labels} address={address} />
                :  <GetDirection address={address} label={c_labels} />}
          
        </div>
        <div className="ctaBtn">
          <a className="button secondary before-icon" href={`${result.rawData.slug}.html`}> <svg xmlns="http://www.w3.org/2000/svg" width="18.412" height="13.502" viewBox="0 0 18.412 13.502">
  <path d="M172.374,219.733c-.107-.266-2.684-6.523-9.163-6.523s-9.056,6.257-9.163,6.523a.616.616,0,0,0,0,.456c.107.266,2.684,6.523,9.163,6.523s9.056-6.257,9.163-6.523a.624.624,0,0,0,0-.457Zm-9.163,5.752c-5.053,0-7.418-4.433-7.921-5.521.5-1.064,2.914-5.526,7.921-5.526,5.053,0,7.418,4.433,7.921,5.521C170.63,221.023,168.219,225.485,163.212,225.485Z" transform="translate(-154.005 -213.21)"/>
  <path d="M276.7,272.41a4.3,4.3,0,1,0,4.3,4.3A4.3,4.3,0,0,0,276.7,272.41Zm0,7.365a3.069,3.069,0,1,1,3.069-3.069A3.072,3.072,0,0,1,276.7,279.775Z" transform="translate(-267.49 -269.955)"/>
</svg>
 Voir les détails</a>
        </div>
      </div>
    </div>
  );
 
}


export default LocationCard;