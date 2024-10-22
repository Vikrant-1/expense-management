import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/themed";
import { router } from "expo-router";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showpassord, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.headerImage}
        />
        <Text style={styles.heading}>monex</Text>
      </View>
      <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user", color: "#000" }}
          onChangeText={(value) => setUsername(value)}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock", color: "#000" }}
          rightIcon={{
            type: "ionicon",
            name: showpassord ? "eye" : "eye-off",
            color: "#000",
            onPress: () => setShowPassword(!showpassord),
          }}
          onChangeText={(value) => setPassword(value)}
        />
        <Button onPress={() => {}} buttonStyle={styles.btn} title={"Login"} />
      </View>
      <TouchableOpacity onPress={() => {}} style={{ alignSelf: "center" }}>
        <Text style={styles.forgotText}>FORGOT PASSWORD</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "#242D35",
          fontSize: 16,
          alignSelf: "center",
          marginVertical: 30,
        }}
      >
        Or
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#B0B8BF",
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../../assets/images/googleicon.png")}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text
          style={{
            marginLeft: 20,
            color: "#242D35",
            fontSize: 16,
            lineHeight: 24,
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Continue with Google
        </Text>
        <View style={{ width: 25 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "#242D35", fontSize: 14 }}>
          Don’t have an account?
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("/auth/register")}
          style={{ marginLeft: 4 }}
        >
          <Text style={{ color: "#0E33F3" }}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    alignSelf: "center",
    marginTop: 30,
    alignItems: "center",
  },
  headerImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  heading: {
    color: "#242D35",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 10,
  },
  btn: {
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 8,
    backgroundColor: "#0E33F3",
  },
  forgotText: { color: "#6B7580", fontSize: 14, fontWeight: "600" },
});
