import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { DocumentPickerAsset } from "expo-document-picker";

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
}

const Attachments = ({ attachments }: AttachmentsProps) => {
  return (
    <FlatList
      style={{ marginVertical: 15 }}
      data={attachments}
      horizontal
      keyExtractor={(item) => item.name + item.uri}
      renderItem={({ item, index }) => (
        <Image
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
            marginRight: 10,
          }}
          source={getFileIcon(item.mimeType ?? "")}
        />
      )}
    />
  );
};

export default Attachments;

const styles = StyleSheet.create({});
