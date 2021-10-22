import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Globe from 'react-globe.gl';
import { transparentize } from 'polished';

const StyledGlobe = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('locations.json').then(res => res.json())
      .then(setLocations);
  }, []);

  const getAlt = (loc: any) => loc.hologrammers * .015;

  const getTooltip = (loc: any) => `
      <div style="text-align: center">
        <div><b>${loc.city}</b> ${loc.state}</div>
        <div>Hologrammer: ${loc.hologrammers}</div>
        <div>Everyone here: ${loc.names}</div>
      </div>
    `;

  const catColor = d3.scaleOrdinal(d3.schemeCategory10.map(col => transparentize(0.2, col)));

  return <Globe
    globeImageUrl="earth-night.jpg"
    backgroundImageUrl="night-sky.png"

    pointsData={locations}
    pointLat="latitude"
    pointLng="longitude"
    pointAltitude={getAlt}
    pointRadius={0.12}
    pointColor={(d: any) => catColor(d.city)}
    pointLabel={getTooltip}

    labelsData={locations}
    labelLat="latitude"
    labelLng="longitude"
    labelAltitude={d => getAlt(d) + 1e-6}
    labelDotRadius={0.12}
    labelDotOrientation={() => 'bottom'}
    labelColor={(d: any) => catColor(d.city)}
    labelText="name"
    labelSize={0.15}
    labelResolution={1}
    labelLabel={getTooltip}
  />;
};

export default StyledGlobe;