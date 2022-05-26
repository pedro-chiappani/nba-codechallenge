import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useGetTeams from '../hooks/useGetTeams';
import {HomeScreenProps} from '../types/navigation';

const HomeScreen = () => {
  const {data, loading, error} = useGetTeams();
  // console.log(data?.map(team => team.WikipediaLogoUrl));

  const navigation = useNavigation<HomeScreenProps>();

  return (
    <View style={styles.center}>
      <Text>Home Screen</Text>
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
