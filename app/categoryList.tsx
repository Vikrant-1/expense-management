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
import { RouteProp, useRoute } from "@react-navigation/native";

interface ExpenseCategoryProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  filledIcon: keyof typeof Ionicons.glyphMap;
}

type RouteParams = {
  params: {
    category: string;
    icon: keyof typeof Ionicons.glyphMap;
  };
};

const expenseCategories: ExpenseCategoryProps[] = [
  { name: "Food", icon: "fast-food-outline", filledIcon: "fast-food" },
  { name: "Shopping", icon: "cart-outline", filledIcon: "cart" },
  { name: "Bills", icon: "wallet-outline", filledIcon: "wallet" },
  { name: "Entertainment", icon: "tv-outline", filledIcon: "tv" },
  { name: "Healthcare", icon: "medkit-outline", filledIcon: "medkit" },
  { name: "Travel", icon: "airplane-outline", filledIcon: "airplane" },
  { name: "Groceries", icon: "basket-outline", filledIcon: "basket" },
  { name: "Personal Care", icon: "heart-outline", filledIcon: "heart" },
  { name: "Education", icon: "school-outline", filledIcon: "school" },
  { name: "Rent", icon: "home-outline", filledIcon: "home" },
  {
    name: "Insurance",
    icon: "shield-checkmark-outline",
    filledIcon: "shield-checkmark",
  },
  { name: "Savings", icon: "cash-outline", filledIcon: "cash" },
  { name: "Gifts", icon: "gift-outline", filledIcon: "gift" },
  {
    name: "Investments",
    icon: "trending-up-outline",
    filledIcon: "trending-up",
  },
  { name: "Taxes", icon: "document-text-outline", filledIcon: "document-text" },
  { name: "Fitness", icon: "barbell-outline", filledIcon: "barbell" },
  {
    name: "Miscellaneous",
    icon: "ellipsis-horizontal-outline",
    filledIcon: "ellipsis-horizontal",
  },
];

const CategoryList = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [category, setCategory] = useState(route?.params?.category ?? "");
  const [icon, setIcon] = useState(route?.params?.icon ?? "");

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
                setIcon(item.filledIcon);
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
              <Ionicons
                name={item.name === category ? item.filledIcon : item.icon}
                size={25}
                color={Colors.light.tint}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 14, marginTop: 3 }}>{item.name}</Text>
          </View>
        )}
      />
      <TextButton
        title="Done"
        onPress={() => {
          router.navigate({
            pathname: "/addexpense",
            params: { category, icon },
          });
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
