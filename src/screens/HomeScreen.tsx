import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import useGetMatches from '../hooks/useGetMatches';
import {HomeScreenProps} from '../types/navigation';
import Clipboard from '@react-native-clipboard/clipboard';

const HomeScreen = () => {
  const {data, loading, error} = useGetMatches();
  //console.log(data?.map(team => team.Name));
  //console.log(data);
  
  const navigation = useNavigation<HomeScreenProps>();

  const [coppiedText, setCopiedText] = useState('');
  
  
  const copyToClipboard = () => {
    Clipboard.setString("ca");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.center}>
      <TouchableOpacity onPress={copyToClipboard}>
        
        <Text>{data?.map(match=>match.HomeTeam)} vs {data?.map(match => match.AwayTeam)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fetchCopiedText}>
        <Text>Pa ver</Text>
      </TouchableOpacity>
      <Text>{coppiedText}</Text>
    </View>
    </SafeAreaView>
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
