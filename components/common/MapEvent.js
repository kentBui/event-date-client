import React, { useEffect, useState } from "react";
// import Geocode from "react-geocode";
import ReactMapGL, { Marker } from "react-map-gl";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";

const MapEvent = ({ event }) => {
  const [lat, setLat] = useState(37);
  const [lng, setLng] = useState(-122);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 37,
    longitude: -122,
    zoom: 8,
  });

  //   Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  //   useEffect(() => {
  //     Geocode.fromAddress(event.address).then(
  //       (res) => {
  //         const { lat, lng } = res.results[0].geometry.location;
  //         console.log({ lat, lng });
  //         setLat(lat);
  //         setLng(lng);
  //         setViewport((viewport) => ({
  //           ...viewport,
  //           latitude: lat,
  //           longitude: lng,
  //         }));
  //         setLoading(false);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }, [event]);

  if (!loading) {
    return <></>;
  } else {
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      >
        <Marker key={event.id} latitude={lat} longitude={lng}>
          <Image src={"/images/pin.svg"} alt="" width={30} height={30} />
        </Marker>
      </ReactMapGL>
    );
  }
};

export default MapEvent;
