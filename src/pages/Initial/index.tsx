import React from "react";
import { Box } from "../../components/Spacing";
import { Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const Initial: React.FC = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <Box flex={1} alignItems={"center"} justifyContent={"center"}>
        <Image
          source={require("/Users/emerson/Documents/workspace/ufrj/bigdata/src/assets/logo.png")}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Box mt={50} mb={20}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Matéria - Big Data e Data Science
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Prof: Alexandre A. B. Lima{" "}
          </Text>
        </Box>
      </Box>
      <Box mt={120} mb={20} justifyContent={"center"} alignItems={"center"}>
        <Button
          mode="contained"
          onPress={() => navigateToHome()}
          style={{
            backgroundColor: "#0000ff",
            width: 300,
          }}
        >
          Iniciar Análise
        </Button>
      </Box>
    </>
  );
};

export default Initial;
