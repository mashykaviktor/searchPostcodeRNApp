import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface PostcodeResult {
  postcode: string;
  region: string;
  admin_district: string;
  parish: string;
  country: string;
  parliamentary_constituency: string;
  european_electoral_region: string;
  latitude: number;
  longitude: number;
}

const HeartButton = ({
  isFavorite,
  toggleFavorite,
}: {
  isFavorite: boolean;
  toggleFavorite: () => void;
}) => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={toggleFavorite}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "red" : "black"}
      />
    </TouchableOpacity>
  );
};

export default function App() {
  const navigation = useNavigation();
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<PostcodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const isFavorite = result
    ? favorites.some((item) => item.postcode === result?.postcode)
    : false;

  useEffect(() => {
    loadFavorites();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeartButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      ),
    });
  }, [navigation, isFavorite]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("@favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load favorites");
    }
  };

  const savedFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem("@favorites", JSON.stringify(newFavorites));
    } catch (error) {
      Alert.alert("Error", "Failed to save favorites");
    }
  };

  const toggleFavorite = async () => {
    // if (!result) return; // FIXME: should return null in case no result

    const exists = favorites.some((item) => item.postcode === result?.postcode);

    const updatedFavorites = exists
      ? favorites.filter((item) => item.postcode !== result?.postcode)
      : [...favorites, { postcode: result?.postcode, region: result?.region }];

    setFavorites(updatedFavorites);
    await savedFavorites(updatedFavorites);
  };

  const lookupPostcode = async () => {
    if (!postcode.trim()) {
      Alert.alert("Error", "Please enter a postcode");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(
          postcode.trim()
        )}`
      );
      const data = await response.json();

      if (data.status === 200) {
        setResult(data.result);
      } else {
        Alert.alert("Error", data.error || "Postcode not found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch postcode data");
    } finally {
      setLoading(false);
    }
  };

  const ResultItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | null;
  }) => (
    <View style={styles.resultItem}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>UK Postcode Lookup</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter postcode (e.g., SW1A 1AA)"
          value={postcode}
          onChangeText={setPostcode}
          autoCapitalize="characters"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={lookupPostcode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {result && (
        <ScrollView style={styles.resultContainer}>
          <ResultItem label="Postcode" value={result.postcode} />
          <ResultItem label="Region" value={result.region} />
          <ResultItem label="Admin District" value={result.admin_district} />
          <ResultItem label="Parish" value={result.parish} />
          <ResultItem label="Country" value={result.country} />
          <ResultItem
            label="Parliamentary Constituency"
            value={result.parliamentary_constituency}
          />
          <ResultItem
            label="European Electoral Region"
            value={result.european_electoral_region}
          />
          <ResultItem label="Latitude" value={result.latitude} />
          <ResultItem label="Longitude" value={result.longitude} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  resultItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
  },
  value: {
    flex: 2,
  },
});
