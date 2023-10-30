import React, { useState } from "react";
import { View, Text } from "react-native";
import { MultiFieldHeader } from "../../../ottery-ui/headers/MultiFieldHeader"; // Make sure to import the MultiFieldHeader component
const DummyPage = () => {
  const [selectedTab, setSelectedTab] = useState("dumm");

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
  };

  const handleSettings = () => {
    // Handle settings button click
    // You can implement your own logic here
  };

  return (
    <View style={{ flex: 10 }}>
      <MultiFieldHeader
        title="John Doe"
        tabs={["dumm", "Tab 2", "Tab 3"]}
        tab={selectedTab}
        onTab={handleTabChange}
        radius={0}
      />

      {/* The rest of your page content goes here */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Page Content Goes Here</Text>
      </View>
    </View>
  );
};

export default DummyPage;
