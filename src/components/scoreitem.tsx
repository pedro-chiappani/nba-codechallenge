import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Matches } from "../types/match";
import { Team } from "../types/team";
import useGetTeams from "../hooks/useGetTeams";
import useGetPlayer from "../hooks/useGetPlayer";

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
  
  return (
    <View>
    <Text style={styles.title}>Los *{home?.map(a => a.Name)}* {res} *{away?.map(a => a.Name)}* {match.HomeTeamScore}-{match.AwayTeamScore}</Text>
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