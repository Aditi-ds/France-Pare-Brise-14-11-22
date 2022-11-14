import * as React from "react";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";

const Phone = (props: any) => {
  const { phone } = props;
  // if (formatPhoneNumber) {
  //   formatPhoneNumber.country === 'fr'
  // }
  
  const formattedPhone = formatPhoneNumber(phone);
  
  return (
    <>
      <div className="icon-row location-phone onhighLight">
        <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="19.85" height="19.85" viewBox="0 0 19.85 19.85">
            <path d="M181.354,176.518l-2.124-2.134a1.326,1.326,0,0,0-1.875,0l-2.22,2.21-7.109-7.108,2.212-2.21a1.326,1.326,0,0,0,0-1.872l-2.137-2.138a1.326,1.326,0,0,0-1.875,0l-2.947,2.947a1.323,1.323,0,0,0-.388.936v.367a9.137,9.137,0,0,0,1.414,4,26.384,26.384,0,0,0,8.783,8.79,9.273,9.273,0,0,0,3.992,1.426h.392a1.322,1.322,0,0,0,.932-.383l2.951-2.951a1.326,1.326,0,0,0,0-1.87Zm-.419,1.466-2.945,2.941a.742.742,0,0,1-.268.17.732.732,0,0,1-.251.044H177.1a8.718,8.718,0,0,1-3.716-1.347,25.666,25.666,0,0,1-8.556-8.575A8.641,8.641,0,0,1,163.5,167.5v-.348a.736.736,0,0,1,.025-.249.751.751,0,0,1,.172-.27l2.949-2.947a.738.738,0,0,1,1.047,0l2.13,2.128a.737.737,0,0,1,0,1.047l-2.21,2.212-.419.419.419.419,7.109,7.1.419.419.419-.419,2.208-2.21a.735.735,0,0,1,1.047,0l2.128,2.134a.737.737,0,0,1,0,1.047Z" transform="translate(-162.392 -162.377)" fill="#cc0c1f" stroke="#cc0c1f" stroke-width="1" />
          </svg>
        </span>
        <a href={`tel:${phone}`}>
            {formattedPhone.split(' ').join('.')}
        </a>
      </div>
    </>
  );
};


export default Phone;
