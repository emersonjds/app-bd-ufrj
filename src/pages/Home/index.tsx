import { useState } from "react";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";
import { ActivityIndicator, Button, Divider } from "react-native-paper";

import api from "../../service/api";
import { Box } from "../../components/Spacing";
import Header from "../../components/Header";

const Home = () => {
  const graphicColor = ["red", "blue"];
  const [loading, setLoading] = useState(false);
  const [graphicData, setGraphicData] = useState([{}]);
  const [accuracy, setAccuracy] = useState("0.0");

  const getDataFromPython = async () => {
    try {
      setLoading(true);
      // const response = await api.get("/test");
      const response = await api.get("/spark");
      const { accuracy, count_neg, count_pos } = response.data;
      setGraphicData([
        {
          y: String(count_neg).slice(0, 2),
          x: `${String(count_neg).slice(0, 2)}%`,
        },
        {
          y: String(count_pos).slice(0, 2),
          x: `${String(count_pos).slice(0, 2)}%`,
        },
      ]);
      setAccuracy(String(accuracy).slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.log("ERRO", error);
    }
  };

  const startAnalysis = async () => {
    await getDataFromPython();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <View
        style={{
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            mode="contained"
            onPress={() => startAnalysis()}
            style={{
              backgroundColor: "#0000ff",
            }}
          >
            Iniciar Análise
          </Button>
        )}
      </View>

      <VictoryPie
        data={graphicData}
        width={300}
        height={350}
        innerRadius={50}
        colorScale={graphicColor}
        style={{
          labels: {
            fill: "black",
            fontSize: 15,
            padding: 7,
          },
        }}
      />
      <Box mt={10} mb={10}>
        <Text
          style={{
            marginBottom: 10,
          }}
        >
          Acurácia da análise: {loading ? "Carregando..." : `${accuracy}%`}
        </Text>
        <Divider />
      </Box>

      {/* Feliz */}
      <Box flexDirection={"row"} alignItems={"center"}>
        <Box height={20} width={20} borderRadius={35} backgroundColor={"red"} />
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          {loading ? "Carregando..." : "Sentimento de Felicidade"}
        </Text>
      </Box>

      {/* Triste */}
      <Box flexDirection={"row"} alignItems={"center"} mt={10}>
        <Box
          height={20}
          width={20}
          borderRadius={35}
          backgroundColor={"blue"}
        />
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          {loading ? "Carregando..." : "Sentimento de Tristeza"}
        </Text>
      </Box>
    </View>
  );
};

export default Home;
