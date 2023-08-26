import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import ScoreItem from '../components/scoreitem';
import useGetScores from '../hooks/useGetScores';
// import {CacheManager} from 'react-native-cached-image';
import useGetTeams from '../hooks/useGetTeams';
import { Team } from '../types/team';

const MatchScreen = () => {
  const {data, loading, error} = useGetMatches();
  let matches = data.filter(m => m.Status != "NotNecessary")
  // const {dato,loado,erro} = useGetTeams();
  const [cad, setCad] = useState([""]);
  // data?.forEach(match => console.log(cadena(match, dato))); 
  const navigation = useNavigation<HomeScreenProps>();
  

  const [coppiedText, setCopiedText] = useState('');
  
  
  const copyToClipboard = () => {
    Clipboard.setString(cad.toString());
  };

  // const listener = async () => {
  //   const text = await Clipboard.getString();
  //   setCad([...cad, text + "\n"])
  //   console.log("changed!")};
  // Clipboard.addListener(listener);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad, text + "\n"])
    setCopiedText(text);
  };
  let fechaPartidos;
  if (matches.length > 0){
    let f = matches[0]["Day"].toString().split("T")[0].split("-")
    fechaPartidos ="Partidos "+(f[2]+"/" + f[1])
  }else{
    fechaPartidos = "No hay partidos hoy"
  }

  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <Text selectable style={styles.title}>
        {fechaPartidos}
      </Text>
      <Text></Text>
      <FlatList
        data={matches}
        renderItem={match => <MatchItem {...match.item}/>}
      />
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={styles.title}>{cad}</Text>
      </TouchableOpacity>
    </View>
    </GestureHandlerRootView>
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


// <TouchableOpacity onPress={copyToClipboard}>
// <Text>Alo</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={fetchCopiedText}>
// <Text>Pa ver</Text>
// </TouchableOpacity>
// <Text>{coppiedText}</Text>