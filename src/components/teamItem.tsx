import { useNavigation } from "@react-navigation/native"
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgCssUri } from "react-native-svg";
import { Team } from "../types/team";
import { HomeScreenProps } from "../types/navigation";


const TeamItem = (team: Team) => {
    
    const navigation = useNavigation();
    console.log(navigation.navigate('PlayerList', {team: team.TeamID}));
    return (
        <TouchableOpacity onPress={() => navigation.navigate('PlayerList', {team: team.TeamID.toString()})}
        style= {[styles.container, 
        {backgroundColor: `#${team.PrimaryColor}`}]}>
        <SvgCssUri uri= {team.WikipediaLogoUrl} width="100%" fill={'black'}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        marginTop: 6,
        marginHorizontal: 6,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        overflow: 'hidden',
        justifyContent: 'center',
      },
});

export default TeamItem;