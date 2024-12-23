import React, {useEffect, useState} from 'react'
import {changeIcon, getIcon} from 'react-native-change-icon';
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Image} from 'react-native';

import { appIconList } from '../assets/iconList';


const IconScreen = () => {
  const [activeLogo, setActiveLogo] = useState('Default');

  const onSelectLogo = async () => {
    try {
      const response = await changeIcon(activeLogo);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  useEffect(() => {
    const getCurrentIcon = async () => {
      const currentIcon = await getIcon();
      setActiveLogo(currentIcon === 'Default' ? 'Default' : currentIcon);
    };
    getCurrentIcon();
  }, []);

  const renderCell = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.cellContainer,
          {backgroundColor: item?.id % 2 ? '#F6F0E7' : 'white'},
        ]}
        onPress={() => setActiveLogo(item?.label)}>
        <Image source={item?.img} style={styles.logoContainer} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{item?.label}</Text>
        </View>
        <View style={styles.radioButtonSection}>
          <View style={styles.radioButtonOuterContainer}>
            <View
              style={[
                styles.radioButtonInnerContainer,
                {
                  backgroundColor:
                    item?.label === activeLogo ? '#019688' : 'transparent',
                },
              ]}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.rootContainer}>
        <FlatList
          data={appIconList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderCell(item, index)}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonContainer}
          onPress={() => onSelectLogo()}>
          <Text style={styles.buttonLabel}>Cambiar Logo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
  },
  rootContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fafafa',
    padding: 8,
  },
  cellContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEDE7',
    elevation: 5,
    marginVertical: 6,
    padding: 6,
    marginHorizontal: 6,
  },
  logoContainer: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  labelText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioButtonOuterContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#656565',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInnerContainer: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ae3251',
    elevation: 5,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IconScreen

