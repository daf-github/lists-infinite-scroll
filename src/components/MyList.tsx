import { ActivityIndicator, FlatList, Text } from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useState, useEffect } from "react";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(character.results);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const responseJson = await response.json();

      setItems(responseJson.results);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{
        gap: 10,
      }}
    />
  );

  // return <CharacterListItem character={character.results[0]} />;
};

export default MyList;
