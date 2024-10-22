import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { DocumentPickerAsset } from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import FullScreenImage from "./FullScreenImage";

// Function to get icon based on file type
const getFileIcon = (mimeType: string) => {
  if (mimeType.includes("image"))
    return require("../assets/images/ImageIcon.png"); // Replace with the image for images
  if (mimeType.includes("pdf")) return require("../assets/images/pdfFile.jpg"); // Replace with the image for PDFs
  if (mimeType.includes("word"))
    return require("../assets/images/FileIcon.jpg"); // Replace with the image for Word files
  if (mimeType.includes("excel"))
    return require("../assets/images/excelFile.jpg"); // Replace with the image for Excel files
  if (mimeType.includes("video"))
    return require("../assets/images/FileIcon.jpg"); // Replace with the image for videos
  if (mimeType.includes("audio"))
    return require("../assets/images/SoundFile.jpg"); // Replace with the image for audio files
  if (mimeType.includes("text"))
    return require("../assets/images/FileIcon.jpg"); // Replace with the image for text files
  return require("../assets/images/FileIcon.jpg"); // Default icon for other files
};

interface AttachmentsProps {
  attachments: DocumentPickerAsset[];
  removeAttachments: (index: number) => void;
}

const Attachments = ({ attachments, removeAttachments }: AttachmentsProps) => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [url, setUrl] = useState("");

  return (
    <View style={styles.list}>
      {attachments.map((item, index) => (
        <View key={item.name + index} style={styles.item}>
          <Pressable
            onPress={() => {
              setUrl(item.uri);
              setShowFullScreen(true);
            }}
          >
            <Image
              style={styles.image}
              source={
                item.uri ? { uri: item.uri } : getFileIcon(item.mimeType ?? "")
              }
            />
          </Pressable>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => removeAttachments(index)}
          >
            <Ionicons name="close-circle" size={24} color={"#36454F"} />
          </TouchableOpacity>
        </View>
      ))}
      <FullScreenImage
        uri={url}
        isVisible={showFullScreen}
        closeModal={() => setShowFullScreen(false)}
      />
    </View>
  );
};

export default Attachments;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    paddingLeft: 55,
    paddingTop: 8,
    flexWrap: "wrap",
    gap: 10,
  },
  item: { marginRight: 25, marginTop: 15 },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "stretch",
  },
  closeBtn: {
    position: "absolute",
    right: -8,
    top: -8,
  },
});
