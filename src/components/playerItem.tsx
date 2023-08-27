import {TabRouter, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBase,
} from 'react-native';
import {SvgCssUri} from 'react-native-svg';
import {TeamsScreenProps} from '../types/navigation';
import {Player} from '../types/player';

interface PlayerItemProps {
  player: Player;
  primary: string;
  secondary: string;
  team: string;
}

const PlayerItem = ({player, primary, secondary, team}: PlayerItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: `#${primary}`, shadowColor: `#${secondary}`},
      ]}
      onPress={() =>
        navigation.navigate('Player', {
          player: player,
          primary: primary,
          secondary: secondary,
        })
      }>
      <Image
        style={styles.tinyImage}
        source={{uri: player.PhotoUrl}}
        resizeMode="contain"
      />
      <Text style={[styles.text, {color: `#${secondary}`}]}>
        {player.FirstName} {player.LastName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    marginTop: 6,
    marginHorizontal: 6,
    borderRadius: 8,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: 'white',
    elevation: 10,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  text: {
    height: 50,
    flex: 0.8,
    alignSelf: 'center',
    justifyContent: 'center',
    left: 75,
  },
  tinyImage: {
    flex: 0.0,
    width: 88,
    height: 100,
  },
});

export default PlayerItem;
