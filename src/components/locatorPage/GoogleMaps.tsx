import { Wrapper } from '@googlemaps/react-wrapper';
// import { Result, useAnswersState } from '@yext/answers-headless-react';
import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { twMerge, useComposedCssClasses } from '..//../hooks/useComposedCssClasses';
import Mapicon from "..//../images/map-pin.svg";
import UserMarker from "..//../images/map-pin-hover.png";
import MapiconHover from "..//../images/map-pin-hover.png";
import Hours from '..//../components/commons/hours';
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import OpenCloseStatus from '../commons/OpenCloseStatus';
import Address from '../commons/Address';
import Phone from '../commons/phone';
/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string,
  centerLatitude: number,
  centerLongitude: number,
  defaultZoom: number,
  showEmptyMap: boolean,
  providerOptions?: google.maps.MapOptions,
  customCssClasses?: GoogleMapsCssClasses
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, 'apiKey' | 'locale'>;
let mapMarkerClusterer: { clearMarkers: () => void; } | null = null;

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer: 'w-full  h-48 md:h-96 lg:h-[calc(100vh_-_0px)] xl:h-[calc(100vh_-_0px)]  top-0   2xl:h-[calc(100vh_-_0px)] order-1 lg:order-none z-[99]'
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {

  return (
    <div>
      <Wrapper apiKey={props.apiKey} >
        <UnwrappedGoogleMaps {...props} />
      </Wrapper>
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  providerOptions,
  customCssClasses
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [center] = useState<google.maps.LatLngLiteral>({
    lat: centerLatitude,
    lng: centerLongitude
  });

  // console.log([centerLatitude,centerLongitude]);
  const locationResults = useSearchState(s => s.vertical.results) || [];
  // const userlat = useSearchState(s => s.location.locationBias) || [];
  //  console.log(userlat)

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;
  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, 'hidden');
  }
  let pinStyles = {
    fill: "#4e9c34", //default google red
    stroke: "#4e9c34",
    text: "white",
    fill_selected: "#2c702e",
    stroke_selected: "#4e9c34",
    text_selected: "white",
  };

  let marker_icon = {
    // default google pin path
    /*path: "M18.942,56.14C2.965,32.568,0,30.149,0,21.486A21.3,21.3,0,0,1,21.111,0,21.3,21.3,0,0,1,42.222,21.486c0,8.663-2.965,11.082-18.942,34.654a2.614,2.614,0,0,1-4.339,0Zm2.17-25.7a8.954,8.954,0,1,0-8.8-8.953A8.875,8.875,0,0,0,21.111,30.439Z",*/
    url: Mapicon,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };

//new
let marker_hover_icon = {
  url:MapiconHover,
  fillColor: pinStyles.fill,
  scale: 1.1,
  fillOpacity: 1,
  strokeColor: pinStyles.stroke,
  strokeWeight: 1,
  labelOrigin: new google.maps.Point(21,22),
};

