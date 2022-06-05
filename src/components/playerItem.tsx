import { useNavigation } from "@react-navigation/native"
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgCssUri, Text } from "react-native-svg";
import { TeamsScreenProps } from "../types/navigation";
import { Player } from "../types/player";

const PlayerItem = (player: Player) => {

    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => navigation.navigate('Home', {param: 'hola'})}>
        <SvgCssUri uri= {player.PhotoUrl} width="100%" fill={'black'}/>
        </TouchableOpacity>
   );
};

export default PlayerItem;