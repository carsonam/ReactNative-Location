import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FetchLocation from "./src/FetchLocation";
import UsersMap from "./src/UsersMap";
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: null,
      usersPlaces: []
    };
  }
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421
          }
        });
        fetch("https://locationapp-1b3c8.firebaseio.com/locations.json", {
          method: "POST",
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      },
      err => {
        console.log(err);
      }
    );
  };

  getUsersPlacesHandler = () => {
    fetch("https://locationapp-1b3c8.firebaseio.com/locations.json")
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        console.log(parsedRes);
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({
          usersPlaces: placesArray
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Button
            title="Get User Places"
            onPress={this.getUsersPlacesHandler}
          />
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap
          userLocation={this.state.userLocation}
          usersPlaces={this.state.usersPlaces}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
