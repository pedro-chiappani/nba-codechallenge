import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from "react-native";
import { Matches } from "../types/match";
import { Team } from "../types/team";
import useGetTeams from "../hooks/useGetTeams";
import { equipos } from "../hooks/equipos";
import Clipboard from "@react-native-clipboard/clipboard";
import cadena from "./generateStrigns";
// import cadena from "./generateStrigns";


// const cadena = (match: Matches) => {
//   const {dato,loado,erro} = useGetTeams();
//   let home = dato?.find(team => team.TeamID == match.HomeTeamID);
//   let away = dato?.find(team => team.TeamID == match.AwayTeamID);
//   let hora = ((match.DateTimeUTC.toLocaleString().split('T'))[1]).split(':')
//   let mmostrar = ((parseInt(hora[0]) - 3 < 0 ? parseInt(hora[0])+24-3 : parseInt(hora[0]) -3) +':'+ hora[1])
//   let pers1 = (equipos.filter(e => e.equipo == (home?.Name)))
//   let pers2 = (equipos.filter(e => e.equipo == (away?.Name)))

//   return "*"+home?.Name+"*"+
//   " "+"("+pers1?.map(e => e.persona).toString()+")"+" vs "+
//   "*"+away?.Name+"*"+
//   " "+"("+pers2?.map(e => e.persona).toString()+")"+" "+mmostrar+" "+"hs"

// }


const MatchItem = (match: Matches) => {

  let r = cadena(match)

  const [cado, setCad] = useState([""])

  const [coppiedText, setCopiedText] = useState("");
  
  const copyToClipboard= async () => {
    Clipboard.setString(r);
    // let a = await Clipboard.getString();
    // setCad([...cad, a + "\n"])
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    // setCad([...cad, text + "\n"])
    setCopiedText(text);
  };

  // console.log(cad)

  return (
    <View>
    <TouchableOpacity onPress={copyToClipboard}>
    <Text style={styles.title}>
      {r}
    </Text>
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={fetchCopiedText}>
      <Text>pegar</Text>
    </TouchableOpacity>
    <Text>{cad}</Text> */}
    </View>
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
    margin:10,
    fontSize: 20,
    color:'black'
  },
});

export default MatchItem;