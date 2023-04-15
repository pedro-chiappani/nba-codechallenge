import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Matches } from "../types/match";
import { Team } from "../types/team";
import useGetTeams from "../hooks/useGetTeams";
import { equipos } from "../hooks/equipos";
import Clipboard from "@react-native-clipboard/clipboard";

const ScoreItem = (match: Matches) => {
  
  const {data,loading,error} = useGetTeams();
  const navigation = useNavigation();
  let home = data?.filter(team => team.TeamID == match.HomeTeamID);
  let away = data?.filter(team => team.TeamID == match.AwayTeamID);
  const date = new Date();
  date.setDate(date.getDate() -1)
  let day = date.getDate();
  let month = date.getMonth()+1;
  let res: string;
  if (match.HomeTeamScore > match.AwayTeamScore){
    res = "le ganaron a los";
  }else{
    res = "perdieron contra los";
  }

  let pers1 = (equipos.filter(e => e.equipo == (home?.map(a => a.Name).toString())))
  let pers2 = equipos.filter(
    e => e.equipo == away?.map(a => a.Name).toString(),
  );

  const [coppiedText, setCopiedText] = useState('');
  
  
  const copyToClipboard = () => {
    Clipboard.setString("Los "+"*"+home?.map(a => a.Name)+"*"+
    " "+"("+pers1?.map(e => e.persona).toString()+") "+res+
    " *"+away?.map(a => a.Name)+"*"+
    " "+"("+pers2?.map(e => e.persona).toString()+") "+ match.HomeTeamScore+"-"+match.AwayTeamScore);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  
  return (
    <View>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={styles.title}>Los *{home?.map(a => a.Name)}* ({(pers1?.map(e => e.persona)).toString()}) {res} *{away?.map(a => a.Name)}* ({(pers2?.map(e => e.persona)).toString()}) {match.HomeTeamScore}-{match.AwayTeamScore}</Text>
      </TouchableOpacity>
    </View>
    );
};

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
    fontSize: 23,
  },
});
export default ScoreItem;