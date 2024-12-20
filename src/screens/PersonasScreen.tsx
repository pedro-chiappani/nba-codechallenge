import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import equipos from '../hooks/equipos.json';

const PersonasScreen = () => {
    const [data, setData] = useState([{"id": 0, "equipo": "", "persona": ""}]);

    useEffect(() => {
        setData(equipos);
    }, []);



    return (
        <View style={styles.container}>
            <Button title='Guardar' onPress={undefined}></Button>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={{ marginBottom: 20 }}>
                    <Text>{item.id}</Text>
                    <Text>Persona: </Text>
                    <TextInput
                        value={item.persona}
                        onChangeText={(text) => {
                            setData((prevData) => {
                                const newData = [...prevData];
                                newData[item.id -1].persona = text;
                                return newData;
                            });
                        }}
                    />
                    <Text>Equipo: </Text>
                    <TextInput
                        value={item.equipo}
                        onChangeText={(text) => {
                            setData((prevData) => {
                                const newData = [...prevData];
                                newData[item.id -1].equipo = text;
                                return newData;
                            });
                        }}
                    />

                </View>)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
