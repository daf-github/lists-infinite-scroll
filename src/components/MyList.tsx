import { ActivityIndicator, FlatList, Text, View } from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useState, useEffect } from "react";

const initialPage = "https://rickandmortyapi.com/api/character";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(initialPage);

  const fetchPage = async (url: string) => {
    if (loading) {
      return;
    }

    console.log("Fetching page:", url);

    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });

    setNextPage(responseJson.info.next);

    setLoading(false);
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  const onRefresh = () => {
    setItems([]);
    setNextPage(initialPage);
    fetchPage(initialPage);
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CharacterListItem character={item} />}
      contentContainerStyle={{
        gap: 10,
      }}
      onEndReached={() => fetchPage(nextPage)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
      // debug={true}
      refreshing={loading}
      onRefresh={onRefresh}
    />
  );

  // return <CharacterListItem character={character.results[0]} />;
};

export default MyList;
