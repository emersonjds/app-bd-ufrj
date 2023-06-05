import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import PieChart from 'react-native-pie-chart'
import { VictoryPie } from 'victory-native';
import api from './src/service/api';

export default function App() {
  const graphicData = [
    { y: 22, x: '22%' },
    { y: 88, x: '88%' },
  ]
  const graphicColor = ['red', 'blue']
  const [dataSet, setDataSet] = useState(null)

  const getDataFromPython = async () => {
    // try {
    //   const response1 = await api.get('/healthcheck')
    //   console.log('RETORNO', response1.data)
    // } catch (error) {
    //   console.log('ERRO', error)
    // }

    try {
      console.log('CHAMANDO API SPARK')
      const response = await api.get('/spark')
      console.log('RETORNO', response.data)
      setDataSet(response.data)
    } catch (error) {
      console.log('ERRO', error)
    }


  }

  useEffect(() => {
    console.log('CARREGADO');
    (async () => {
      await getDataFromPython()
    })()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>
        Trabalho UFRJ
      </Text>
      <Text>
        Analise de Sentimentos com Spark ML
      </Text>
      <VictoryPie
        data={graphicData}
        width={300}
        height={350}
        innerRadius={50}
        colorScale={graphicColor}
        style={{
          labels: {
            fill: 'black', fontSize: 15, padding: 7,
          },
        }}
      />

      {/* Feliz */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            // borderRadius: 35,
            backgroundColor: 'red',
          }}
        ></View>
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          Sentimento de Tristeza
        </Text>
      </View>

      {/* Triste */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            // borderRadius: 35,
            backgroundColor: 'blue',
          }}
        ></View>
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          Sentimento de Felicidade
        </Text>
      </View>


    </View>
  );
}


