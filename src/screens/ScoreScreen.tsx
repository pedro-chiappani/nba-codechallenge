import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import useGetMatches from '../hooks/useGetMatches';
import {HomeScreenProps} from '../types/navigation';
import Clipboard, { useClipboard } from '@react-native-clipboard/clipboard';
import { FlatList } from 'react-native-gesture-handler';
import MatchItem from '../components/matchitem';
import ScoreItem from '../components/scoreitem';
import useGetScores from '../hooks/useGetScores';
// import {CacheManager} from 'react-native-cached-image';
import useGetTeams from '../hooks/useGetTeams';
import { Team } from '../types/team';
import cadena from '../components/generateStrigns';

const ScoreScreen = () => {
  const {dat, load, err} = useGetScores();
  // const {dato,loado,erro} = useGetTeams();
  const [cad, setCad] = useState([""]);
//   const [data, setString] = useClipboard();
  // data?.forEach(match => console.log(cadena(match, dato))); 
  const navigation = useNavigation<HomeScreenProps>();
  

  const [coppiedText, setCopiedText] = useState('');
//   console.log("clipboard " + data)
  console.log("cad: " + cad)
  
  const copyToClipboard = () => {
    Clipboard.setString(cad.toString());
  };
  const listener = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad,text + "\n"])
    // setString("")
    // console.log("changed!")};
    if (Clipboard.hasString()){
        console.log("Tiene: " + text)
        }
    }
  Clipboard.addListener(listener);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad, text + "\n"])
    setCopiedText(text);
  };

  const cleanCad = () => {
    // setString("");
    let x = cad?.filter(c => c===null);
    setCad(x)
    console.log(Clipboard.hasString())
    // console.log("clipboard " + data)
    console.log("cad " + cad)
  }

  
  const fecha = new Date();
  fecha.setDate(fecha.getDate() -1)
  let ayer = fecha.getDate() + "/" + (fecha.getMonth()+1);


  return (
    <View style={[styles.container, {
        flexDirection:'column'
    }]}>
        <View style={{}}>
      <Text style={styles.title}>Resultados {ayer}</Text>
      <Text></Text>
      <FlatList
        data={dat}
        renderItem={score => <ScoreItem {...score.item} />}
      />
      <Text></Text>
      </View>
      <Button title='Clean' onPress={cleanCad}/>
      <TouchableOpacity onPress={copyToClipboard}>
         <Text style={styles.title}>{cad}</Text>
       </TouchableOpacity>
    </View>
    //   <Text selectable style={styles.title}>
    //     Partidos {hoy}
    //   </Text>
    //   <Text></Text>
    //   <FlatList
    //     data={data}
    //     renderItem={match => <MatchItem {...match.item}/>}
    //   />
    //   <TouchableOpacity onPress={copyToClipboard}>
    //     <Text style={styles.title}>{cad}</Text>
    //   </TouchableOpacity>
    // </View>
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

export default ScoreScreen;


// <TouchableOpacity onPress={copyToClipboard}>
// <Text>Alo</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={fetchCopiedText}>
// <Text>Pa ver</Text>
// </TouchableOpacity>
// <Text>{coppiedText}</Text>