import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
const UsersMap = props => {
  let userLocationMarker = null;

  if (props.userLocation) {
    userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
  }

  const usersMarkers = props.usersPlaces.map(userPlace => (
    <MapView.Marker coordinate={userPlace} key={userPlace.id} />
  ));
  console.log(usersMarkers);
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={props.userLocation}>
        {userLocationMarker}
        {usersMarkers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 20,
    width: "100%",
    height: 200
  },
  map: {
    width: "100%",
    height: "100%"
  }
});

export default UsersMap;
