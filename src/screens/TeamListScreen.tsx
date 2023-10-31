import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {SvgCssUri} from 'react-native-svg';
import { equipos } from '../hooks/equipos';
import TeamItem from '../components/teamItem';
import useGetTeams from '../hooks/useGetTeams';
import {HomeScreenProps} from '../types/navigation';
import {Team} from '../types/team';
import { render } from '@testing-library/react-native';
import SearchBox from '../components/searchBar';

const TeamsScreen = () => {
  const {dato, loado, erro} = useGetTeams();
  //console.log(data?.map(team => team.WikipediaLogoUrl));
  const navigation = useNavigation();
  const [teams, setTeams] = useState<Team[] | undefined>(dato);

  const updateSearch = (query: string) => {
    setTeams(
      query
        ? dato?.filter(p => {
            const name = p.City + ' ' + p.Name;
            return name.toLowerCase().includes(query.toLowerCase());
          })
        : dato,
    );
  };

  useEffect(() => {
    myFuncion();
    return () => {
      setTeams(undefined)
    }
  }, [loado]);

  const myFuncion = () => {
    if (!loado)
      setTeams(dato)
  }

  const searchBox: Team = {TeamID: -1} as Team;

  return (
    <GestureHandlerRootView>
    <FlatList data={teams ? [searchBox, ...teams] : [searchBox]}
    //  renderItem={({item,index}) => renderCell(item,index)}
     renderItem={({item, index}) => {
      return index == 0 ? (
        // <SearchBox updateSearch={updateSearch} color={'808080'}  />

        <Text></Text>
      ) : (
        <TeamItem
          {...item}
        />
      );
    }}/>
    </GestureHandlerRootView>
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});

export default TeamsScreen;
