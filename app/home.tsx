import { supabase } from "@/sevice/supabase";
import { CoffeeShop } from "@/type";
import { useRouter } from "expo-router"; // ✅ เพิ่ม
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const router = useRouter(); // ✅ เพิ่ม

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        Alert.alert(
          "คำเตือน",
          "เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง",
        );
      } else {
        setShops(data || []); // ✅ กัน null
      }
    };

    fetchCoffeeShops();
  }, []);

  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id?.toString(),
            name: item.name,
            district: item.district,
            description: item.description,
            latitude: item.latitude?.toString(),
            longitude: item.longitude?.toString(),
            image_url: item.image_url ?? "",
            phone: item.phone ?? "",
          },
        })
      }
    >
      <Image
        source={{
          uri: item.image_url ?? "https://via.placeholder.com/150",
        }}
        style={{ height: 75, width: 75, borderRadius: 5 }}
      />
      <View style={{ marginLeft: 10, justifyContent: "center" }}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopDistrict}>🚩 {item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
        data={shops}
        keyExtractor={(item) => item.id.toString()} // ✅ แก้
        renderItem={renderShopItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shopName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
  },
  shopDistrict: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#ABABAB",
  },
  cardItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});