let openMapCenter = '';
let openMapZoom = '';
let openInfoWindow = false;
let searchCenter = null;
let searchZoom = null;
let stopAnimation = false;
let currentMapZoom = 0;
let infoWindow = new google.maps.InfoWindow();
function zoomMapTo(zoomTo, centerToSet = false) {
  currentMapZoom = map.getZoom();
  let newZoom = (currentMapZoom > zoomTo) ? (currentMapZoom - 1) : (currentMapZoom + 1);
  map.setZoom(newZoom);
  if (newZoom != zoomTo && !stopAnimation) sleep(100).then(() => {
      zoomMapTo(zoomTo, centerToSet);
  });
  if (newZoom == zoomTo) {
      stopAnimation = false;
      if (centerToSet) {
          if (typeof map.panTo != 'undefined') {
              map.panTo(centerToSet);
          } else {
              map.setCenter(centerToSet);
          }
      }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  deleteMarkers();
  userdeleteMarkers();

  const userlat = useSearchState(s => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: iplat,
    lng: iplong
  //  const position = {
  // lat:47.902500 ,
  // lng:  1.909000
    
  }
  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker
  });
  usermarker.current.push(Usermarker1);

  try { if (mapMarkerClusterer) { mapMarkerClusterer.clearMarkers(); } } catch (e) { }
  let index = 0;
  for (const result of locationResults) {
    const position = getPosition(result);
    let markerLabel = Number(index + 1);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
      // label: {
      //   text: String(markerLabel),
      //   color: "#fff",
      // },
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markerPins.current.push(marker);
    index++;
  }

  if (markerPins.current.length > 0) {
    let markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({ map, markers });
    console.log(mapMarkerClusterer);
  }

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles:[
          {
              "featureType": "administrative",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          }
      ],
        ...providerOptions
      }));
    }
  }, [center, map, providerOptions, zoom]);

  useEffect(() => {
    if (markerPins.current.length > 0 && map) {
      map.fitBounds(bounds);
      map.panToBounds(bounds);
      const zoom = map.getZoom() ?? 0;
      if (zoom > 6) {
        map.setZoom(6);
      }
      searchCenter = bounds.getCenter();
      searchZoom = map.getZoom(); 
    }
    


  // var infoWindow = new google.maps.InfoWindow();
  // for (let i = 0; i < markerPins.current.length; i++) {
  //   markerPins.current[i].addListener("click", () => {
  //     locationResults.map((result, index) => {
  //       // if(i==index){
  //       //   Infowindow(i,result);
  //       // }
  //       if (i == index) {
  //         let resultelement = document.querySelectorAll(`.locator-${index + 1}`);
  //         for (let index = 0; index < resultelement.length; index++) {
  //           resultelement[index].classList.add('active')

  //         }
  //         Infowindow(i, result);
  //       }
  //       map.setZoom(6);
  //       infoWindow.open(map, markerPins.current[i]);
  //     })


  //   })
  // }
//new
gridHover(markerPins, marker_hover_icon, marker_icon);
let elements = document.querySelectorAll(".result");  
  for (let index = 0; index < elements.length; index++) {   
    
    elements[index].addEventListener("click", (e) => {   
      // console.log((e.target as HTMLElement).hasclas)   
       infoWindow.close();
      if((e.target as HTMLElement).classList.contains("onhighLight")){
        // alert("go")
       
        if(!openInfoWindow){
          openMapZoom = map.getZoom();
          openMapCenter = map.getCenter();
        }    

        locationResults.map((result,r)=>{
          if(index==r){
            Infowindow(index,result);              
            addActiveGrid(index); 
            map.panTo(markerPins.current[index].getPosition()); 
            infoWindow.open(map, markerPins.current[index]); 
            openInfoWindow = true;
          }
           map.setZoom(10);	           
        })

      }

    });
  }

});

