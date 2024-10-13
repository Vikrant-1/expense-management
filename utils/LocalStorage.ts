import { CURRENCY_KEY } from "@/constants/LocalStorage";
import { DEFAULT_CURRENCY } from "@/resources/Currencies";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setLocalItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(`Error while set Local value for ${key}`, error);
  }
};

const getLocalItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(`Error while get Local value for ${key}`, error);
  }
};

export const setLocalCurrency = async (currency = DEFAULT_CURRENCY) => {
  await setLocalItem(CURRENCY_KEY, currency);
};

export const getLocalCurrency = async () => {
  const value = await getLocalItem(CURRENCY_KEY);
  return value ?? DEFAULT_CURRENCY;
};
