import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from 'react';
import * as React from "react";
import { AnswerExperienceConfig, googleMapsConfig, limit } from "..//../config/globalConfig";
import { FilterSearch, VerticalResults, ResultsCount, LocationBias, Pagination, StandardCard, StandardFacets } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import { useSearchState, Result } from "@yext/search-headless-react";
import Geocode from "react-geocode";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Address from "../commons/Address";

var params1: any = { latitude: 48.864716, longitude: 2.349014 }
var mapzoom = 8;
var centerLatitude =48.864716;
var centerLongitude =2.349014;
const   SearchLayout = (): JSX.Element => {
  const [centerLatitude, setCenterLatitude] = useState(googleMapsConfig.centerLatitude);
  const [centerLongitude, setCenterLongitude] = useState(googleMapsConfig.centerLongitude);
  const [optiontext, setOptiontext] = useState('');
  const [check, setCheck] = useState(false)
  const locationResults = useSearchState(s => s.vertical.results) || [];
  const [inputvalue, setInputValue] = React.useState('');
  const [offset, setOffset] = React.useState(0);
  const searchActions = useSearchActions();
  const state = useSearchState(s => s) || [];
  const [optionclick, setOptionClick] = useState(true);
  let branches:any=[];
  var searchKey: any;
  var target;

  var firstTimeRunners = true;


  const FirstLoad = () => {
    setCheck(true)
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(function (position) {
      //   // console.log(position, 'position')
      //   let params: any = {
      //     latitude: position.coords.latitude,
      //     longitude: position.coords.longitude
      //   };
      //   params1 = params
      //   searchActions.setUserLocation(params1);
      //   searchActions.setVerticalLimit(4);
      //   searchActions.executeVerticalQuery();
      // }, function (error) {
      //   if (error.code == error.PERMISSION_DENIED) {
      //     params1 = {
      //       latitude:48.864716 ,
      //       longitude:2.349014
      //     };
      //     searchActions.setUserLocation(params1);
      //     searchActions.setVerticalLimit(4);
      //     searchActions.executeVerticalQuery();
      //   }

      // });

    }
    params1 = {
      latitude: 48.864716,
      longitude: 2.349014
    };
  
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(4);
    searchActions.executeVerticalQuery();
  }
  const onClick = () => {
  
      if (navigator.geolocation) {
  
        const error = (error: any) => {
          if (error.code == 1) {
            setInputValue('Please allow your Location');
          } else {
            setInputValue('Please allow your Location');
          }
        }
  
        navigator.geolocation.getCurrentPosition(function (position) {
  
        Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
        Geocode.fromLatLng(position.coords.latitude,position.coords.longitude).then(
          (response:any) => {
            if (response.results[0]) {           
              // setInputValue(response.results[0].formatted_address);
              setTimeout(function (){
                document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);
              }, 1000);  
              searchActions.setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              
              setCenterLatitude(position.coords.latitude);
              setCenterLongitude(position.coords.longitude);
              searchActions.setVertical(AnswerExperienceConfig.verticalKey);
              searchActions.setQuery(response.results[0].formatted_address);
              searchActions.executeVerticalQuery();           
          }
        },
          (error:any) => {
            console.error(error);
          }
        );
            
  
        }, error, {
          timeout: 10000,
        });
  
      }
    }
  const bindInputKeyup = () => {
    searchKey = document.getElementsByClassName('FilterSearchInput');
    if (searchKey.length) {
      searchKey[0].addEventListener("keyup", function (e: any) {
        // console.log('Bind');
        if (searchKey[0].value.trim() == "") {
          setOptionClick(true);
          setCenterLatitude(params1.latitude);
          setCenterLongitude(params1.longitude);
          searchActions.setUserLocation(params1);
          searchActions.setVertical("locations")
          searchActions.setQuery("");
          searchActions.setVerticalLimit(4);
          searchActions.executeVerticalQuery();
        }
      })
    }
  }
  const handleEnterPress = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    searchKey[0].addEventListener("keydown", function (e: any) {
      if (e.key == "Enter") {
        // console.log('Press enter')
        setOptionClick(false);
        setCheck(true)
        let Search = (searchKey[0].value);
        mapzoom = 16;
        getCoordinates(Search);
        document.querySelector('.z-10').classList.add('hidden');
      }
    })
  }
  const getParents = (elem: any) => {
    while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
      elem = elem.parentNode;
      if (elem.classList.contains('options')) {
        return true;
      }
    }
    return false;
  }
  const optionClickHandler = () => {

    document.body.addEventListener('click', function (e: any) {
      const isOptionClick = getParents(e.target)
      if (isOptionClick) {
        var text = "";
        if (e.target.children.length) {
          for (let index = 0; index < e.target.children.length; index++) {
            text += e.target.children[index].innerText;
          }
          // console.log('text', text);

          if (text.trim() != "") {
            searchActions.setQuery("");
            searchActions.executeVerticalQuery();
            getCoordinates(text);
          }
        } else {
          text += e.target.innerText;
          if (text.trim() != "") {
            searchActions.setQuery("");
            searchActions.executeVerticalQuery();
            getCoordinates(text);
          }
        }
      }
    });
  }
 
  const Findinput = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    let Search = (searchKey[0].value);
     console.log(Search,"search")
    setInputValue('');
    getCoordinates(Search);

  }
  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }
    bindInputKeyup();
    handleEnterPress();
    optionClickHandler();
    
  }, [])

  function getCoordinates(address: String) {
    // console.log('getCoordinates');
      fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18')
      .then(response => response.json())
      .then(data => {
        data.results.map((res: any) => {
          const userlatitude = res.geometry.location.lat;
          const userlongitude = res.geometry.location.lng;
          let params = {
            latitude: userlatitude,
            longitude: userlongitude
          };

          // console.log(userlatitude,userlongitude) 
          setCenterLatitude(userlatitude);
          setCenterLongitude(userlongitude);
          mapzoom = 12;
          setCheck(true);
          searchActions.resetFacets();
          searchActions.setQuery(address);
          searchActions.setUserLocation(params);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();

        })
      })

  }
 
  
  // alert(branches)

  return (
    <>
     <div className="locator-full-width">
        <div className="locator-container">
          <div className="result-listing">
            <div className="search-block">
              <div className="location-with-filter">
                <h3 className="title">
                  <ResultsCount
                    customCssClasses={{ resultsCountContainer: "result-count" }}
                  />
                </h3>
                <button className="ghost-button before-icon"
                  title="Search using your current location!"
                  id="useLocation" onClick={onClick}  >
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <path
                      d="M8.5,5.955A2.545,2.545,0,1,0,11.045,8.5,2.545,2.545,0,0,0,8.5,5.955Zm5.689,1.909A5.724,5.724,0,0,0,9.136,2.811V1.5H7.864V2.811A5.724,5.724,0,0,0,2.811,7.864H1.5V9.136H2.811a5.724,5.724,0,0,0,5.053,5.053V15.5H9.136V14.189a5.724,5.724,0,0,0,5.053-5.053H15.5V7.864ZM8.5,12.955A4.455,4.455,0,1,1,12.955,8.5,4.451,4.451,0,0,1,8.5,12.955Z"
                      transform="translate(-1.5 -1.5)"
                    />
                  </svg>
                  Utilise ma location
                </button>
              </div>

              {/* <LocationBias />  */}
              <div className="search-form">
                <FilterSearch
                  customCssClasses={{
                    filterSearchContainer: "mb-0",
                    inputElement: "FilterSearchInput",
                  }}
                  // placeholder={inputvalue}
                  searchOnSelect={true}
                  searchFields={[
                    {
                      entityType: "location",
                      fieldApiName: "name",

                    },
                    {
                      entityType: "location",
                      fieldApiName: "address.line1",

                    },
                    {
                      entityType: "location",
                      fieldApiName: "address.line2",

                    },
                    {
                      entityType: "location",
                      fieldApiName: "address.city",

                    },
                    {
                      entityType: "location",
                      fieldApiName: "address.postalCode",

                    },

                    // {
                    //   entityType: "location",
                    //   fieldApiName: "builtin.location",                        
                    // },
                  ]}

                />
                <button
                  className="button"
                  aria-label="Search bar icon"
                  id="search-location-button" onClick={Findinput}><svg aria-hidden="true" focusable="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg></button>
              </div>
              
            </div>
            <PerfectScrollbar className="result-list">
              {locationResults && locationResults.length > 0 ? (
                <VerticalResults<Location>
                  displayAllOnNoResults={false}
                  customCssClasses={{
                    verticalResultsContainer:
                      "resultList mb-5 result-list-inner",
                  }}
                  CardComponent={LocationCard}
                />
              ) : (
                <div className="no-data">
                  <p>Aucun emplacement trouvé</p>
                </div>
              )}
              <Pagination />
            </PerfectScrollbar>
          </div>
          <div className="map-section">
            {/* <MapboxMap<Location>
                    mapboxAccessToken="pk.eyJ1IjoicmFodWxyYXRob3JlIiwiYSI6ImNsOGVoM2NycjFsMDYzbnFrdGlpbGE4djEifQ.IWRyhB7OIqpBdtUtj0ki_w"
                    getCoordinate={(location) =>
                    location.rawData.yextDisplayCoordinate}
                    PinComponent={MapPin}
                /> */}

            <GoogleMaps
              apiKey='AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18'
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              defaultZoom={5}
              showEmptyMap={true}
            />
          </div>
        </div>
      </div>
      
      
    </>
  );
};

export default SearchLayout;

