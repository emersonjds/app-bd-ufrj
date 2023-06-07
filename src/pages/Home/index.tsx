import { useState } from "react";
import { Alert, Text, View } from "react-native";
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
  const [total, setTotal] = useState(0);
  const [countNeg, setCountNeg] = useState(0);
  const [countPos, setCountPos] = useState(0);

  const getDataFromPython = async () => {
    let totalSum = 0;
    let calcNeg = 0;
    let calcPos = 0;

    try {
      setLoading(true);
      //   const response = await api.get("/test");
      const response = await api.get("/spark");
      const { accuracy, count_neg, count_pos } = response.data;

      totalSum = count_neg + count_pos;
      calcNeg = Number((count_neg / totalSum) * 100);
      calcPos = Number((count_pos / totalSum) * 100);

      setCountNeg(count_neg);
      setCountPos(count_pos);
      setTotal(totalSum);

      setGraphicData([
        {
          y: `${String(calcNeg).slice(0, 5)}`,
          x: `${String(calcNeg).slice(0, 5)}%`,
        },
        {
          y: `${String(calcPos).slice(0, 5)}`,
          x: `${String(calcPos).slice(0, 5)}%`,
        },
      ]);
      setAccuracy(String(accuracy).slice(0, 4));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("ERRO", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar realizar a análise");
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
            fontSize: 12,
            padding: 5,
          },
        }}
      />

      <Box mt={10}>
        <Text
          style={{
            marginBottom: 10,
          }}
        >
          {loading ? "Carregando..." : `Quantidade analisada ${total}`}
        </Text>
        <Divider />
      </Box>

      <Box mt={10}>
        <Text
          style={{
            marginBottom: 10,
          }}
        >
          {loading ? "Carregando..." : `Quantidade de Positivos ${countPos}`}
        </Text>
        <Divider />
      </Box>

      <Box mt={10}>
        <Text
          style={{
            marginBottom: 10,
          }}
        >
          {loading ? "Carregando..." : `Quantidade de Negativos ${countNeg}`}
        </Text>
        <Divider />
      </Box>

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
