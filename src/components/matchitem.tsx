import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from "react-native";
import { Matches } from "../types/match";
import { Team } from "../types/team";
import useGetTeams from "../hooks/useGetTeams";
import { equipos } from "../hooks/equipos";
import Clipboard from "@react-native-clipboard/clipboard";

const MatchItem = (match: Matches) => {
  
  const {data,loading,error} = useGetTeams();
  const navigation = useNavigation();
  let home = data?.filter(team => team.TeamID == match.HomeTeamID);
  let away = data?.filter(team => team.TeamID == match.AwayTeamID);
  let hora = ((match.DateTimeUTC.toLocaleString().split('T'))[1]).split(':')
  let mmostrar = ((parseInt(hora[0]) - 3 < 0 ? parseInt(hora[0])+24-3 : parseInt(hora[0]) -3) +':'+ hora[1])
  let pers1 = (equipos.filter(e => e.equipo == (home?.map(a => a.Name).toString())))
  let pers2 = (equipos.filter(e => e.equipo == (away?.map(a => a.Name).toString())))

  const [coppiedText, setCopiedText] = useState('');
  
  
  const copyToClipboard = () => {
    Clipboard.setString("*"+home?.map(a => a.Name)+"*"+
    " "+"("+pers1?.map(e => e.persona).toString()+")"+" vs "+
    "*"+away?.map(a => a.Name)+"*"+
    " "+"("+pers2?.map(e => e.persona).toString()+")"+" "+mmostrar+" "+"hs");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  
  return (
    <TouchableOpacity onPress={copyToClipboard}>
    <Text style={styles.title}>
      *{home?.map(a => a.Name)}* ({pers1?.map(e => e.persona).toString()}) vs *
      {away?.map(a => a.Name)}* ({pers2?.map(e => e.persona).toString()}) 
      {mmostrar} hs
    </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 23,
    color:'black'
  },
});
export default MatchItem;