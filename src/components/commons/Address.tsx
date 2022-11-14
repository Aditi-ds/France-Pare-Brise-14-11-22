import * as React from "react";


const Address = (props: any) => {  
    const { address } = props; 
  return (
    <>
      <div className="icon-row location-address "><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="14.13" height="19.39" viewBox="0 0 14.13 19.39">
  <path d="M222,144.2a6.675,6.675,0,0,0-4.64,1.868,6.281,6.281,0,0,0-1.925,4.5c0,3.69,1.972,6.206,4.06,8.87.745.951,1.516,1.934,2.216,3h0a.348.348,0,0,0,.577,0c.7-1.063,1.471-2.046,2.216-3,2.088-2.663,4.06-5.18,4.06-8.87a6.281,6.281,0,0,0-1.925-4.5A6.676,6.676,0,0,0,222,144.2Zm1.96,14.837c-.653.833-1.326,1.692-1.96,2.613-.633-.921-1.306-1.78-1.959-2.613-2.015-2.572-3.92-5-3.92-8.468a5.676,5.676,0,0,1,2.94-4.941,6.037,6.037,0,0,1,5.88,0,5.676,5.676,0,0,1,2.94,4.941c0,3.466-1.905,5.9-3.921,8.468ZM222,147.018a3.714,3.714,0,0,0-2.586,1.039,3.473,3.473,0,0,0,0,5.017,3.737,3.737,0,0,0,5.171,0,3.471,3.471,0,0,0,0-5.016,3.719,3.719,0,0,0-2.585-1.04Zm0,6.431h0a3.019,3.019,0,0,1-2.1-.844,2.823,2.823,0,0,1,0-4.077,3.037,3.037,0,0,1,4.2,0,2.82,2.82,0,0,1,0,4.076,3.022,3.022,0,0,1-2.1.846Z" transform="translate(-214.938 -143.696)" fill="#cc0c1f" stroke="#cc0c1f" stroke-width="1"/>
</svg>
</span> 
        <div className="onhighLight" >{address.line1}</div>
            {address.line2 && (<div className="onhighLight">{address.line2}</div>)}
            <div className="onhighLight">{address.region}, {address.city},  </div>
            <div className="onhighLight">{address.countryCode}, {address.postalCode}</div>       
      </div>
    </>
  );
};

export default Address;
