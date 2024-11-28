import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSharedState } from "../providers/SharedStateProvider";
import { PostcodeResult } from "../types";

export const HeartButton = () => {
  const { sharedState, setSharedState, result } = useSharedState();

  const isFavorite = result
    ? sharedState.some(
        (item: PostcodeResult) => item.postcode === result?.postcode
      )
    : false;

  const toggleFavorite = () => {
    if (!result) return;

    const exists = sharedState.some(
      (item: PostcodeResult) => item.postcode === result?.postcode
    );

    const updatedFavorites = exists
      ? sharedState.filter(
          (item: PostcodeResult) => item.postcode !== result?.postcode
        )
      : [
          ...sharedState,
          { postcode: result?.postcode, region: result?.region },
        ];

    setSharedState(updatedFavorites);
  };

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
