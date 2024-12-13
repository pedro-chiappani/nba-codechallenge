import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import cadena from "./generateStrigns";

const ScoreItem = ({ item, setPartidos }: any) => {



  let r = cadena(item);

  return (
    <View>
      <TouchableOpacity onPress={() => setPartidos(r)}>
        <Text style={styles.title}>{r}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 10,
    fontSize: 17,
    color:'black'
  },
});
export default ScoreItem;
