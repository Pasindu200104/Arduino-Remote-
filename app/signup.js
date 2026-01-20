import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

// const logo = require("../assets/images/linkmate.png");
// const mainImagePath = require("../assets/images/user.png");

export default function App() {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");
  // const [getImage, setImage] = useState(mainImagePath);

  const link = process.env.EXPO_PUBLIC_URL;

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

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
      <ScrollView>
        {/* <Image source={logo} style={styles.image1} contentFit="contain" /> */}
        <View style={styles.view2}>
          <Text style={styles.text6}>MINI TECH</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text2}>First Name</Text>
          <TextInput
            style={styles.input1}
            inputMode={"text"}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />

          <Text style={styles.text2}>Last Name</Text>
          <TextInput
            style={styles.input1}
            inputMode={"text"}
            onChangeText={(text) => {
              setLastName(text);
            }}
          />

          <Text style={styles.text2}>Mobile</Text>
          <TextInput
            style={styles.input1}
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
            inputMode={"text"}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <Pressable
            style={styles.button1}
            onPress={async () => {
              let form = new FormData();
              form.append("fname", getFirstName);
              form.append("lname", getLastName);
              form.append("mobile", getMobile);
              form.append("password", getPassword);

              let response = await fetch(
                "http://" + link + ":8080/minitech/SignUpMini",
                {
                  method: "POST",
                  body: form,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (response.ok) {
                let results = await response.json();
                console.log(results);
                if (results.success) {
                  Alert.alert("Error", results.message);
                  router.replace("/");
                } else {
                  Alert.alert("Error", results.message);
                }
              }
            }}
          >
            <FontAwesome name={"send"} size={18} color="white" />
            <Text style={styles.text3}>Sign Up</Text>
          </Pressable>

          <Text style={styles.text4}>
            Alredy have an account?
            <Pressable
              onPress={() => {
                router.replace("/");
              }}
            >
              <Text style={styles.text5}>Sign In</Text>
            </Pressable>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    rowGap: 15,
    paddingHorizontal: 25,
    justifyContent: "center",
    backgroundColor: "#00BECC",
    alignContent:"center"
  },
  view2: {
    alignItems: "center",
    marginBottom: 20,
    justifyContent:"center",
    marginTop:75,
  },
  view3: {
    flex: 1,
    rowGap: 10,
  },

  image1: {
    width: "50%",
    height: 100,
    alignSelf: "center",
    marginBottom: "15",
  },
  button1: {
    backgroundColor: "black",
    height: 40,
    borderRadius: 50,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 20,
  },

  text1: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins-Bold",
    alignItems: "center",
    // marginTop: 50,
  },
  text2: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Light",
  },
  text3: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  text4: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins-Light",
    alignSelf: "center",
    marginBottom: 20,
  },
  text5: {
    color: "black",
  },
  text6: {
    fontSize: 50,
    color: "white",
    fontFamily: "Poppins-Bold",
    alignSelf: "center",
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
  avatar1: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "gray",
    justifyContent: "center",
    alignSelf: "center",
  },
});
