import { useState } from "react";
import ReactMapGL from "react-map-gl";
import getCenter from "geolib/es/getCenter";

const Mapbox = ({ searchResults }) => {
	const coordinates = searchResults.map((result) => ({
		longitute: result.long,
		latitude: result.lat,
	}));

	const center = getCenter(coordinates);

	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		longitude: center.longitutde,
		latitude: center.latitude,
		zoom: 11,
	});

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/oke-yomi/ckz93wbve000014qeq4wjnbnh"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport}
			onMove={(evt) => setViewport(evt.viewport)}></ReactMapGL>
	);
};

export default Mapbox;
