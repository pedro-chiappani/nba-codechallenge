import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert, TouchableOpacity, FlatList} from 'react-native';
import useGetPlayer from '../hooks/useGetPlayer';
import {RootStackScreenProps, TeamsScreenProps} from '../types/navigation';
import PlayerItem from '../components/playerItem';
import SearchBar from '../components/searchBar';

const PlayerListScreen = ({route}: RootStackScreenProps<'PlayerList'>) => {
  //console.log("esto es", route.params.team);
  const params = route.params;
  const {data, loading, error} = useGetPlayer(params.team);
  //console.log("data: ", data);
  


  return (
    <View>
      <SearchBar {...''}/>
      <FlatList data={data} renderItem ={(player) => <PlayerItem {...player.item}/>} />
    </View>
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
