import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {HomeScreenProps} from '../types/navigation';
import Clipboard, {useClipboard} from '@react-native-clipboard/clipboard';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import ScoreItem from '../components/scoreitem';
import useGetScores from '../hooks/useGetScores';

const ScoreScreen = () => {
  const {dat, load, err, refetch} = useGetScores();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
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

  const copyToClipboard = () => {
    Clipboard.setString(
      fechaRes + '\n' + partidos.toString().replace(/,/g, '\n'),
    );
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
            <TouchableOpacity onPress={refetch} disabled={load}>
              <Text style={[styles.text, load && {opacity: 0.5}]}>↻ {load ? 'Cargando...' : 'Actualizar'}  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={copyToClipboard}>
              <Text style={styles.text} >Copiar  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cleanPartidos}>
              <Text style={styles.text} >Limpiar</Text>
            </TouchableOpacity>
          </View>
          </View>
          {load && <ActivityIndicator size="small" color="#0000ff" style={{marginTop: 10}} />}
          <Text></Text>
          <FlatList
            data={scores}
            renderItem={({item}) => (
              <ScoreItem item={item} setPartidos={addPartido} />
            )}
          />
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
  text: {
    fontSize: 15,
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
