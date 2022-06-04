import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';
import useGetPlayer from '../hooks/useGetPlayer';
import {TeamsScreenProps} from '../types/navigation';
import { Team } from '../types/team';
import { Player } from '../types/player';
import { SvgCssUri } from 'react-native-svg';

const PlayerListScreen = (teamId: number) => {
  const {data, loading, error} = useGetPlayer(teamId);
  //console.log(data?.map(team => team.Name));

  const navigation = useNavigation<TeamsScreenProps>();

  const PlayerItem = (player: Player) => (
    <TouchableOpacity onPress={() => navigation.navigate('PlayerList', {teamId: teamId})}
    style= {[styles.center]}>
      <SvgCssUri uri= {player.PhotoUrl} width="100%" fill={'black'}/>
    </TouchableOpacity>
  );

  return (
    <FlatList data={data} renderItem ={(team) => <PlayerItem {...team.item}/>} />
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
