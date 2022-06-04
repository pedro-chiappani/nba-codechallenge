import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import useGetTeams from '../hooks/useGetTeams';
import {HomeScreenProps} from '../types/navigation';

const HomeScreen = () => {
  const {data, loading, error} = useGetTeams();
  //console.log(data?.map(team => team.Name));

  const navigation = useNavigation<HomeScreenProps>();

  return (
    <View style={styles.center}>
      <Button onPress={() => navigation.push('Teams')} title='Teams'/>
      <Text>Home Screen</Text>
      <Text>Hola</Text>
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

export default HomeScreen;
