import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location?.coords.latitude ?? 45.764,
        longitude: location?.coords.longitude ?? 4.8357,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation
    >
      {/* Fake toilet marker for now */}
      <Marker
        coordinate={{ latitude: 45.764, longitude: 4.8357 }}
        title="Public Toilet"
        description="Test marker"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
