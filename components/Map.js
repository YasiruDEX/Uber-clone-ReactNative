import { View, Text } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps';
import tw from "twrnc";
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const map = () => {
    const Origin = useSelector(selectOrigin)


  return (
    <MapView
        style={{ flex: 1 }}
        mapType='mutedStandard'
        initialRegion={{
            latitude: Origin.location.lat,
            longitude: Origin.location.lng,
            latitudeDelta: 0.005, 
            longitudeDelta: 0.005,
        }}
    >
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
    </MapView>
  )
}

export default map