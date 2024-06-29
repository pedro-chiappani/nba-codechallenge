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
import {HomeScreenProps} from '../types/navigation';
import Clipboard, { useClipboard } from '@react-native-clipboard/clipboard';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ScoreItem from '../components/scoreitem';
import useGetScores from '../hooks/useGetScores';

const ScoreScreen = () => {
  const {dat, load, err} = useGetScores();
  const [cad, setCad] = useState([""]);
  const navigation = useNavigation<HomeScreenProps>();
  const scores = dat.filter(score => score.IsClosed)
  let fechaRes;
  if (scores.length > 0){
    let f = scores[0]["Day"].toString().split("T")[0].split("-")
    fechaRes ="Resultados "+(f[2]+"/" + f[1])
  }else{
    // fechaRes = "No hay resultados para mostrar"
    fechaRes = "BOSTON CELTICS CAMPEONES 2024"
  }
  const [coppiedText, setCopiedText] = useState('');
//   console.log("clipboard " + data)
  // console.log("cad: " + cad)

  const copyToClipboard = () => {
    Clipboard.setString(cad.toString());
  };
  const listener = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad,text + "\n"])
    // setString("")
    // console.log("changed!")};
    if (Clipboard.hasString()){
        // console.log("Tiene: " + text)
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
    // console.log(Clipboard.hasString())
    // console.log("clipboard " + data)
    // console.log("cad " + cad)
  }

  return (
    <View style={[styles.container, {
        flexDirection:'column'
    }]}>
      <GestureHandlerRootView>
        <View style={{}}>
      <Text style={styles.title}>{fechaRes}</Text>
      <Text></Text>
      <FlatList
        data={scores}
        renderItem={score => <ScoreItem {...score.item} />}
      />
      <Text></Text>
      </View>
      </GestureHandlerRootView>
      {/* <Button title='Clean' onPress={cleanCad}/>
      <TouchableOpacity onPress={copyToClipboard}>
         <Text style={styles.title}>{cad}</Text>
       </TouchableOpacity> */}
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

export default ScoreScreen;


// <TouchableOpacity onPress={copyToClipboard}>
// <Text>Alo</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={fetchCopiedText}>
// <Text>Pa ver</Text>
// </TouchableOpacity>
// <Text>{coppiedText}</Text>
