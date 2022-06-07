import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import useGetPlayer from '../hooks/useGetPlayer';
import {RootStackScreenProps} from '../types/navigation';
import PlayerItem from '../components/playerItem';
import {Player} from '../types/player';
import SearchBox from '../components/searchBar';

const PlayerListScreen = ({route}: RootStackScreenProps<'PlayerList'>) => {
  const {data, loading, error} = useGetPlayer(route.params.team);
  const [players, setPlayers] = useState<Player[] | undefined>(data);

  const updateSearch = (query: string) => {
    setPlayers(
      query
        ? data?.filter(p => {
            const name = p.FirstName + ' ' + p.LastName;
            return name.toLowerCase().includes(query.toLowerCase());
          })
        : data,
    );
  };

  useEffect(() => {
    if (!loading) setPlayers(data);
  }, [loading]);

  const searchBox: Player = {PlayerID: -1} as Player;

  return (
    <FlatList
      data={players ? [searchBox, ...players] : [searchBox]}
      contentContainerStyle={{paddingBottom: 40}}
      renderItem={({item, index}) => {
        return index == 0 ? (
          <SearchBox updateSearch={updateSearch} />
        ) : (
          <PlayerItem {...item} />
        );
      }}
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

export default PlayerListScreen;
