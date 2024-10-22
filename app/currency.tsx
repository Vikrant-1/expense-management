import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CURRENCIES_DATA, DEFAULT_CURRENCY } from "@/resources/Currencies";
import { Colors } from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import { getLocalCurrency, setLocalCurrency } from "@/utils/LocalStorage";

interface CurrencyTileProps {
  flag: string;
  name: string;
  symbol: string;
  code: string;
  onSelectCurrency: () => void;
}

const CurrencyTile = ({
  flag,
  name,
  symbol,
  onSelectCurrency,
}: CurrencyTileProps) => {
  return (
    <TouchableOpacity style={styles.currencyTile} onPress={onSelectCurrency}>
      <View style={styles.currencyTileLeft}>
        <Text style={styles.flag}>{flag}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.currencySymbol}>{symbol}</Text>
    </TouchableOpacity>
  );
};

const CurrencyScreen = () => {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [search, setSearch] = useState("");
  const { height } = useWindowDimensions();

  useEffect(() => {
    const getSavedCurrency = async () => {
      const value = await getLocalCurrency();
      setCurrency(value);
    }

    getSavedCurrency();
  }, []);

  const onSelectCurrency = async (currency = DEFAULT_CURRENCY) => {
    await setLocalCurrency(currency);
    router.navigate("/addexpense");
  };
  return (
    <View style={styles.page}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholderText="Type here Currency"
        style={{ marginHorizontal: 8, marginVertical: 10 }}
        onPressClear={() => setSearch("")}
      />
      <FlatList
        contentContainerStyle={{ paddingTop: 10, paddingBottom: height / 2 }}
        data={CURRENCIES_DATA}
        keyExtractor={(item) => item.code}
        renderItem={({ item, index }) => (
          <CurrencyTile
            key={item.code}
            flag={item.flag}
            name={item.name}
            symbol={item.symbol}
            code={item.code}
            onSelectCurrency={() => onSelectCurrency(item)}
          />
        )}
      />
    </View>
  );
};

export default CurrencyScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  currencyTile: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingRight: 15,
    marginBottom: 2,
  },
  currencyTileLeft: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 22,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: 8,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.light.textOpacity.text70,
  },
});
