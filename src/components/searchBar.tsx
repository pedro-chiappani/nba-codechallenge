import React from 'react';
import SearchBar from "react-native-dynamic-search-bar";

interface SearchBarProps {
  updateSearch: (query: string) => void;
  color: string;
}

const SearchBox = ({updateSearch, color}: SearchBarProps) => {
  return (
    <SearchBar
      placeholder="Buscar..."
      textInputStyle={[{color: 'white'}]}
      onChangeText={updateSearch}
      style={[{backgroundColor: `#${color}`}]}
      placeholderTextColor= 'white'
    />
  );
};


export default SearchBox;
