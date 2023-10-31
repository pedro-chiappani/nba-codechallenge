import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SvgCssUri} from 'react-native-svg';
import {Team} from '../types/team';
import {HomeScreenProps} from '../types/navigation';
import { equipos } from '../hooks/equipos';

const TeamItem = (team: Team) => {
  const navigation = useNavigation();
  const secondary = ['Heat', 'Rockets', 'Nets']
    const whites =['Spurs']
    let uri = team.WikipediaLogoUrl;
    if (uri.includes("Cleveland")){
      uri = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cleveland_Cavaliers_logo.svg"
    }
    const pers = equipos.find(e => e.equipo == team.Name)
    
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Team', {
            team: team.Key,
            primary: team.PrimaryColor,
            secondary: team.SecondaryColor,
            teamName: `${team.Name}  ${pers ? '(' + pers.persona + ')' : ''}`,
          })
        }
        style={[styles.container, {backgroundColor: secondary.includes(team.Name)?`#${team.SecondaryColor}`:`#${team.PrimaryColor}`}]}>
        <SvgCssUri
          uri={uri}
          width={"100%"}
          height={"100%"}
          fill={'black'}
        />
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
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

export default TeamItem;
