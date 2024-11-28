import { useEffect, createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostcodeResult } from "../types";

export const SharedStateContext = createContext<any | null>(null);

export const SharedStateProvider = ({ children }: any) => {
  const [sharedState, setSharedState] = useState<PostcodeResult[] | []>([]);
  const [result, setResult] = useState<PostcodeResult | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (sharedState) {
      const foo = async () => await savedFavorites(sharedState);
      foo();
    }
  }, [sharedState]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("@favorites");
      if (storedFavorites) {
        setSharedState(JSON.parse(storedFavorites));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load favorites");
    }
  };

  const savedFavorites = async (newFavorites: PostcodeResult[]) => {
    try {
      await AsyncStorage.setItem("@favorites", JSON.stringify(newFavorites));
    } catch (error) {
      Alert.alert("Error", "Failed to save favorites");
    }
  };

  return (
    <SharedStateContext.Provider
      value={{ sharedState, setSharedState, result, setResult }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => useContext(SharedStateContext);
