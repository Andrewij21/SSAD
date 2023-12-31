import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import propTypes from "prop-types";
import "leaflet/dist/leaflet.css";

export default function Map({ marker }) {
  return (
    // Important! Always set the container height explicitly
    <div className="">
      <MapContainer
        center={[-5.37775571957218, 105.2521859368718]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-screen z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker &&
          marker.map((mark) => {
            if (mark.area.latLong.length === 0) return;
            return (
              <Marker key={mark._id} position={mark.area.latLong}>
                <Popup>{mark.name}</Popup>
              </Marker>
            );
          })}
        {/* <Marker position={[-5.37775571957218, 105.2521859368718]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  marker: propTypes.array,
};
