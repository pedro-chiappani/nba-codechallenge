import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import {HomeScreenProps} from '../types/navigation';
import Clipboard, {useClipboard} from '@react-native-clipboard/clipboard';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import ScoreItem from '../components/scoreitem';
import useGetScores from '../hooks/useGetScores';
import cadena from '../components/generateStrigns';

const ScoreScreen = () => {
  const {dat, load, err} = useGetScores();
  const [cad, setCad] = useState(['']);
  const navigation = useNavigation<HomeScreenProps>();
  const scores = dat.filter(score => score.IsClosed);
  let fechaRes;
  if (scores.length > 0) {
    let f = scores[0]['Day'].toString().split('T')[0].split('-');
    fechaRes = 'Resultados ' + (f[2] + '/' + f[1]);
  } else {
    fechaRes = 'No hay resultados para mostrar';
    //fechaRes = "BOSTON CELTICS CAMPEONES 2024"
  }

  const [partidos, setPartidos] = useState(['']);

  // scores.map(score => {setPartidos(cadena(score))})

  const [coppiedText, setCopiedText] = useState('');
  //   console.log("clipboard " + data)
  // console.log("cad: " + cad)

  const copyToClipboard = () => {
    Clipboard.setString(
      fechaRes + '\n' + partidos.toString().replace(/,/g, '\n'),
    );
  };
  const listener = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad,text + "\n"])
    // setString("")
    // console.log("changed!")};
    if (Clipboard.hasString()) {
      // console.log("Tiene: " + text)
    }
  };
  Clipboard.addListener(listener);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad, text + "\n"])
    setCopiedText(text);
  };

  const cleanPartidos = () => {
    setPartidos(['']);
  };

  const addPartido = (partido: string) => {
    setPartidos([...partidos, partido]);
  };


  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <GestureHandlerRootView>
        <View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{fechaRes}</Text>

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
            data={scores}
            renderItem={({item}) => (
              <ScoreItem item={item} setPartidos={addPartido} />
            )}
          />
          <Text></Text>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    paddingTop: 15,
    margin: 10,
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 20,
  },
});

export default ScoreScreen;

// <TouchableOpacity onPress={copyToClipboard}>
// <Text>Alo</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={fetchCopiedText}>
// <Text>Pa ver</Text>
// </TouchableOpacity>
// <Text>{coppiedText}</Text>
