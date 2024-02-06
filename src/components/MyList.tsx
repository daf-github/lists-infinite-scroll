import { FlatList, Text } from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React from "react";

const MyList = () => {
  return (
    <FlatList
      data={character.results}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{
        gap: 50,
      }}
    />
  );

  // return <CharacterListItem character={character.results[0]} />;
};

export default MyList;
