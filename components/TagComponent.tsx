import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TagComponentProps {
  tags: string[];
  onPress: () => void;
  onSelectTag: () => void;
}

const TagComponent = ({ tags = [], onPress }: TagComponentProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="pricetag" size={20} color={Colors.light.tint} />
      <View style={styles.tagView}>
        {tags.length <= 0 ? (
          <TouchableOpacity onPress={onPress}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              Select tags for expense ...
            </Text>
          </TouchableOpacity>
        ) : (
          <ScrollView>
            {tags.map((item) => (
              <View style={styles.tag}>
                <Text style={styles.tagTitle}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default TagComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: 8,
    marginTop: 20,
    flexDirection: "row",
  },
  tagView: {
    width: "70%",
    marginLeft: 25,
  },
  tag: {},
  tagTitle: {},
});
