"use client";

import { FC, useRef, useState } from "react";
import MapGL, { Marker, MarkerDragEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventData, MapMouseEvent, MapboxEvent } from "mapbox-gl";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export interface IMapBoxView {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface IMapBox {
  initView: IMapBoxView;
  pin?: { lat: number; lng: number };
  coordHandler?: (pin: { lat: number; lng: number }) => void;
}

const MapBox: FC<IMapBox> = ({ initView, coordHandler }) => {
  const [viewState, setViewState] = useState(initView);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>({
    lat: initView.latitude,
    lng: initView.longitude,
  });

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const handleClick = (evt: MapMouseEvent & EventData) => {
    const coord = evt.lngLat;
    if (coordHandler) coordHandler(coord);
    setMarker(coord);
  };

  const dragHandler = (evt: MarkerDragEvent & EventData) => {
    const coord = evt.lngLat;
    if (coordHandler) coordHandler(coord);
    setMarker(coord);
  };

  const clickHandler = (evt: MapboxEvent<MouseEvent> & EventData) => {
    evt.originalEvent.stopPropagation();
    console.log("click to marker");
    setMarker(null);
  };

  return (
    <div ref={mapContainer} style={{ height: "100%" }}>
      <MapGL
        {...viewState}
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={(evt) => handleClick(evt)}
        cursor="pointer"
        maxZoom={20}
        minZoom={3}
      >
        {marker && (
          <div>
            <Marker
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="center"
              color="red"
              draggable
              onDragEnd={(evt) => dragHandler(evt)}
              onClick={(evt) => clickHandler(evt)}
            />
          </div>
        )}
      </MapGL>
    </div>
  );
};

export default MapBox;
