// OutfitScreen.js

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

export default function OutfitScreen({ route, navigation }) {
  const { date } = route.params;

  const topImages = [
    require("./assets/ropa/tops/top1.jpg"),
    require("./assets/ropa/tops/top2.jpg"),
    require("./assets/ropa/tops/top3.jpg"),
    require("./assets/ropa/tops/top4.jpg"),
    require("./assets/ropa/tops/top5.jpg"),
  ];
  const bottomImages = [
    require("./assets/ropa/bottoms/bottom1.jpg"),
    require("./assets/ropa/bottoms/bottom2.jpg"),
    require("./assets/ropa/bottoms/bottom3.jpg"),
    require("./assets/ropa/bottoms/bottom4.jpg"),
    require("./assets/ropa/bottoms/bottom5.jpg"),
  ];

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const fadeAnimTop = useRef(new Animated.Value(1)).current;
  const fadeAnimBottom = useRef(new Animated.Value(1)).current;
  const animatingTop = useRef(false);
  const animatingBottom = useRef(false);

  const fadeAnimation = (fadeAnim, toValue, duration) => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };

  const animateImages = async (
    currentIndex,
    imagesArray,
    setIndex,
    fadeAnim,
    animRef,
    direction = "next"
  ) => {
    if (animRef.current) return;
    animRef.current = true;

    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % imagesArray.length
        : (currentIndex - 1 + imagesArray.length) % imagesArray.length;

    await fadeAnimation(fadeAnim, 0, 200);
    setIndex(newIndex);
    await fadeAnimation(fadeAnim, 1, 200);

    animRef.current = false;
  };
  const RibbonIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <Path
        d="M500.297,350.4c-27.014-16.684-110.2-70.81-166.993-136.76c54.373,3.585,129.914,7.733,148.8,4.582c30.343-5.057,32.032-33.71,28.654-45.514c-2.42-8.445-30.531-80.213-57.307-111.256c-10.657-12.357-32.032-20.228-47.203-8.425c-29.7,23.103-76.064,60.962-101.073,81.467c-6.361-15.606-19.942-27.4-49.168-27.4c-29.76,0-43.332,12.208-49.544,28.239c-22.56-18.914-69.536-58.058-100.708-82.306c-15.172-11.803-36.546-3.932-47.203,8.425C31.774,92.496,3.663,164.264,1.243,172.709c-3.378,11.804-1.689,40.457,28.654,45.514c18.56,3.092,93.32-0.86,148.642-4.396C121.745,279.688,38.697,333.737,11.703,350.4c-5.62,3.476-2.914,8.286,0.533,9.373c3.448,1.086,60.38,26.125,60.38,26.125c3.328,1.442,5.777,4.366,6.608,7.902c0,0,14.272,62.236,15.872,67.303c1.6,5.066,7.231,4.187,9.7,1.65c90.653-93.28,131.149-183.785,147.634-231.226c1.186,0.079,2.371,0.178,3.576,0.178c1.204,0,2.38-0.099,3.565-0.178c16.485,47.441,56.982,137.945,147.634,231.226c2.47,2.538,8.1,3.416,9.7-1.65c1.6-5.067,15.872-67.303,15.872-67.303c0.83-3.536,3.28-6.46,6.608-7.902c0,0,56.932-25.039,60.379-26.125C503.211,358.687,505.918,353.876,500.297,350.4z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  const HeartIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  const UserIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  const HomeIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9.5l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22V12h6v10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const CalendarIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2v4M8 2v4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 10h18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const PlusIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const DressIcon = ({ size = 24, color = "black" }) => (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Path
        d="M314.56,48S291.78,56,256,56s-58.56-8-58.56-8a31.94,31.94,0,0,0-10.57,1.8L32,104l16.63,88,48.88,5.52A24,24,0,0,1,118.8,222.1L112,464H400l-6.8-241.9a24,24,0,0,1,21.29-24.58L463.37,192,480,104,325.13,49.8A31.94,31.94,0,0,0,314.56,48Z"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <Path
        d="M333.31,52.66a80,80,0,0,1-154.62,0"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
    </Svg>
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent" }}
      edges={["top", "bottom"]}
    >
      <ImageBackground
        source={require("./assets/background.jpeg")}
        style={{ flex: 1 }} //
        resizeMode="cover"
      >
        <StatusBar style="auto" />
        <View style={styles.header}>
          <RibbonIcon color="#000000" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>HOLA</Text>
            <Text style={styles.headerSubtitle}>Ivana!</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <HeartIcon color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <UserIcon color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.datetitle}>Outfit para {date}</Text>

          {/* TOPS */}
          <View style={styles.section}>
            <Text style={styles.topstitle}>Prendas superiores</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {topImages.map((img, index) => (
                <Image
                  key={`top-${index}`}
                  source={img}
                  style={styles.smallImage}
                />
              ))}
            </ScrollView>
          </View>

          {/* BOTTOMS */}
          <View style={[styles.section]}>
            <Text style={styles.bottomstitle}>Prendas inferiores</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {bottomImages.map((img, index) => (
                <Image
                  key={`bottom-${index}`}
                  source={img}
                  style={styles.smallImage}
                />
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <HomeIcon color="#000000" />
            <Text style={styles.tabText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setModalVisible(true)}
          >
            <CalendarIcon color="#000000" />
            <Text style={styles.tabText}>Planificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <PlusIcon color="#000000" />
            <Text style={styles.tabText}>Cargar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <DressIcon color="#000000" />
            <Text style={styles.tabText}>Vestidor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <UserIcon color="#000000" />
            <Text style={styles.tabText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topstitle: {
    fontFamily: "RobotoCondensedRegular",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom:8,
  },
  bottomstitle: {
    fontFamily: "RobotoCondensedRegular",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom:8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#888",
  },
  headerIcons: {
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    fontFamily: "PressStart2PRegular",
    textTransform: "uppercase",
    textAlign: "center",
  },
  datetitle: {
    fontFamily: "PressStart2PRegular",
    textTransform: "uppercase",
    marginBottom:10,
  },

  image: {
    width: 170,
    height: 170,
    resizeMode: "contain",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 10,
    width: 100,
    justifyContent: "space-between",
  },
  arrow: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  backButton: {
    //marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#C0C0C0",
    alignSelf: "center",
  },
  backText: {
    color: "#000",
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F3A6B2",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#000000",
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  smallImage: {
    width: 175, // ancho más pequeño
    height: 175, // alto más pequeño
    marginRight: 8, // espacio entre imágenes
    borderRadius: 8, // opcional para bordes redondeados
    margin: 4,
  },
  bottomContainer: {
    flexDirection: "row", // fila
    flexWrap: "wrap", // permite que pase a la siguiente línea si no cabe
    gap: 5, // espacio entre imágenes (solo React Native 0.71+)
    marginHorizontal: -4,
  },
});
