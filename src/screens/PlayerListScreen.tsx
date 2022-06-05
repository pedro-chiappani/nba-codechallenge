import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';
import useGetPlayer from '../hooks/useGetPlayer';
import {TeamsScreenProps} from '../types/navigation';
import { Team } from '../types/team';
import { Player } from '../types/player';
import { SvgCssUri } from 'react-native-svg';
import PlayerItem from '../components/playerItem';

const PlayerListScreen = (teamId: string) => {
  console.log("esto es", {teamId});
  const {data, loading, error} = useGetPlayer(teamId);
  console.log("data: ", data);


  return (
    <FlatList data={data} renderItem ={(player) => <PlayerItem {...player.item}/>} />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayerListScreen;
