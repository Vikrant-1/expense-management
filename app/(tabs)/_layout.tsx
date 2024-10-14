import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const size = (focused: boolean) => (focused ? 22 : 18);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        headerTitleAlign:'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              size={size(focused)}
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expense",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              size={size(focused)}
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              size={size(focused)}
              name={focused ? "stats-chart" : "stats-chart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              size={size(focused)}
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
