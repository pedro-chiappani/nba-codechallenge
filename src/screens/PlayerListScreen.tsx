import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useGetPlayer from '../hooks/useGetPlayer';
import {RootStackScreenProps} from '../types/navigation';
import PlayerItem from '../components/playerItem';
import {Player} from '../types/player';
import SearchBox from '../components/searchBar';

const PlayerListScreen = (
  {route}: RootStackScreenProps<'PlayerList'>,
  {navigation}: any,
) => {
  const {data, loading, error, refetch} = useGetPlayer(route.params.team);
  const [players, setPlayers] = useState<Player[] | undefined>(data);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
    if (!loading) {
      setPlayers(data);
    }
  }, [loading]);

  const searchBox: Player = {PlayerID: -1} as Player;

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 10, backgroundColor: '#f5f5f5', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: `#${route.params.primary}`}}>
          {route.params.teamName}
        </Text>
        <TouchableOpacity onPress={refetch} disabled={loading}>
          <Text style={[{fontSize: 16, color: `#${route.params.primary}`}, loading && {opacity: 0.5}]}>
            ↻ {loading ? 'Cargando...' : 'Actualizar'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="small" color={`#${route.params.primary}`} style={{marginTop: 5}} />}
      <FlatList
        data={players ? [searchBox, ...players] : [searchBox]}
        contentContainerStyle={{paddingBottom: 40}}
        renderItem={({item, index}) => {
          return index == 0 ? (
            <SearchBox updateSearch={updateSearch} color={route.params.primary} />
          ) : (
            <PlayerItem
              player={item}
              primary={route.params.primary}
              secondary={route.params.secondary}
              team={route.params.team}
            />
          );
        }}
      />
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
