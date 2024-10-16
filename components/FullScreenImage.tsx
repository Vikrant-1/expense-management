import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

interface FullScreenImageProps {
  uri: string;
  isVisible: boolean;
  closeModal: () => void;
}

const FullScreenImage = ({ uri, isVisible = false ,closeModal}: FullScreenImageProps) => {
  const { height } = useWindowDimensions();

  return (
    <Modal transparent visible={isVisible} onRequestClose={closeModal}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.7)" />
      <Pressable
        onPress={closeModal}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <View style={{ width: "100%", height: height / 1.8 }}>
          <Pressable style={{ flex: 1 }}>
            <Image
              source={{ uri: uri }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default FullScreenImage;

const styles = StyleSheet.create({});
