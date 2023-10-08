import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Matches } from "../types/match";
import { Team } from "../types/team";
import useGetTeams from "../hooks/useGetTeams";
import { equipos } from "../hooks/equipos";
import Clipboard from "@react-native-clipboard/clipboard";
import cadena from "./generateStrigns";

const ScoreItem = (match: Matches) => {
  
  

  const [coppiedText, setCopiedText] = useState('');
  
  
  const copyToClipboard = () => {
    Clipboard.setString(r);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  let r = cadena(match)
  
  return (
    <View>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={styles.title}>{r}</Text>
      </TouchableOpacity>
    </View>
    );
};

//Los *{home?.map(a => a.Name)}* ({(pers1?.map(e => e.persona)).toString()}) {res} *{away?.map(a => a.Name)}* ({(pers2?.map(e => e.persona)).toString()}) {match.HomeTeamScore}-{match.AwayTeamScore}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 10,
    fontSize: 17,
    color:'black'
  },
});
export default ScoreItem;