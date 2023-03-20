import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMark from '../../Assets/nematoid.png';
import './MapComponent.css';
import axios from 'axios';




const LocationPin = ({ datetime }) => (
  <div className="pin">
    <img alt={"nematoid, a small worm that plagues vegs"} src={LocationMark} className="map-pin"/>
    <p className="pin-text">{datetime}</p>
  </div>
)




export default function MapGoogle(props){
  
   const defaultProps = {
     center: {
       lat: -16,
       lng: -48
     },
     zoom: 12
   };

   const [map,setMap] = useState();
   const [points,setPoints] = useState([{}]);
   const markerGenerator = (pointsinfo) => {
     let grid = [];
     for(let i = 0; i < pointsinfo.length; i++){
      console.log(pointsinfo[i]);
       const pointvalues = Object.values(pointsinfo[i]);
       debugger;
       const returnArray = <div lat={pointvalues[5]} lng={pointvalues[6]} key={i}>
                             <LocationPin datetime={pointvalues[2]}>                              
                             <p>Longitude: {pointvalues[5]}</p>
                             <p>Latitude: {pointvalues[6]}</p>
                             </LocationPin>
                           </div>
       grid = [...grid, returnArray]; 
     }
     let final = <div style={{ height: '100vh', width: '100%' }}>
     <GoogleMapReact
       bootstrapURLKeys={{ key: "AIzaSyD-j_tGpO53zw_greEKej9g-T1ILFYcRcA" }}
       defaultCenter={defaultProps.center}
       defaultZoom={defaultProps.zoom}
     >
      
         {grid}
     </GoogleMapReact>
   </div>
     return final;
  
   }
   const getPoints = async() =>{
    const configuration = {
      method: "Get",
      url: "http://localhost:4000/pontos",
    };
    await axios(configuration)
      .then((result) => {  
        if(result.data.points.length > 0){
          setPoints(points);
          const pointsInfo = markerGenerator(result.data.points);
          setMap(pointsInfo);
        }      
      })
      .catch((error) => {
        console.log(error);
      });
   }

  
 useEffect(() => {
  if(!map){
      getPoints();
      setMap(true); 
    }  
  
 })

  return (
    // Important! Always set the container height explicitly
    <div>
      {map}
    </div>
  );
}