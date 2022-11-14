import * as React from "react";
// import { useTranslation } from 'react-i18next';
type Cta = {
	buttonText: string;
	// latitude?: number;
	// longitude?: number;
	label?:any;
	address?:string;
};

const GetDirection = (props: GetDirection) => {
	const {
		buttonText,
		latitude,
		longitude,
		address,
		label
	} = props;

	const getDirectionUrl = () => {
		var origin: any = null;
		// if (props.address.line1) {
		// 	origin = props.address.line1;
		// }
		// else 
		if (props.address.city) {
			origin = props.address.city;
		} else if (props.address.region) {
			origin = props.address.region;
		} else {
			origin = props.address.country;
		}
		if (navigator.geolocation) {
			const error = (error: any) => {
				var getDirectionUrl =
					"https://www.google.com/maps/dir/?api=1&destination=" +
					props.address.line1+
					"," +	props.address.line2+
					"," +
					props.address.city +
					"&origin=" +
					origin;

				window.open(getDirectionUrl, "_blank");
			};
			navigator.geolocation.getCurrentPosition(
				function (position) {
					console.log("current lat lang");
					let currentLatitude = position.coords.latitude;
					let currentLongitude = position.coords.longitude;
					let getDirectionUrl =
						"https://www.google.com/maps/dir/?api=1&destination=" +
						props.address.line1+
						"," +	props.address.line2+
						"," +
						props.address.city +
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
	};
	//   const { t, i18n } = useTranslation();
	return (

		// <a onClick={GetDirection}  className="button" rel="noopener noreferrer" data-type="book" data-restaurantid="" > 
		// {buttonText}"Obtenir l'itinéraire"
		// </a>
		<a href="javascript:void(0);" onClick={getDirectionUrl} className="button before-icon" rel="noopener noreferrer" data-type="book" data-restaurantid="" >
			<svg xmlns="http://www.w3.org/2000/svg" width="15.984" height="16" viewBox="0 0 15.984 16">
				<path d="M965.7,854.941a2.139,2.139,0,0,1-1.406-.584q-3.008-3.022-6.027-6.032a2.013,2.013,0,0,1,0-2.778q3.027-3.028,6.055-6.055a2.012,2.012,0,0,1,2.777.009l6.054,6.056a2.018,2.018,0,0,1,0,2.752q-3.014,3.016-6.025,6.033A2.2,2.2,0,0,1,965.7,854.941Zm-.043-.959c.477.008.729-.33,1-.592q2.161-2.124,4.3-4.276c.512-.514,1.016-1.037,1.5-1.572a.815.815,0,0,0,0-1.228c-.055-.065-.108-.13-.168-.19-1.948-1.952-3.891-3.909-5.849-5.852a.944.944,0,0,0-1.518.037q-2.293,2.275-4.575,4.561c-.453.453-.9.911-1.335,1.384a.851.851,0,0,0-.015,1.338c.165.193.334.383.513.563q2.432,2.444,4.871,4.881a9.549,9.549,0,0,0,.808.727A2.159,2.159,0,0,0,965.659,853.982Z" transform="translate(-957.711 -838.941)" />
				<path d="M1035.414,901.19V899.2a3.093,3.093,0,0,1,.37.248c.62.594,1.245,1.184,1.847,1.8.4.41.4.6,0,1.011-.61.622-1.239,1.225-1.863,1.832a2.9,2.9,0,0,1-.352.235v-2.062c-.283,0-.495,0-.707,0-.545,0-1.089.008-1.634.017a.953.953,0,0,0-.963.962c-.008.641-.009,1.282-.014,1.924a3.676,3.676,0,0,1-.014.4.428.428,0,0,1-.491.419.414.414,0,0,1-.446-.458c0-.847-.018-1.694.007-2.541a1.96,1.96,0,0,1,1.819-1.713c.762-.01,1.524-.012,2.286-.02A.863.863,0,0,0,1035.414,901.19Z" transform="translate(-1025.812 -894.827)" />
			</svg> {label} </a>

	);
};

export default GetDirection;
