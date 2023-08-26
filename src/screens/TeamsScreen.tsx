import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import TeamItem from '../components/teamItem';
import useGetTeams from '../hooks/useGetTeams';
import {HomeScreenProps} from '../types/navigation';
import {Team} from '../types/team';

const TeamsScreen = () => {
  const {dato, loado, erro} = useGetTeams();
  //console.log(data?.map(team => team.WikipediaLogoUrl));

  return (
    <GestureHandlerRootView>
    <FlatList data={dato} renderItem={team => <TeamItem {...team.item} />} />
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
});

export default TeamsScreen;
