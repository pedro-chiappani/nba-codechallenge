import {useNavigation} from '@react-navigation/native';
import React, { useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import useGetMatches from '../hooks/useGetMatches';
import {HomeScreenProps} from '../types/navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import MatchItem from '../components/matchitem';

const MatchScreen = () => {
  const {data, loading, error} = useGetMatches();
  let matches = data.filter(m => (m.Status != ("NotNecessary" || "Canceled"))).filter(m => !m.IsClosed)
  let matchesFinished = matches.filter(m => m.IsClosed)
  const navigation = useNavigation<HomeScreenProps>();

  const [partidos, setPartidos] = useState(['']);


  let fechaPartidos;
  if (matches.length > 0){
    let f = matches[0]["Day"].toString().split("T")[0].split("-")
    fechaPartidos ="Partidos "+(f[2]+"/" + f[1])
  }else{
    fechaPartidos = "No hay partidos hoy"
  }


  const copyToClipboard = () => {
    Clipboard.setString(fechaPartidos + '\n' + partidos.toString().replace(/,/g, '\n'));
  };

  const cleanPartidos = () => {
    setPartidos(['']);
  };

  const addPartido = (partido: string) => {
    if (!partidos.includes(partido)){
    setPartidos([...partidos, partido]);
    }
  };


  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
    <GestureHandlerRootView>
    <View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>
        {fechaPartidos}
      </Text>
      <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={copyToClipboard}>
              <Text>Copiar  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cleanPartidos}>
              <Text>Limpiar</Text>
            </TouchableOpacity>
          </View>
          </View>
      <Text></Text>
      <FlatList
        data={matches}
        renderItem={({item}) => (<MatchItem item={item} setPartidos={addPartido}/>)}
      />
      <Text></Text>
      <FlatList
        data={matchesFinished}
        renderItem={({item}) => (<MatchItem item={item} setPartidos={addPartido}/>)}
      />
    </View>
    </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  container: {
    flex: 1,
    paddingTop: 15,
    margin:10,
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 20,
  },
})

export default MatchScreen;
