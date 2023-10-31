// import { View, Text } from "react-native";

// const TeamScreen = () => {

//     return (
//         <View>
//             <Text>Alo</Text>
//         </View>
//     )
// }

// export default TeamScreen;
import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import useGetMatches from '../hooks/useGetMatches';
import {RootStackScreenProps} from '../types/navigation';
import PlayerItem from '../components/playerItem';
import {Player} from '../types/player';
import SearchBox from '../components/searchBar';
import MatchItem from '../components/matchitem';

const TeamScreen = (
  {route}: RootStackScreenProps<'Team'>,
  {navigation}: any,
) => {
  const {data, loading, error} = useGetMatches();
  const matches = data?.filter(m => m.HomeTeam == route.params.teamName || m.AwayTeam == route.params.teamName)

  return (
    <FlatList
      data={matches}
      contentContainerStyle={{paddingBottom: 40}}
      renderItem={match => <MatchItem {...match.item}/>}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TeamScreen;
