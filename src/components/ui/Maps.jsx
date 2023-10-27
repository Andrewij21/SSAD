import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

AnyReactComponent.propTypes = {
  text: PropTypes.string,
};

export default function Map() {
  const defaultProps = {
    center: {
      lat: -5.378985302379575,
      lng: 105.2519412033423,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={-5.378985302379575}
          lng={105.2519412033423}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
