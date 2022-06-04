import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, TouchableOpacity, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SvgCssUri } from 'react-native-svg';
import useGetTeams from '../hooks/useGetTeams';
import {HomeScreenProps} from '../types/navigation';
import { Team } from '../types/team';

const TeamsScreen = () => {
  const {data, loading, error} = useGetTeams();
  //console.log(data?.map(team => team.WikipediaLogoUrl));

  const navigation = useNavigation<HomeScreenProps>();

  const TeamItem = (team: Team) => (
    <TouchableOpacity onPress={() => navigation.navigate('PlayerList', {teamId: team.TeamID})}
    style= {[styles.container, 
    {backgroundColor: `#${team.PrimaryColor}`}]}>
      <SvgCssUri uri= {team.WikipediaLogoUrl} width="100%" fill={'black'}/>
    </TouchableOpacity>
  );

  return (
    <FlatList data={data} renderItem ={(team) => <TeamItem {...team.item}/>} />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    padding: 65,
    marginVertical: 3,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 32,
  },
  container: {
    height: 200,
    marginTop: 6,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});

export default TeamsScreen;
