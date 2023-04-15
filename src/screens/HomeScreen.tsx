import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MatchItem from '../components/matchitem'
import useGetMatches from '../hooks/useGetMatches';
import {HomeScreenProps} from '../types/navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import { FlatList } from 'react-native-gesture-handler';
import { Matches } from '../types/match';
import { Team } from '../types/team';
import ScoreItem from '../components/scoreitem';
import useGetScores from '../hooks/useGetScores';

const HomeScreen = () => {
  const {data, loading, error} = useGetMatches();
  const {dat, load, err} = useGetScores();

  
  const navigation = useNavigation<HomeScreenProps>();

  const [coppiedText, setCopiedText] = useState('');
  
  
  const copyToClipboard = () => {
    Clipboard.setString("ca");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  const fecha = new Date();
  let hoy = fecha.getDate() + "/" + (fecha.getMonth() +1);
  fecha.setDate(fecha.getDate() -1)
  let ayer = fecha.getDate() + "/" + (fecha.getMonth()+1);


  return (
    <View style={styles.container}>
      {/* <FlatList data={data} renderItem={({item}) => <Text style={styles.item}> juega {item.HomeTeam} vs {item.AwayTeam}</Text>}/> */}
      <TouchableOpacity>
        <Text style={styles.title}>Partidos {hoy}</Text>
        <Text></Text>
        <FlatList data={data} renderItem={match => <MatchItem {...match.item}/>}/>
      </TouchableOpacity>
      <Text>                       </Text>
      <Text>                       </Text>
      <Text>                       </Text>
      <TouchableOpacity>
      <Text style={styles.title}>Resultados {ayer}</Text>
      <Text></Text>
      <FlatList data={dat} renderItem={score => <ScoreItem{...score.item}/>}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default HomeScreen;


// <TouchableOpacity onPress={copyToClipboard}>
// <Text>Alo</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={fetchCopiedText}>
// <Text>Pa ver</Text>
// </TouchableOpacity>
// <Text>{coppiedText}</Text>