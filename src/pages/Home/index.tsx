import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { VictoryPie } from "victory-native";
import { ActivityIndicator, Button } from "react-native-paper";

import api from "../../service/api";

const Home = () => {
  const graphicData = [
    { y: 22, x: "22%" },
    { y: 88, x: "88%" },
  ];
  const graphicColor = ["red", "blue"];
  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDataFromPython = async () => {
    try {
      setLoading(true);
      const response = await api.get("/spark");
      console.log("RETORNO", response.data);
      setDataSet(response.data);
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
      <Text>Trabalho UFRJ</Text>
      <Text>Analise de Sentimentos com Spark ML</Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button mode="contained" onPress={() => startAnalysis()}>
            Iniciar Análise
          </Button>
        )}
      </View>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
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
      )}

      {/* Feliz */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: "red",
          }}
        ></View>
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          {!loading ? "Carregando..." : "Sentimento de Felicidade"}
        </Text>
      </View>

      {/* Triste */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            // borderRadius: 35,
            backgroundColor: "blue",
          }}
        ></View>
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          {loading ? "Carregando..." : "Sentimento de Felicidade"}
        </Text>
      </View>
    </View>
  );
};

export default Home;
