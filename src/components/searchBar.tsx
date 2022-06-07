import React, {useState} from 'react';
import SearchBar from "react-native-dynamic-search-bar";

interface SearchBarProps {
  updateSearch: (query: string) => void;
}

const SearchBox = ({updateSearch}: SearchBarProps) => {
  return (
    <SearchBar
      placeholder="Buscar..."
      onChangeText={updateSearch}
    />
  );
};

export default SearchBox;
