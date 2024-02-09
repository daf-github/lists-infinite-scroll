import { ActivityIndicator, FlatList, Text, View } from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useState, useEffect } from "react";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(
    "https://rickandmortyapi.com/api/character"
  );

  const fetchNextPage = async () => {
    if (loading) {
      return;
    }

    console.log("Fetching page:", nextPage);

    setLoading(true);
    const response = await fetch(nextPage);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });

    setNextPage(responseJson.info.next);

    setLoading(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{
        gap: 10,
      }}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
    />
  );

  // return <CharacterListItem character={character.results[0]} />;
};

export default MyList;
