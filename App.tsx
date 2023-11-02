import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import data from "./assets/data.json";
import useCartStore from "./store/createStore";
export default function App() {
  const { addProduct, removeProduct, item } = useCartStore();
  const itemRender: ListRenderItem<any> = ({ item }) => (
    <View style={styles.containerItem}>
      <Image style={styles.cardItemImage} source={{ uri: item.image }} />
      <View style={styles.itemContainer}>
        <Text style={styles.cardItemName}>{item.title}</Text>
        <Text style={styles.cardItemPrice}>$ {item.price}</Text>
      </View>
      <View style={styles.itemButton}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => removeProduct(item)}
        >
          <Ionicons name="remove" size={20} color={`#000`} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => addProduct(item)}
        >
          <Ionicons name="add" size={20} color={`#000`} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white", padding: 20 }}>{item}</Text>
      </View>
      <FlatList data={data} renderItem={itemRender} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 100 : 0,
  },
  containerItem: {
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },
  cardItemImage: {
    height: 50,
    width: 50,
  },
  itemContainer: {
    flex: 1,
  },
  cardItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardItemPrice: {},
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
