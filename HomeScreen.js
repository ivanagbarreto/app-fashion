// HomeScreen.js

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Modal } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useFonts } from "expo-font";
import React, { useState, useRef } from "react";


LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

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

const ArrowLeftIcon = ({ size = 14, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 512 512">
    <Path
      d="M30.71,229.47l188.87-113a30.54,30.54,0,0,1,31.09-.39,33.74,33.74,0,0,1,16.76,29.47V224.6L448.15,116.44a30.54,30.54,0,0,1,31.09-.39A33.74,33.74,0,0,1,496,145.52v221A33.73,33.73,0,0,1,479.24,396a30.54,30.54,0,0,1-31.09-.39L267.43,287.4v79.08A33.73,33.73,0,0,1,250.67,396a30.54,30.54,0,0,1-31.09-.39l-188.87-113a31.27,31.27,0,0,1,0-53Z"
      fill={color}
    />
  </Svg>
);

const ArrowRightIcon = ({ size = 14, color = "black" }) => (
  <Svg width={size} height={size} viewBox="0 0 512 512">
    <Path
      d="M481.29,229.47l-188.87-113a30.54,30.54,0,0,0-31.09-.39,33.74,33.74,0,0,0-16.76,29.47V224.6L63.85,116.44a30.54,30.54,0,0,0-31.09-.39A33.74,33.74,0,0,0,16,145.52v221A33.74,33.74,0,0,0,32.76,396a30.54,30.54,0,0,0,31.09-.39L244.57,287.4v79.08A33.74,33.74,0,0,0,261.33,396a30.54,30.54,0,0,0,31.09-.39l188.87-113a31.27,31.27,0,0,0,0-53Z"
      fill={color}
    />
  </Svg>
);


export default function HomeScreen({ navigation }) {
  const topImages = [
    require("./assets/ropa/tops/top1.jpg"),
    require("./assets/ropa/tops/top2.jpg"),
    require("./assets/ropa/tops/top3.jpg"),
    require("./assets/ropa/tops/top4.jpg"),
    require("./assets/ropa/tops/top5.jpg"),
    require("./assets/ropa/tops/top6.jpg"),
    require("./assets/ropa/tops/top7.jpg"),
  ];
  const bottomImages = [
    require("./assets/ropa/bottoms/bottom1.jpg"),
    require("./assets/ropa/bottoms/bottom2.jpg"),
    require("./assets/ropa/bottoms/bottom3.jpg"),
    require("./assets/ropa/bottoms/bottom4.jpg"),
    require("./assets/ropa/bottoms/bottom5.jpg"),
    require("./assets/ropa/bottoms/bottom6.jpg"),
    require("./assets/ropa/bottoms/bottom7.jpg"),
  ];

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const fadeAnimTop = useRef(new Animated.Value(1)).current;
  const fadeAnimBottom = useRef(new Animated.Value(1)).current;

  const animatingTop = useRef(false);
  const animatingBottom = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const fadeAnimation = (fadeAnim, toValue, duration) => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };
  const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const animateImages = async (
  currentIndex,
  imagesArray,
  setIndex,
  fadeAnim,
  animRef
) => {
  if (animRef.current) return;
  animRef.current = true;

  const totalDuration = 600;
  const count = imagesArray.length;
  const interval = totalDuration / count;


  const imageIndices = [...Array(count).keys()]; 
  const shuffledIndices = shuffleArray(imageIndices);

  let i = 0;

  while (i < count) {
    
    const newIndex = shuffledIndices[i];

    await fadeAnimation(fadeAnim, 0, interval / 2);
    setIndex(newIndex);
    await fadeAnimation(fadeAnim, 1, interval / 2);

    i++;
  }

  animRef.current = false;
};

  const handleTopNext = () => {
    animateImages(
      topIndex,
      topImages,
      setTopIndex,
      fadeAnimTop,
      animatingTop,
      "next"
    );
  };
  const handleTopPrev = () => {
    animateImages(
      topIndex,
      topImages,
      setTopIndex,
      fadeAnimTop,
      animatingTop,
      "prev"
    );
  };
  const handleBottomNext = () => {
    animateImages(
      bottomIndex,
      bottomImages,
      setBottomIndex,
      fadeAnimBottom,
      animatingBottom,
      "next"
    );
  };
  const handleBottomPrev = () => {
    animateImages(
      bottomIndex,
      bottomImages,
      setBottomIndex,
      fadeAnimBottom,
      animatingBottom,
      "prev"
    );
  };

  // const [fontsLoaded] = useFonts({
  //   PressStart2PRegular: require("./assets/fonts/PressStart2P-Regular.ttf"),
  //   RobotoCondensedRegular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const productData = {
    accessories: [
      { id: 1, image: require("./assets/accesorios/accesorio-1.png") },
      { id: 2, image: require("./assets/accesorios/accesorio-2.png") },
      { id: 3, image: require("./assets/accesorios/accesorio-4.png") },
      { id: 4, image: require("./assets/accesorios/accesorio-5.png") },
      { id: 5, image: require("./assets/accesorios/accesorio-8.png") },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ImageBackground
        source={require("./assets/background.jpeg")}
        style={styles.container}
        resizeMode="cover"
      >
        <StatusBar style="auto" />

        <View style={styles.header}>
          <View style={styles.leftSection}>
          <Image
            source={require("./assets/ribbon.png")} 
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>MIX&MATCH</Text>
            {/*<Text style={styles.headerSubtitle}>Ivana!</Text>*/}
          </View>
          </View>
          
      
        </View>

        <View style={styles.mainContent}>
          <View style={styles.productSection} pointerEvents="box-none">
            <Animated.Image
              source={topImages[topIndex]}
              style={styles.productImage}
              pointerEvents="box-none"
            />
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                onPress={handleTopPrev}
                style={styles.navButton}
              >
                <ArrowLeftIcon color="#333333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTopNext}
                style={styles.navButton}
              >
                <ArrowRightIcon color="#333333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.productSection} pointerEvents="box-none">
            <Animated.Image
              source={bottomImages[bottomIndex]}
              style={styles.productImage}
              pointerEvents="box-none"
            />
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                onPress={handleBottomPrev}
                style={styles.navButton}
              >
                <ArrowLeftIcon color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBottomNext}
                style={styles.navButton}
              >
                <ArrowRightIcon color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.accessoriesSection}>
          <View style={styles.accessoriesContainer}>
            {productData.accessories.map((accessory) => (
              <TouchableOpacity key={accessory.id} style={styles.accessoryItem}>
                <Image source={accessory.image} style={styles.accessoryImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <HomeIcon color="#333333" />
            <Text style={styles.tabText}>Inicio</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity
            style={styles.tabItem}
            onPress={() => setModalVisible(true)}
          >
            <CalendarIcon color="#000000" />
            <Text style={styles.tabText}>Planificar</Text>
          </TouchableOpacity>*/}
          <TouchableOpacity style={styles.tabItem}>
            <PlusIcon color="#333333" />
            <Text style={styles.tabText}>Cargar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <DressIcon color="#333333" />
            <Text style={styles.tabText}>Vestidor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <UserIcon color="#333333" />
            <Text style={styles.tabText}>Perfil</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text
                style={{
                  fontFamily: "PressStart2PRegular",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                Selecciona un dia
              </Text>
              <Calendar
                theme={{
                  backgroundColor: "#F3A6B2",
                  calendarBackground: "#F3A6B2",
                  textSectionTitleColor: "#333",
                  selectedDayBackgroundColor: "#F3A6B2",
                  selectedDayTextColor: "#996666",
                  todayTextColor: "#E5E4E7",
                  dayTextColor: "#000",
                  monthTextColor: "#000",
                  textMonthFontWeight: "bold",
                  arrowColor: "#000",
                  textDayFontFamily: "RobotoCondensedRegular",
                  textMonthFontFamily: "RobotoCondensedRegular",
                  textDayHeaderFontFamily: "RobotoCondensedRegular",
                  textTransform: "uppercase",
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 12,
                }}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setModalVisible(false);
                  navigation.navigate("Outfit", { date: day.dateString });
                }}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: "#F3A6B2" },
                }}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "black" }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
        flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0',
  },
    leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    headerTitle: {
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#333333', 
    letterSpacing: 1, 
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    iconButton: {
    marginLeft: 20, 
  },

  headerTitle: {
    fontSize: 25,
   color:" #FFFFFF",
    fontFamily: "VT323-Regular",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 0,
    letterSpacing: 1, 
    marginBottom:4,
    
  },
    logo: {
    width: 32, 
    height: 32,
    marginRight: 10, 
marginTop:4,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#888",
  },
  headerIcons: {
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
  },
  productSection: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    width: "100%",
    padding: 10,
  },
  navButton: {
    backgroundColor: "#ebebeb",
    width: 80,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",

    zIndex: 10,
  },
  accessoriesSection: {
    padding: 10,
  },
  accessoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  accessoryItem: {
    marginHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 5,
    shadowColor: "#333333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  accessoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F8E3EE",
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
    color: "#333333",
    marginTop: 4,
    fontFamily:"RobotoCondensed-Regular"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#f2cad0ff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "PressStart2PRegular",
  },
   
  closeButton: {
    marginTop: 15,
    backgroundColor: "#C0C0C0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",
  },
});
