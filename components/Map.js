import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, {Marker} from 'react-native-maps';
import tw from "twrnc";
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const map = () => {
    const Origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!Origin || !destination) return;

        // Zoom & fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        })
    }, [Origin, destination])

  return (
    <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapType='mutedStandard'
        initialRegion={{
            latitude: Origin.location.lat,
            longitude: Origin.location.lng,
            latitudeDelta: 0.005, 
            longitudeDelta: 0.005,
        }}
    >

    {Origin && destination && (
        <MapViewDirections
            origin={Origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor='black'
        />
    )}

    {Origin?.location && (
        <Marker
            coordinate={{
                latitude: Origin.location.lat,
                longitude: Origin.location.lng,
            }}
            title='Origin'
            description={Origin.description}
            identifier='origin'
        />
    )}
    {destination?.location && (
        <Marker
            coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
            }}
            title='Destination'
            description={destination.description}
            identifier='destination'
        />
    )}
    </MapView>
  )
}

export default map