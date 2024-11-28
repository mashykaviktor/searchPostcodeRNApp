import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSharedState } from "../providers/SharedStateProvider";
import { PostcodeResult } from "../types";

export default function FavoritesView() {
  const { sharedState, setSharedState } = useSharedState();

  const removeFavorite = async (postcode: string) => {
    const updatedFavorites = sharedState.filter(
      (item: PostcodeResult) => item.postcode !== postcode
    );
    setSharedState(updatedFavorites);
  };

  const renderItem = ({
    item,
  }: {
    item: { postcode: string; region: string };
  }) => (
    <View style={styles.favoriteItem}>
      <View style={styles.favoriteInfo}>
        <Text style={styles.postcode}>{item.postcode}</Text>
        <Text style={styles.region}>{item.region}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.postcode)}
      >
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {sharedState.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={sharedState}
          renderItem={renderItem}
          keyExtractor={(item) => item.postcode}
          style={styles.list}
        />
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
  resultWrapper: {
    flex: 1,
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
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginTop: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: "#007AFF",
    marginLeft: 8,
    fontSize: 16,
  },
  // Favorites Screen Styles
  list: {
    flex: 1,
  },
  favoriteItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  favoriteInfo: {
    flex: 1,
  },
  postcode: {
    fontSize: 18,
    fontWeight: "bold",
  },
  region: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
