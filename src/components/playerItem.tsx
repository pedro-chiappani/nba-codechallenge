import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, ImageBase } from "react-native";
import { SvgCssUri, } from "react-native-svg";
import { TeamsScreenProps } from "../types/navigation";
import { Player } from "../types/player";

const PlayerItem = (player: Player) => {

    const navigation = useNavigation();
    return(
        <TouchableOpacity style= {[styles.container]} onPress={() => navigation.navigate('Player', {player: player})}>
        <Image style={styles.tinyImage} source={{uri: player.PhotoUrl}} resizeMode='contain' />
        <Text style={styles.text}>{player.FirstName} {player.LastName}</Text>
        </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 100,
        marginTop: 6,
        marginHorizontal: 6,
        borderRadius: 8,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        overflow: "hidden",
        justifyContent: 'flex-start'
      },
    text:{
        height:50,
        flex: .8,
        color: 'black',
        alignSelf: 'center',
        justifyContent: "center",
        left: 75

    },
    tinyImage:{
        flex: .0,
        width: 88,
        height: 100,
        
    },
});

export default PlayerItem;