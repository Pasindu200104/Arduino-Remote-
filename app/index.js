
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function signin() {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const link = process.env.EXPO_PUBLIC_URL;

  // const linkmate = require("../assets/images/linkmate.png");

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    async function userAsyncStorage() {
      // console.log("1");
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson != null) {
          router.replace("/remote");
        }
      } catch (e) {
        console.log("Error");
      }
    }
    userAsyncStorage();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.view1}>
      <StatusBar hidden={true} />
      {/* <View style={styles.view2}>
        <Image style={styles.image1} source={linkmate} contentFit="contain" />
      </View> */}
      <View style={styles.view3}>
        <Text style={styles.text6}>MINI TECH</Text>
      </View>
      <View style={styles.view3}>
        <Text style={styles.text1}>SIGN IN</Text>
        <Text style={styles.text2}>Hello Welcome To MiniTech.</Text>
      </View>
      <View style={styles.view4}>
        <Text style={styles.text2}>Mobile</Text>
        <TextInput
          style={styles.input1}
          placeholder="Ex:- 0712345678"
          placeholderTextColor={"white"}
          inputMode={"tel"}
          maxLength={10}
          onChangeText={(text) => {
            setMobile(text);
          }}
        />

        <Text style={styles.text2}>Password</Text>
        <TextInput
          style={styles.input1}
          secureTextEntry={true}
          placeholder="EX :- *********"
          placeholderTextColor={"white"}
          inputMode={"text"}
          maxLength={20}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <View style={styles.view4}>
        <Pressable
          style={styles.press1}
          onPress={async () => {
            try {
              let response = await fetch(
                "http://"+link+":8080/minitech/SignInMini",
                {
                  method: "POST",
                  body: JSON.stringify({
                    mobile: getMobile,
                    password: getPassword,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response.ok) {
                let result = await response.json();
                if (result.success) {
                  let user = result.user;
                  await AsyncStorage.setItem("user", JSON.stringify(user));
                  router.replace("/remote");
                } else {
                  Alert.alert("Error", JSON.message);
                }
              }
            } catch (e) {
              Alert.alert("Error", "Faild to connect to the server.");
            }
          }}
        >
          <Text style={styles.text3}>Sign In</Text>
        </Pressable>
      </View>

      <Text style={styles.text4}>
        Don't have an account?
        <Pressable
          onPress={() => {
            router.replace("/signup");
          }}
        >
          <Text style={styles.text5}>Sign Up</Text>
        </Pressable>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#00BECC",
  },
  view2: {
    width: "100%",
    height: 100,
    marginVertical: 20,
    alignItems: "center",
  },
  view3: {
    alignItems: "center",
  },
  view4: {
    rowGap: 15,
    marginHorizontal: 20,
    marginVertical: 30,
  },
  input1: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    borderStyle: "solid",
    borderColor: "white",
    fontSize: 18,
    color: "white",
  },
  text1: {
    fontSize: 30,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  text3: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  text2: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins-Light",
  },
  text4: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins-Light",
    alignSelf: "center",
    justifyContent:"center",
    marginBottom: 20,
  },
  text5: {
    color: "black",
    justifyContent: "center",
  },
  text6: {
    fontSize: 50,
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  image1: {
    width: "50%",
    height: 100,
  },
  press1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    fontSize: 18,
    color: "white",
  },
});
