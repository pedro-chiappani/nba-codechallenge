import React from "react";
import { DrawerLayoutAndroidBase, Image, StyleSheet, Text, View } from "react-native";
import useGetPlayer from "../hooks/useGetPlayer";
import { RootStackScreenProps } from "../types/navigation";
import { Player } from "../types/player";
import PlayerListScreen from "./PlayerListScreen";

const PlayerScreen = ({route}: RootStackScreenProps<'Player'>) => {
    
    const player = route.params.player;

    return(
        <View style={styles.container}>
            <Image style={styles.tinyImage} source={{uri: player.PhotoUrl}}/>
            <Text style={styles.text}> 
            {"\n"}{"\n"}
            {player.FirstName} {player.LastName} 
            {"\n"}{"\n"}
            {player.BirthCity}
            {"\n"}{"\n"}
            USD$ {player.Salary}
            {"\n"}
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        textAlign : "center",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: 'center'
      },
    text:{
        color: 'black',
    },
    tinyImage:{
        flex: .0,
        width: 100,
        height: 100,
        
    },
});

export default PlayerScreen;