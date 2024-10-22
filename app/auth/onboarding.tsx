import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { router } from "expo-router";

interface ItemProps {
  title: string;
  subTitle: string;
  image: ImageSourcePropType;
}

const data = [
  {
    title: "Note Down Expenses",
    subTitle: "Daily note your expenses to help manage money",
    image: require("../../assets/images/onboarding1.png"),
  },
  {
    title: "Note Down Expenses",
    subTitle: "Get your notifications or alert when you do the over expenses",
    image: require("../../assets/images/onboarding2.png"),
  },
  {
    title: "Note Down Expenses",
    subTitle: "Tracking your expense help make sure you don't overspend",
    image: require("../../assets/images/onboarding3.png"),
  },
];

const OnboardingItem = ({ title, image, subTitle }: ItemProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.item, { width }]}>
      <View />
      <Image source={image} style={styles.listImage} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

interface IndicatorViewProps {
  isSelected: boolean;
}

const IndicatorView = ({ isSelected }: IndicatorViewProps) => {
  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: isSelected ? "#0E33F3" : "#EBEEF0" },
      ]}
    />
  );
};

const onboarding = () => {
  const { width } = useWindowDimensions();
  const [pageIndex, setPageIndex] = useState<number>(0);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require("../../assets/images/icon.png")}
        />
        <Text style={styles.heading}>monex</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={(e) => {
          const index = Math.ceil(e.nativeEvent.contentOffset.x / width);
          if (pageIndex !== index) {
            setPageIndex(index);
          }
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OnboardingItem
            key={index.toString()}
            title={item.title}
            subTitle={item.subTitle}
            image={item.image}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.indicatorView}>
        {data.map((_, index) => (
          <IndicatorView
            key={index.toString()}
            isSelected={index === pageIndex}
          />
        ))}
      </View>
      <Button onPress={()=>router.replace('/auth/login')} buttonStyle={styles.btn} title={"Let's Go"} />
    </View>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  subtitle: {
    color: "#6B7580",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#242D35",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  listImage: {
    width: 251,
    height: 226,
    resizeMode: "contain",
  },
  item: {
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  heading: {
    color: "#242D35",
    fontSize: 24,
    marginLeft: 10,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  headerImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  btn: {
    marginHorizontal: 20,
    marginBottom: 50,
    borderRadius: 8,
    backgroundColor: "#0E33F3",
  },
  indicatorView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  indicator: {
    borderRadius: 34,
    width: 30,
    height: 5,
    marginRight: 7,
  },
});
