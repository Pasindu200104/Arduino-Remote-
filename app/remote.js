import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";

export default function App() {
  const [getStatus, setStatus] = useState(false);
  const [getText, setText] = useState("Connecting...");
  const [getBulb, setBulb] = useState("ON");
  const [getBulb2, setBulb2] = useState("ON");
  const [getBulb3, setBulb3] = useState("ON");
  const [getBulb4, setBulb4] = useState("ON");
  const [getServo, setServo] = useState("ON");

  const link = process.env.EXPO_PUBLIC_URL;

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  });

  console.log(getStatus);

  const userID = async () => {
    let userJson = await AsyncStorage.getItem("user");
    let user = JSON.parse(userJson);

    let form = new FormData();
    form.append("userID", user.id);

    let response = await fetch("http://" + link + ":8080/minitech/door", {
      method: "POST",
      body: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.ok) {
      let results = await response.json();
      console.log(results);
    }
  };

  const pressbutton = async () => {
    // userID();
    const status = getStatus ? "0" : "1";
    try {
      const response = await fetch("http://192.168.102.123?status=" + status, {
        method: "GET",
      });
      if (response.ok) {
        const responseText = await response.text();
        console.log("Arduino Response:", responseText);
        setStatus(!getStatus);
        if (responseText == "SYSTEM OFF") {
          Alert.alert("Message", "SYSTEM OFF");
        } else {
          setText(responseText);
        }
      } else {
        console.log("response sending faild");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };
  const bulb = async () => {
    const status = getBulb ? "3" : "2";
    try {
      const response = await fetch("http://192.168.102.123?status=" + status, {
        method: "GET",
      });
      if (response.ok) {
        const responseText = await response.text();
        console.log("Arduino Response:", responseText);
        setBulb(!getBulb);
        if (responseText == "SYSTEM OFF") {
          Alert.alert("Message", "SYSTEM OFF");
        } else {
          setText(responseText);
        }
      } else {
        console.log("response sending faild");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };
  const servo = async () => {
    // userID();
    const status = getServo ? "5" : "4";
    try {
      const response = await fetch("http://192.168.102.123?status=" + status, {
        method: "GET",
      });
      if (response.ok) {
        const responseText = await response.text();
        console.log("Arduino Response:", responseText);
        setServo(!getServo);
        if (responseText == "SYSTEM OFF") {
          Alert.alert("Message", "SYSTEM OFF");
        } else {
          setText(responseText);
        }
      } else {
        console.log("response sending faild");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };
  const bulb2 = async () => {
    // userID();
    const status = getBulb2 ? "6" : "7";
    try {
      const response = await fetch("http://192.168.102.123?status=" + status, {
        method: "GET",
      });
      if (response.ok) {
        const responseText = await response.text();
        console.log("Arduino Response:", responseText);
        setBulb2(!getBulb2);
        if (responseText == "bulb2") {
          Alert.alert("Message", "bulb2");
        } else {
          setText(responseText);
        }
      } else {
        console.log("response sending faild");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };
  const bulb3 = async () => {
    // userID();
    const status = getBulb3 ? "8" : "9";
    try {
      const response = await fetch("http://192.168.102.123?status=" + status, {
        method: "GET",
      });
      if (response.ok) {
        const responseText = await response.text();
        console.log("Arduino Response:", responseText);
        setBulb3(!getBulb3);
        if (responseText == "bulb3") {
          Alert.alert("Message", "bulb3");
        } else {
          setText(responseText);
        }
      } else {
        console.log("response sending faild");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };
  const bulb4 = async () => {
    // userID();
    const status = getBulb4 ? ".10" : ".11";
    try {
      const response = await fetch("http://192.168.102.123?status=" + status, {
        method: "GET",
      });
      if (response.ok) {
        const responseText = await response.text();
        console.log("Arduino Response:", responseText);
        setBulb4(!getBulb4);
        if (responseText == "bulb4") {
          Alert.alert("Message", "bulb4");
        } else {
          setText(responseText);
        }
      } else {
        console.log("response sending faild");
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };

  const logOut = async () => {
    try {
      router.replace("/");
      await AsyncStorage.removeItem("user");
      console.log("logout success");
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.view2}>
        <Text style={styles.text1}>MINI TECH</Text>
        <Text style={styles.text2}>Home Security</Text>
        <View style={styles.view3}>
          <Text>{getText}</Text>
        </View>
      </View>
      <View style={styles.view4}>
        <View style={styles.view5}>
          <Pressable onPress={pressbutton}>
            <Text style={styles.text1}>{getStatus ? "OFF" : "ON"}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.view6}>
        <View style={styles.view7}>
          <Pressable onPress={bulb}>
            <Text style={styles.text5}>
              {getBulb ? "LIGHT ON" : "LIGHT OFF"}
            </Text>
          </Pressable>
        </View>
        <View style={styles.view7}>
          <Pressable onPress={servo}>
            <Text style={styles.text5}>
              {getServo ? "DOOR ON" : "DOOR OFF"}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.view9}>
        <View style={styles.view8}>
          <Pressable onPress={bulb2}>
            <Text style={styles.text3}>1</Text>
          </Pressable>
        </View>
        <View style={styles.view8}>
        <Pressable onPress={bulb3}>
            <Text style={styles.text3}>2</Text>
          </Pressable>
        </View>
        <View style={styles.view8}>
        <Pressable onPress={bulb4}>
            <Text style={styles.text3}>3</Text>
          </Pressable>
        </View>
      </View>
      {/* <View style={styles.view9}>
        <View style={styles.view8}>
          <Text style={styles.text3}>4</Text>
        </View>
        <View style={styles.view8}>
          <Text style={styles.text3}>5</Text>
        </View>
        <View style={styles.view8}>
          <Text style={styles.text3}>6</Text>
        </View>
      </View> */}
      <View style={styles.view10}>
        <View style={styles.view11}>
          <Pressable onPress={bulb}>
            <Text style={styles.text5}>Details</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.view12}>
        <Pressable
          onPress={() => {
            logOut();
          }}
        >
          <Text style={styles.text6}>Logout</Text>
        </Pressable>
      </View>
      <Text style={styles.text4}>Powered by MiniSoft Solutions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -35,
  },
  view2: {
    backgroundColor: "#00BECC",
    alignItems: "center",
    padding: 40,
  },
  view3: {
    width: "50%",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  view4: {
    marginTop: 20,
    alignItems: "center",
  },
  view5: {
    backgroundColor: "#00BECC",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },
  view6: {
    flexDirection: "row",
    columnGap: 20,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  view7: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    width: "47%",
    alignItems: "center",
    paddingEnd: 30,
    paddingTop: 30,
    borderRadius: 50,
    justifyContent: "center",
  },
  view8: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  view9: {
    flexDirection: "row",
    columnGap: 20,
    padding: 20,
    justifyContent: "center",
  },
  view10: {
    padding: 5,
    width: "100%",
    alignItems: "center",
    paddingStart: 25,
    paddingEnd: 25,
    paddingTop: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  view11: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
    paddingTop: 20,
  },
  view12: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  text1: {
    fontSize: 40,
    color: "white",
  },
  text2: {
    fontSize: 15,
    color: "white",
  },
  text3: {
    fontSize: 30,
    color: "white",
  },
  text4: {
    marginTop: 10,
    alignSelf: "center",
    color: "#D9D9D9",
  },
  text5: {
    alignSelf: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  text6: {
    fontSize: 15,
    color: "black",
  },
});
