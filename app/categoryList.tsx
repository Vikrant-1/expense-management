import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { TextButton } from "@/components/Buttons";
import { router, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";

const expenseCategories = [
  { name: "Food", icon: "fast-food-outline" },
  { name: "Shopping", icon: "cart-outline" },
  { name: "Bills", icon: "wallet-outline" },
  { name: "Entertainment", icon: "tv-outline" },
  { name: "Healthcare", icon: "medkit-outline" },
  { name: "Travel", icon: "airplane-outline" },
  { name: "Groceries", icon: "basket-outline" },
  { name: "Personal Care", icon: "heart-outline" },
  { name: "Education", icon: "school-outline" },
  { name: "Rent", icon: "home-outline" },
  { name: "Insurance", icon: "shield-checkmark-outline" },
  { name: "Savings", icon: "cash-outline" },
  { name: "Gifts", icon: "gift-outline" },
  { name: "Investments", icon: "trending-up-outline" },
  { name: "Taxes", icon: "document-text-outline" },
  { name: "Fitness", icon: "barbell-outline" },
  { name: "Miscellaneous", icon: "ellipsis-horizontal-outline" },
];

const CategoryList = () => {
  const route = useRoute();
  const [category, setCategory] = useState( route?.params?.category ??"");
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={expenseCategories}
        numColumns={4}
        contentContainerStyle={{ gap: 20, paddingTop: 20 }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ width: "25%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setCategory(item.name);
              }}
              style={[
                styles.item,
                item.name === category && {
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                  backgroundColor: Colors.light.tintOpacity.tint10,
                },
              ]}
            >
              <Ionicons name={item.icon} size={25} color={Colors.light.tint} />
              {/* {item.name === category && (
                <Ionicons
                  style={{
                    position: "absolute",
                    right: -5,
                    top: -10,
                    zIndex: 3,
                  }}
                  name={"checkmark-circle"}
                  size={20}
                  color={Colors.light.tint}
                />
              )} */}
            </TouchableOpacity>
            <Text style={{ fontSize: 14, marginTop: 3 }}>{item.name}</Text>
          </View>
        )}
      />
      <TextButton
        title="Done"
        onPress={() => {
          router.navigate({ pathname: "/addexpense", params: { category } });
        }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  item: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    height: 50,
    width: 50,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});
