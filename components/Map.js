import React, { useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import { getCenter } from 'geolib'

const Map = ({ searchResult }) => {
  const [selectedLocation, setSelectedLocation] = useState({})
  //   Transform search result object into the {latitude:234, longitude:2342} object
  const coordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  //   the latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })
  return (
    <ReactMapGl
      mapStyle='mapbox://styles/usamanizamani/ckslmlsqw2te517pjv0os2mwf'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
            >
              📌
            </p>
          </Marker>

          {/* this popup if we click on a markup */}
          {selectedLocation.long === result.long ? (
            <Popup
              longitude={result.long}
              latitude={result.lat}
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGl>
  )
}

export default Map
