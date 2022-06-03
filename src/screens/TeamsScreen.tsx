import { useNavigation } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useGetTeams from '../hooks/useGetTeams';
import {HomeScreenProps} from '../types/navigation';
import { Team } from '../types/team';

const TeamsScreen = () => {
  const {data, loading, error} = useGetTeams();
  console.log(data?.map(team => team.Name));

  const navigation = useNavigation<HomeScreenProps>();

  const Item = (team : Team) => (
    <View style={styles.item}>
      <Text style={styles.title}>{team.Name}</Text> 
    </View>
  );

  return (
    <View style={styles.center}>
    <Button onPress={() => navigation.push('Teams')} title='navigate'/>
      <FlatList data={data} renderItem={(team) => <Item {...team.item}/>}/>
    </View>
  );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default TeamsScreen;