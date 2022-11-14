import  { useRef } from "react";
import * as React from "react";
// import ApiCall from "./ApiCall";
import {
    StandaloneSearchBox, LoadScript
  } from "@react-google-maps/api";


function Autocomplete(props){
    
    const inputRef:any = useRef();
    const [queryplace,setqueryplace]=React.useState();
    const handlePlaceChanged = () => { 
       
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
            console.log(place.formatted_address)
            console.log(place.geometry.location.lat())
            console.log(place.geometry.location.lng())
            // setqueryplace(place.formatted_address);
            props.inputclick(place.formatted_address)
           
        } 
    }
  

    return(
        <StandaloneSearchBox
            onLoad={ref => inputRef.current = ref}
            onPlacesChanged={handlePlaceChanged}
        >
            <input
                    className="form-control bg-transparent w-full mx-2 h-[53px] text-gray-500 focus:outline-none focus:ring-0"
                    type="text"
                    id="location-input"
                    placeholder="New York"
                    aria-label="E.g. New York"
                    defaultValue={props.defaultValue}
                    // autoComplete="off"
                    onChange={ (e)=>props.onChange(e) }
                    // onKeyUp={onKeyUp}
                  />
            
        </StandaloneSearchBox>
    )
}

export default Autocomplete