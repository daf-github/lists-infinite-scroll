import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

const initialPage = "https://rickandmortyapi.com/api/character";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(initialPage);

  const { width } = useWindowDimensions();

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

  const renderItem = useCallback(
    ({ item }) => <CharacterListItem character={item} />,
    []
  );

  const onRefresh = () => {
    if (loading) {
      return;
    }

    setItems([]);
    // setNextPage(initialPage);
    fetchPage(initialPage);
  };

  const itemHeight = width + 40;
  console.log("Height that I calculated: ", itemHeight);

  // Use case: increase impression count for posts
  // that are visible on the screen for more than 0.5 seconds
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({ changed, viewableItems }) => {
        changed.forEach((changedItem) => {
          if (changedItem.isViewable) {
            console.log("++ Impression for: ", changedItem.item.id);
          }
        });
      },
    },
  ]);

  if (items.length === 0) {
    // This is only to make the debug prop on FlatList work
    return null;
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      contentContainerStyle={{
        gap: 10,
      }}
      columnWrapperStyle={{ gap: 5 }}
      onEndReached={() => fetchPage(nextPage)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
      debug={true}
      refreshing={loading}
      onRefresh={onRefresh}
      // removeClippedSubviews={true}
      initialNumToRender={3}
      // windowSize={1}
      // keyExtractor={(item, index) => `${item.id}-${index}`}
      // keyExtractor={(index) => index.id}

      // The getItemLayout is to help the FlatLIst to calculate the dimensions
      getItemLayout={(data, index) => ({
        length: itemHeight,
        offset: (itemHeight + 5) * index,
        index,
      })}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      numColumns={2}
    />
  );
};

export default MyList;
