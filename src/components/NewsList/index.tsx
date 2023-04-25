import React, { useEffect, useState, useCallback } from "react";
import { wpApi } from "../../services/api";
import { formatDistance } from "date-fns";

import { utcToZonedTime } from "date-fns-tz";

import { ptBR } from "date-fns/locale";
import {
  FlatList,
  View,
  Text,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { Container, Title } from "./styles";

export interface INewsListItem {
  link: string;
  title: string;
  imgUrl: string;
  date: string;
  estado: string[];
}

export default function NewsList() {
  const [data, setData] = useState<INewsListItem[]>([]);

  async function fetchNews() {
    try {
      if (data.length > 0) {
        return;
      }
      const response = await wpApi.get("app-news?per_page=10");

      const items: INewsListItem[] = response.data.map((item: any) => {
        return {
          link: item.acf.link,
          title: item.title.rendered,
          date: item.date,
          imgUrl: "",
          estado: [...[], item.acf.estado],
        };
      });
      setData(items);
    } catch (ex) {
      // Handle exeception
      console.log("error", ex);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  async function openNew(url: string) {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert("Algo deu errado", "Não foi possível abrir a URL.");

      return;
    }

    Linking.openURL(url);
  }

  const renderItem: ListRenderItem<INewsListItem> = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemFooterContainer}>
          <TouchableOpacity
            onPress={() => openNew(item.link)}
            style={styles.itemButtom}
          >
            <Text style={styles.itemButtomLabel}>Ler notícia</Text>
          </TouchableOpacity>
          <Text style={styles.itemDateLabel}>
            {formatDistance(
              utcToZonedTime(new Date(item.date), "America/Sao_Paulo"),
              new Date(),
              {
                addSuffix: true,
                locale: ptBR,
              }
            )}
          </Text>
        </View>
      </View>
    ),
    []
  );
  return (
    <Container>
      <Title>Notícias</Title>
      <FlatList
        data={data}
        keyExtractor={(item: INewsListItem) => item.title}
        renderItem={renderItem}
      ></FlatList>
    </Container>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemFooterContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  itemDateLabel: {
    fontSize: 12,
    color: "#999",
  },
  itemButtom: {
    backgroundColor: "#0a2351",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  itemButtomLabel: {
    color: "#fff",
    textTransform: "uppercase",
  },
});
