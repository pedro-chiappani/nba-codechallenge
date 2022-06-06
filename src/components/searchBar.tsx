import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const SearchBar = (text: string) => {
    
    const [search, setSearch] = useState('');
    const updateSearch = (query: string) => setSearch(query);

    return (
        <Searchbar placeholder="Buscar..." onChangeText={updateSearch} value={search}/>
    );
}

export default SearchBar;