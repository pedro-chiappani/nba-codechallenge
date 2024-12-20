import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>
            <Button
                title="Iconos"
                onPress={() => navigation.navigate('Icon')}
            />
            <Button
                title="Personas"
                onPress={() => navigation.navigate('Personas')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ConfigScreen;
