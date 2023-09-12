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
import { render } from '@testing-library/react-native';

const TeamsScreen = () => {
  const {dato, loado, erro} = useGetTeams();
  //console.log(data?.map(team => team.WikipediaLogoUrl));
  const navigation = useNavigation();

  const renderCell = (team: Team, index: number) => {
    const whites = ['Jazz', 'Heat', 'Rockets', ]
    let uri = team.WikipediaLogoUrl;
    if (uri.includes("Cleveland")){
      uri = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cleveland_Cavaliers_logo.svg"
    }
    
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PlayerList', {
            team: team.Key,
            primary: team.PrimaryColor,
            secondary: team.SecondaryColor,
            teamName: team.Name,
          })
        }
        style={[styles.container, {backgroundColor: `#${team.PrimaryColor}`}]}>
        <SvgCssUri
          uri={uri}
          width={"100%"}
          height={"100%"}
          fill={whites.includes(team.Name)?'white':'black'}
        />
      </TouchableOpacity>
    );
  };
  

  return (
    <GestureHandlerRootView>
    <FlatList data={dato}
     renderItem={({item,index}) => renderCell(item,index)}/>
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
    backgroundColor: 'white',
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
