import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import useGetEquipos from '../hooks/useGetEquipos';
import axios from 'axios';


const PersonasScreen = () => {
  const [datas, setDatas] = useState([{id: 0, equipo: '', persona: ''}]);

  const {equipos, loading, error} = useGetEquipos();

  useEffect(() => {
    if (!loading && !error) {
      setDatas(equipos);
    }
  }, [loading, error]);

  const handleSubmit = () => {
    axios
    .put('https://api.github.com/repos/pedro-chiappani/nba-codechallenge/contents/src/hooks/equipos.json?ref=prod', {
      message: 'update equipos',
      commiter: {
        name: 'pedro-chiappani',
        email: 'pepeelchapa@gmail.com',
      }
    })

  }

  return (
    <View style={styles.container}>
      <Button title="Guardar" onPress={handleSubmit}></Button>
      <FlatList
        data={datas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.option}>
            <TextInput
              value={item.id.toString()}
              style={{color: 'transparent'}}></TextInput>
            <View style={{flex: 1}}>
              <Text>Persona: </Text>
              <TextInput
                value={item.persona}
                onChangeText={text => {
                  setDatas(prevData => {
                    const newData = [...prevData];
                    newData[item.id - 1].persona = text;
                    return newData;
                  });
                }}
              />
            </View>
            <View style={{flex: 2, borderColor: 'black'}}>
              <Text>Equipo: </Text>
              <TextInput
                value={item.equipo}
                onChangeText={text => {
                  setDatas(prevData => {
                    const newData = [...prevData];
                    newData[item.id - 1].equipo = text;
                    return newData;
                  });
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  option: {
    flexDirection: 'row',
    backgroundColor: '#F6F0E7',
    elevation: 5,
    marginVertical: 6,
    padding: 6,
    marginHorizontal: 6,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default PersonasScreen;