for (let i = 0; i < markerPins.current.length; i++) {
markerPins.current[i].addListener("click", () => {
infoWindow.close();
if(!openInfoWindow){
  openMapZoom = map.getZoom();
  openMapCenter = map.getCenter();
}

locationResults.map((result,index)=>{
  if(i==index){
    Infowindow(i,result);
  
    scrollToRow(index);
    addActiveGrid(index); 
  }
   map.setZoom(14);	
  map.panTo(markerPins.current[i].getPosition()); 
  infoWindow.open(map, markerPins.current[i]); 
  openInfoWindow = true;
})


})

markerPins.current[i].addListener("mouseover", () => { 
markerPins.current[i].setIcon(marker_hover_icon);                
addActiveGrid(i);
})

markerPins.current[i].addListener("mouseout", () => { 
markerPins.current[i].setIcon(marker_icon);
let markerLabel = Number(i + 1 );
markerPins.current[i].setLabel({
  text: markerLabel,
  color: "#fff",
  });         
   removeActiveGrid();
})

}
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.0006213712;
    return miles.toFixed(2);
  }

  // infoWindow.addListener("closeclick", () => {
  //   locationResults.map((result, index) => {

  //     let resultelement = document.querySelectorAll(`.locator-${index+1}`);
  //     for (let index = 0; index < resultelement.length; index++) {
  //       resultelement[index].classList.remove('active')


  //     }
  //   })
  //   map.setZoom(4);
  //   infoWindow.close();
  //   // bounds.extend(mapCenter);         
  // });
 //new

 infoWindow.addListener("closeclick", () => {  
  infoWindow.close();
  removeActiveGrid();  
  zoomMapTo(searchZoom, searchCenter);
  openInfoWindow = false;         
}); 
    
  const hours = (result: any) => {

    return (
      <Hours hours={result} />
    )
  }


  function Infowindow(i: Number, result: any): void {
    const MarkerContent =
      (<div className="markerContent w-48 md:w-[21.875rem]">

        <h3 className="nameData"><a href={`${result.rawData.slug}.html`}>{result.name}</a></h3>
        <div className="addressData">
          <div className="flex flex-row mb-2">
            <Address address={result.rawData.address}/>
          </div>
        </div>
        <div className="flex flex-row mb-4">
    
          <Phone phone={result.rawData.mainPhone}/>
        </div>
        <div>
        <a className={ " icon-row"} href="javascript:void(0);"  >
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="19.106" height="19.106" viewBox="0 0 19.106 19.106">
              <path d="M170.493,161.44a9.053,9.053,0,1,0,9.053,9.053A9.058,9.058,0,0,0,170.493,161.44Zm.24.628a8.423,8.423,0,0,1,8.183,8.114h-1.45a.312.312,0,0,0,0,.624h1.45a8.423,8.423,0,0,1-8.183,8.112v-1.453h0a.312.312,0,0,0-.624,0v1.448a8.422,8.422,0,0,1-8.037-8.106h1.45a.312.312,0,0,0,0-.624h-1.45a8.423,8.423,0,0,1,8.037-8.109v1.448a.312.312,0,0,0,.624,0Zm-.311,3.14a.312.312,0,0,0-.313.313v5.434l-2.609,2.367a.313.313,0,0,0,.419.463l2.712-2.461h0a.312.312,0,0,0,.1-.231v-5.573a.312.312,0,0,0-.311-.313Z" transform="translate(-160.94 -160.94)" fill="#cc0c1f" stroke="#cc0c1f" stroke-width="1" fill-rule="evenodd" />
            </svg>
          </div>
          <OpenCloseStatus timezone={result.rawData.timezone} hours={result.rawData.hours} deliveryHours={{}}></OpenCloseStatus></a>
          </div>
         
      </div>
      ); 

    console.log(result.rawData.formattedPhone)
    let string = renderToString(MarkerContent);
    console.log(['string', string]);
    infoWindow.setContent(string);

  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }

  return (
    <div className={containerCssClass} ref={ref} />
  );
}

// TEMPORARY FIX
/* eslint-disable @typescript-eslint/no-explicit-any */
function getPosition(result: Result) {
  const lat = (result.rawData as any).yextDisplayCoordinate.latitude;
  const lng = (result.rawData as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}

//new
function removeActiveGrid(){
  let elements = document.querySelectorAll(".result");  
  for (let index = 0; index < elements.length; index++) {    
    elements[index].classList.remove('active')
  } 
}

function gridHover(markerPins:any, marker_hover_icon:any, marker_icon:any){
  let elements = document.querySelectorAll(".result");  
  for (let index = 0; index < elements.length; index++) {    
    elements[index].addEventListener("mouseover", () => { 
      markerPins.current[index].setIcon(marker_hover_icon);                
      addActiveGrid(index);
      
    });
    elements[index].addEventListener("mouseout", () => { 
      markerPins.current[index].setIcon(marker_icon); 
    });

  }
} 

function addActiveGrid(index){
  let elements = document.querySelectorAll(".result");  
  for (let index = 0; index < elements.length; index++) {    
    elements[index].classList.remove('active')
  }
  document.querySelectorAll(".result")[index].classList.add("active"); 
}

export function scrollToRow(index) {
  let result = [].slice.call(document.querySelectorAll(".result") || [])[0];
  let offset = 0;
  if(typeof [].slice.call(document.querySelectorAll(".result") || [])[index] != 'undefined'){
    offset = [].slice.call(document.querySelectorAll(".result") || [])[index].offsetTop - result.offsetTop; 
    [].slice.call(document.querySelectorAll(".result-list") || []).forEach(function (el) { el.scrollTop = offset; });    
  }
}
