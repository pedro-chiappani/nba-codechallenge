import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfigScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        // <View style={styles.container}>
        //     <Text style={styles.title}>Configuración</Text>
        //     <Button
        //         title="Iconos"
        //         onPress={() => navigation.navigate('Icon')}
        //     />
        //     <Button
        //         title="Personas"
        //         onPress={() => navigation.navigate('Personas')}
        //     />
        // </View>
        <SafeAreaView style={styles.safeAreaContainer}>
            <TouchableOpacity
                style={styles.cellContainer}
                onPress={() => navigation.navigate('Icon')}>
                <Text style={styles.title}>Icono</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cellContainer}
                onPress={() => navigation.navigate('Personas')}>
                <Text style={styles.title}>Personas</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
    },
    cellContainer: {
      flexDirection: 'row',
      backgroundColor: '#EEEDE7',
      elevation: 5,
      marginVertical: 6,
      padding: 6,
      marginHorizontal: 6,
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
    },
});

export default ConfigScreen;
